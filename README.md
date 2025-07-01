
import logging
from telegram import (
    Update,
    ReplyKeyboardMarkup,
    ReplyKeyboardRemove,
    KeyboardButton
)
from telegram.ext import (
    Application,
    CommandHandler,
    ContextTypes,
    ConversationHandler,
    MessageHandler,
    filters
)

# إعدادات البوت
TOKEN = "7521799915:AAEQEM_Ajk5_hMWQUrlmvdNbDBJAUMMwgrg"
ADMIN_CHAT_ID = 910021564
COMMISSION_RATE = 0.0005  # 0.05%

# حالات المحادثة
CHOOSING_OPERATION, BUY_DATA, SELL_DATA, PAYMENT_METHOD, RECEIVE_METHOD, NETWORK_CHOICE = range(6)

# خيارات الدفع والشبكات
PAYMENT_METHODS = ["شام كاش", "سيريتل كاش", "حوالة الفؤاد", "حوالة الهرم", "بنك البركة", "البنك الاسلامي"]
RECEIVE_METHODS = ["حوالة هرم", "حوالة الفؤاد", "سيريتل كاش", "شام كاش"]
NETWORKS = ["bep20", "trc20", "erc20", "ton", "sol", "avax"]
NETWORK_ADDRESSES = {
    "bep20": "0x21802218d8d661d66F2C7959347a6382E1cc614F",
    "trc20": "TD2LoErPRkVPBxDk72ZErtiyi6agirZQjX",
    "erc20": "0x21802218d8d661d66F2C7959347a6382E1cc614F",
    "ton": "TON Network Address",
    "sol": "Solana Network Address",
    "avax": "Avalanche Network Address"
}

# تفاصيل الدفع
PAYMENT_DETAILS = {
    "شام كاش": "العنوان: be456e0ea9392db4d68a7093ee317bc8\nرقم الحساب: 5991161126028260",
    "سيريتل كاش": "الرقم: 0934598967",
    "حوالة الفؤاد": "الاسم: علي ابراهيم محمود\nالرقم: 0934598967\nالمدينة: اللاذقية",
    "حوالة الهرم": "الاسم: علي ابراهيم محمود\nالرقم: 0934598967\nالمدينة: اللاذقية",
    "بنك البركة": "الاسم: علي ابراهيم محمود\nالرقم: 0934598967\nالمدينة: اللاذقية",
    "البنك الاسلامي": "الاسم: علي ابراهيم محمود\nالرقم: 0934598967\nالمدينة: اللاذقية"
}

# بدء المحادثة
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    welcome_message = (
        "ماذا يمكن لهذا البوت فعله؟\n"
        "• شراء وبيع USDT عن طريق وسائل الدفع المتاحة في سوريا\n"
        "• التحويل 0.05% من المبلغ الكامل\n"
        "• عرض سعر الدولار اليومي حسب سعر الصرف المركزي\n"
        "\nالرجاء اختيار نوع المعاملة:"
    )
    
    keyboard = [["شراء USDT", "بيع USDT"]]
    await update.message.reply_text(
        welcome_message,
        reply_markup=ReplyKeyboardMarkup(keyboard, one_time_keyboard=True)
    )
    return CHOOSING_OPERATION

# معالجة اختيار العملية
async def choose_operation(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    choice = update.message.text
    context.user_data['operation'] = choice
    
    if choice == "شراء USDT":
        await update.message.reply_text(
            "لنبدأ عملية الشراء!\nالرجاء إدخال اسمك الثلاثي:",
            reply_markup=ReplyKeyboardRemove()
        )
        return BUY_DATA
    
    elif choice == "بيع USDT":
        await update.message.reply_text(
            "لنبدأ عملية البيع!\nالرجاء إدخال اسمك الثلاثي:",
            reply_markup=ReplyKeyboardRemove()
        )
        return SELL_DATA

# جمع بيانات الشراء
async def buy_data(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    user_data = context.user_data
    text = update.message.text
    
    if 'full_name' not in user_data:
        user_data['full_name'] = text
        await update.message.reply_text("الرجاء إدخال رقم هاتفك:")
        return BUY_DATA
    
    elif 'phone' not in user_data:
        user_data['phone'] = text
        await update.message.reply_text("الرجاء إدخال مدينتك:")
        return BUY_DATA
    
    elif 'city' not in user_data:
        user_data['city'] = text
        await update.message.reply_text("الرجاء إدخال كمية USDT المطلوبة:")
        return BUY_DATA
    
    elif 'amount' not in user_data:
        user_data['amount'] = text
        keyboard = [[method] for method in PAYMENT_METHODS]
        await update.message.reply_text(
            "اختر طريقة الدفع المناسبة:",
            reply_markup=ReplyKeyboardMarkup(keyboard, one_time_keyboard=True)
        return PAYMENT_METHOD
    
    elif 'payment_method' not in user_data:
        user_data['payment_method'] = text
        await update.message.reply_text("الرجاء إدخال عنوان محفظتك USDT:")
        return BUY_DATA
    
    elif 'wallet_address' not in user_data:
        user_data['wallet_address'] = text
        keyboard = [[network] for network in NETWORKS]
        await update.message.reply_text(
            "اختر شبكة المحفظة:",
            reply_markup=ReplyKeyboardMarkup(keyboard, one_time_keyboard=True)
        )
        return NETWORK_CHOICE

# جمع بيانات البيع
async def sell_data(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    user_data = context.user_data
    text = update.message.text
    
    if 'full_name' not in user_data:
        user_data['full_name'] = text
        await update.message.reply_text("الرجاء إدخال رقم هاتفك:")
        return SELL_DATA
    
    elif 'phone' not in user_data:
        user_data['phone'] = text
        await update.message.reply_text("الرجاء إدخال مدينتك:")
        return SELL_DATA
    
    elif 'city' not in user_data:
        user_data['city'] = text
        await update.message.reply_text("الرجاء إدخال كمية USDT للبيع:")
        return SELL_DATA
    
    elif 'amount' not in user_data:
        user_data['amount'] = text
        keyboard = [[method] for method in RECEIVE_METHODS]
        await update.message.reply_text(
            "اختر طريقة استلام المبلغ:",
            reply_markup=ReplyKeyboardMarkup(keyboard, one_time_keyboard=True)
        return RECEIVE_METHOD
    
    elif 'receive_method' not in user_data:
        user_data['receive_method'] = text
        keyboard = [["bep20", "trc20", "erc20"]]
        await update.message.reply_text(
            "اختر شبكة الإرسال:",
            reply_markup=ReplyKeyboardMarkup(keyboard, one_time_keyboard=True)
        )
        return NETWORK_CHOICE

# معالجة اختيار الشبكة
async def network_choice(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    user_data = context.user_data
    network = update.message.text.lower()
    user_data['network'] = network
    
    if user_data['operation'] == "شراء USDT":
        # حساب العمولة
        amount = float(user_data['amount'])
        commission = amount * COMMISSION_RATE
        total = amount + commission
        
        # إرسال تفاصيل الطلب للمستخدم
        response = (
            "✅ تم استلام طلبك بنجاح!\n\n"
            f"• النوع: {user_data['operation']}\n"
            f"• الاسم: {user_data['full_name']}\n"
            f"• الهاتف: {user_data['phone']}\n"
            f"• المدينة: {user_data['city']}\n"
            f"• الكمية: {amount} USDT\n"
            f"• العمولة (0.05%): {commission:.4f} USDT\n"
            f"• الإجمالي: {total:.4f} USDT\n"
            f"• طريقة الدفع: {user_data['payment_method']}\n"
            f"• عنوان المحفظة: {user_data['wallet_address']}\n"
            f"• الشبكة: {network}\n\n"
            "سيتم التواصل معك قريبًا لإتمام العملية."
        )
        
        # إرسال تفاصيل الطلب للمسؤول
        admin_msg = (
            "📦 طلب جديد (شراء):\n\n" +
            "\n".join([f"{k}: {v}" for k, v in user_data.items()])
        )
        
    else:  # عملية بيع
        # إرسال تفاصيل الطلب للمستخدم
        response = (
            "✅ تم استلام طلبك بنجاح!\n\n"
            f"• النوع: {user_data['operation']}\n"
            f"• الاسم: {user_data['full_name']}\n"
            f"• الهاتف: {user_data['phone']}\n"
            f"• المدينة: {user_data['city']}\n"
            f"• الكمية: {user_data['amount']} USDT\n"
            f"• طريقة الاستلام: {user_data['receive_method']}\n\n"
            f"• الشبكة: {network}\n"
            f"• عنوان الإرسال: {NETWORK_ADDRESSES[network]}\n\n"
            "الرجاء إرسال USDT إلى العنوان أعلاه."
        )
        
        # إرسال تفاصيل الطلب للمسؤول
        admin_msg = (
            "📦 طلب جديد (بيع):\n\n" +
            "\n".join([f"{k}: {v}" for k, v in user_data.items()]) +
            f"\nعنوان الإرسال: {NETWORK_ADDRESSES[network]}"
        )
    
    await update.message.reply_text(response, reply_markup=ReplyKeyboardRemove())
    await context.bot.send_message(chat_id=ADMIN_CHAT_ID, text=admin_msg)
    user_data.clear()
    return ConversationHandler.END

# إلغاء المحادثة
async def cancel(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    await update.message.reply_text(
        "تم إلغاء العملية.",
        reply_markup=ReplyKeyboardRemove()
    )
    context.user_data.clear()
    return ConversationHandler.END

# دالة رئيسية
def main() -> None:
    application = Application.builder().token(TOKEN).build()
    
    conv_handler = ConversationHandler(
        entry_points=[CommandHandler('start', start)],
        states={
            CHOOSING_OPERATION: [
                MessageHandler(filters.Regex(r"^(شراء USDT|بيع USDT)$"), choose_operation)
            ],
            BUY_DATA: [MessageHandler(filters.TEXT & ~filters.COMMAND, buy_data)],
            SELL_DATA: [MessageHandler(filters.TEXT & ~filters.COMMAND, sell_data)],
            PAYMENT_METHOD: [
                MessageHandler(filters.Regex(fr'^({"|".join(PAYMENT_METHODS)})$'), buy_data)
            ],
            RECEIVE_METHOD: [
                MessageHandler(filters.Regex(fr'^({"|".join(RECEIVE_METHODS)})$'), sell_data)
            ],
            NETWORK_CHOICE: [
                MessageHandler(filters.Regex(fr'^({"|".join(NETWORKS)})$', re.IGNORECASE), network_choice)
            ]
        },
        fallbacks=[CommandHandler('cancel', cancel)]
    )
    
    application.add_handler(conv_handler)
    application.run_polling()

if __name__ == '__main__':
    import re
    logging.basicConfig(
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        level=logging.INFO
    )
    main()
