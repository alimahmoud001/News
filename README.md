from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, MessageHandler, CallbackQueryHandler, filters, ConversationHandler

# --- تعريف الحالات للمحادثة ---
# حالات الشراء
BUY_NAME, BUY_PHONE, BUY_CITY, BUY_AMOUNT, BUY_PAYMENT_METHOD, BUY_WALLET_ADDRESS, BUY_NETWORK_TYPE, BUY_CONFIRM = range(8)
# حالات البيع
SELL_AMOUNT, SELL_PAYMENT_METHOD, SELL_CONFIRM_DETAILS, SELL_NETWORK_TYPE, SELL_CONFIRM = range(8, 13) # تبدأ من رقم مختلف لتجنب التضارب

# معلومات البوت ومعلومات المالك
TELEGRAM_BOT_TOKEN = "7521799915:AAEQEM_Ajk5_hMWQUrlmvdNbDBJAUMMwgrg"
OWNER_CHAT_ID = 910021564 # ID الخاص بك لاستلام الطلبات

# بيانات الدفع (خاصة بالبوت - للشراء)
SHAM_CASH_DETAILS = {
    "عنوان": "be456e0ea9392db4d68a7093ee317bc8",
    "رقم الحساب": "5991161126028260"
}
SYRIATEL_CASH_DETAILS = "على الرقم: 0934598967"
FOAD_TRANSFER_DETAILS = "علي ابراهيم محمود - 0934598967 - اللاذقية"
HARAM_TRANSFER_DETAILS = "علي ابراهيم محمود - 0934598967 - اللاذقية"
BARAKA_BANK_DETAILS = "علي ابراهيم محمود - 0934598967 - اللاذقية"
ISLAMIC_BANK_DETAILS = "علي ابراهيم محمود - 0934598967 - اللاذقية"

# عناوين الشبكات (خاصة بالبوت - للبيع)
BEP20_ADDRESS = "0x21802218d8d661d66F2C7959347a6382E1cc614F"
TRC20_ADDRESS = "TD2LoErPRkVPBxDk72ZErtiyi6agirZQjX"
ERC20_ADDRESS = "0x21802218d8d661d66F2C7959347a6382E1cc614F"

# --- تخزين مؤقت لبيانات المستخدم خلال المحادثة ---
user_data = {}

# --- دالة بدء البوت ---
async def start(update: Update, context):
    keyboard = [
        [InlineKeyboardButton("شراء USDT 💰", callback_data="buy_usdt")],
        [InlineKeyboardButton("بيع USDT 💸", callback_data="sell_usdt")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    await update.message.reply_text(
        "مرحباً بك! 👋\n\n**ماذا يمكن لهذا البوت فعله؟**\n"
        "شراء وبيع USDT عن طريق وسائل الدفع المتاحة في سوريا.\n"
        "**ملاحظة:** التحويل 0.05% من المبلغ الكامل.\n\n"
        "الرجاء اختيار نوع المعاملة:",
        reply_markup=reply_markup
    )

# --- دالة التعامل مع استجابات الأزرار (CallbackQuery) ---
async def button(update: Update, context):
    query = update.callback_query
    await query.answer()
    chat_id = query.message.chat_id
    user_data[chat_id] = {} # تهيئة بيانات المستخدم لكل محادثة جديدة

    if query.data == "buy_usdt":
        user_data[chat_id]['transaction_type'] = 'buy'
        await query.edit_message_text("👍 اخترت **شراء USDT**.\n\nالرجاء إدخال اسمك الثلاثي:")
        return BUY_NAME
    elif query.data == "sell_usdt":
        user_data[chat_id]['transaction_type'] = 'sell'
        await query.edit_message_text("💸 اخترت **بيع USDT**.\n\nالرجاء إدخال كمية الـ USDT التي تود بيعها:")
        return SELL_AMOUNT

# --- الدوال المساعدة لإرسال الطلب للمالك ---
async def send_order_to_owner(context, chat_id, order_details):
    try:
        if order_details['transaction_type'] == 'buy':
            message_text = (
                f"🚨 **طلب شراء USDT جديد!** 🚨\n\n"
                f"**تفاصيل المستخدم:**\n"
                f"الاسم: {order_details['name']}\n"
                f"رقم الهاتف: {order_details['phone']}\n"
                f"المدينة: {order_details['city']}\n\n"
                f"**تفاصيل الطلب:**\n"
                f"الكمية المطلوبة: {order_details['amount_usdt']} USDT\n"
                f"طريقة الدفع: {order_details['payment_method']}\n"
                f"عنوان محفظة USDT: `{order_details['wallet_address']}`\n"
                f"نوع الشبكة: {order_details['network_type']}\n\n"
                f"--- (عمولة 0.05% تم احتسابها) ---"
            )
        else: # sell
            message_text = (
                f"🚨 **طلب بيع USDT جديد!** 🚨\n\n"
                f"**تفاصيل المستخدم:**\n"
                f"الاسم: {order_details['name']}\n"
                f"رقم الهاتف: {order_details['phone']}\n"
                f"المدينة: {order_details['city']}\n\n"
                f"**تفاصيل الطلب:**\n"
                f"الكمية المراد بيعها: {order_details['amount_usdt']} USDT\n"
                f"طريقة استلام المبلغ: {order_details['payment_method']}\n"
                f"تفاصيل استلام المبلغ: {order_details['receive_details']}\n"
                f"الشبكة التي سيتم التحويل عليها: {order_details['network_type']}\n\n"
                f"--- (عمولة 0.05% تم احتسابها) ---"
            )

        await context.bot.send_message(chat_id=OWNER_CHAT_ID, text=message_text, parse_mode='Markdown')
        print(f"Order sent to owner: {order_details}") # للdebugging
    except Exception as e:
        print(f"Error sending order to owner: {e}")

# --- دالة إلغاء المحادثة ---
async def cancel(update: Update, context):
    chat_id = update.message.chat_id
    if chat_id in user_data:
        del user_data[chat_id]
    await update.message.reply_text('تم إلغاء العملية. يمكنك البدء من جديد باستخدام /start.')
    return ConversationHandler.END

# --- دالة للتعامل مع أي رسالة غير متوقعة ---
async def fallback_message(update: Update, context):
    await update.message.reply_text("عذراً، لم أفهم طلبك. الرجاء استخدام الأزرار أو بدء عملية جديدة باستخدام /start.")
    return ConversationHandler.END

# --- الدالة الرئيسية لتشغيل البوت ---
def main():
    application = Application.builder().token(TELEGRAM_BOT_TOKEN).build()

    # --- محادثة الشراء ---
    buy_conv_handler = ConversationHandler(
        entry_points=[CallbackQueryHandler(button, pattern="^(buy_usdt)$")],
        states={
            BUY_NAME: [MessageHandler(filters.TEXT & ~filters.COMMAND, buy_name)],
            BUY_PHONE: [MessageHandler(filters.TEXT & ~filters.COMMAND, buy_phone)],
            BUY_CITY: [MessageHandler(filters.TEXT & ~filters.COMMAND, buy_city)],
            BUY_AMOUNT: [MessageHandler(filters.TEXT & ~filters.COMMAND, buy_amount)],
            BUY_PAYMENT_METHOD: [CallbackQueryHandler(buy_payment_method)],
            BUY_WALLET_ADDRESS: [MessageHandler(filters.TEXT & ~filters.COMMAND, buy_wallet_address)],
            BUY_NETWORK_TYPE: [CallbackQueryHandler(buy_network_type)],
            BUY_CONFIRM: [CallbackQueryHandler(buy_confirm)],
        },
        fallbacks=[CommandHandler("cancel", cancel), MessageHandler(filters.ALL, fallback_message)],
        allow_reentry=True # يسمح بإعادة الدخول للمحادثة
    )

    # --- محادثة البيع ---
    sell_conv_handler = ConversationHandler(
        entry_points=[CallbackQueryHandler(button, pattern="^(sell_usdt)$")],
        states={
            SELL_AMOUNT: [MessageHandler(filters.TEXT & ~filters.COMMAND, sell_amount)],
            SELL_PAYMENT_METHOD: [CallbackQueryHandler(sell_payment_method)],
            SELL_CONFIRM_DETAILS: [MessageHandler(filters.TEXT & ~filters.COMMAND, sell_confirm_details)],
            SELL_NETWORK_TYPE: [CallbackQueryHandler(sell_network_type)],
            SELL_CONFIRM: [CallbackQueryHandler(sell_confirm)],
        },
        fallbacks=[CommandHandler("cancel", cancel), MessageHandler(filters.ALL, fallback_message)],
        allow_reentry=True
    )

    application.add_handler(CommandHandler("start", start))
    application.add_handler(buy_conv_handler)
    application.add_handler(sell_conv_handler)
    application.add_handler(CallbackQueryHandler(button, pattern="^(buy_usdt|sell_usdt)$")) # لإعادة التوجيه إذا لم يكن جزءًا من المحادثة النشطة

    print("Bot is polling...")
    application.run_polling()

if __name__ == "__main__":
    main()
