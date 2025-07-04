<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MetaTrader 5 Web - منصة تداول متكاملة</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        :root {
            --primary: #2962ff;
            --secondary: #0d47a1;
            --success: #00c853;
            --danger: #ff1744;
            --warning: #ffab00;
            --dark: #263238;
            --light: #f5f7fa;
            --gray: #78909c;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Cairo', sans-serif;
        }
        
        body {
            background-color: #111827;
            color: #e0e0e0;
            overflow-x: hidden;
        }
        
        .container {
            display: grid;
            grid-template-columns: 250px 1fr;
            grid-template-rows: 60px 1fr 40px;
            grid-template-areas: 
                "header header"
                "sidebar main"
                "footer footer";
            height: 100vh;
            gap: 1px;
        }
        
        /* Header Styles */
        header {
            grid-area: header;
            background: linear-gradient(90deg, var(--dark), var(--secondary));
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            border-bottom: 1px solid var(--primary);
            box-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }
        
        .logo {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .logo img {
            height: 40px;
        }
        
        .logo h1 {
            font-size: 1.4rem;
            background: linear-gradient(90deg, #fff, #4fc3f7);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 700;
        }
        
        .account-info {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .balance {
            background: rgba(0, 0, 0, 0.3);
            padding: 5px 15px;
            border-radius: 20px;
            font-weight: 600;
            border: 1px solid var(--primary);
        }
        
        .balance span {
            color: var(--success);
        }
        
        .user-actions button {
            background: var(--primary);
            color: white;
            border: none;
            padding: 7px 15px;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s;
        }
        
        .user-actions button:hover {
            background: var(--secondary);
        }
        
        /* Sidebar Styles */
        .sidebar {
            grid-area: sidebar;
            background-color: #1e293b;
            border-right: 1px solid #334155;
            overflow-y: auto;
            padding: 20px 0;
        }
        
        .market-watch, .quick-actions {
            margin-bottom: 25px;
        }
        
        .section-title {
            padding: 10px 15px;
            color: #94a3b8;
            font-size: 0.9rem;
            border-bottom: 1px solid #334155;
            display: flex;
            justify-content: space-between;
        }
        
        .symbol-list {
            list-style: none;
        }
        
        .symbol-item {
            padding: 12px 15px;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #2d3748;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .symbol-item:hover {
            background-color: #2d3748;
        }
        
        .symbol-item.active {
            background: linear-gradient(90deg, #1e3a8a, #1e40af);
            border-left: 3px solid var(--primary);
        }
        
        .symbol-name {
            font-weight: 600;
        }
        
        .symbol-price {
            font-weight: 700;
        }
        
        .positive {
            color: var(--success);
        }
        
        .negative {
            color: var(--danger);
        }
        
        .action-buttons {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            padding: 15px;
        }
        
        .action-buttons button {
            padding: 12px;
            border-radius: 5px;
            border: none;
            background: var(--primary);
            color: white;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .action-buttons button:hover {
            opacity: 0.9;
        }
        
        .action-buttons button.withdraw {
            background: var(--danger);
        }
        
        /* Main Content Styles */
        .main-content {
            grid-area: main;
            display: grid;
            grid-template-columns: 1fr 350px;
            grid-template-rows: 1fr 250px;
            grid-template-areas: 
                "chart order"
                "positions history";
            gap: 1px;
            overflow: hidden;
        }
        
        .chart-container {
            grid-area: chart;
            background-color: #1e293b;
            padding: 15px;
            position: relative;
        }
        
        .chart-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
        }
        
        .chart-title {
            font-size: 1.2rem;
            font-weight: 700;
            color: white;
        }
        
        .chart-actions {
            display: flex;
            gap: 10px;
        }
        
        .chart-actions select, .chart-actions button {
            background: #334155;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 3px;
            cursor: pointer;
        }
        
        .chart-wrapper {
            height: calc(100% - 40px);
            position: relative;
        }
        
        .order-box {
            grid-area: order;
            background-color: #1e293b;
            padding: 15px;
            border-left: 1px solid #334155;
        }
        
        .order-header {
            font-size: 1.1rem;
            font-weight: 700;
            margin-bottom: 15px;
            color: white;
            text-align: center;
        }
        
        .order-form {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .form-group {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        
        .form-group label {
            font-size: 0.9rem;
            color: #94a3b8;
        }
        
        .form-group input, .form-group select {
            background: #334155;
            border: 1px solid #475569;
            border-radius: 4px;
            padding: 10px;
            color: white;
        }
        
        .order-buttons {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-top: 10px;
        }
        
        .order-buttons button {
            padding: 12px;
            border-radius: 5px;
            border: none;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .buy-btn {
            background: var(--success);
            color: white;
        }
        
        .sell-btn {
            background: var(--danger);
            color: white;
        }
        
        .positions {
            grid-area: positions;
            background-color: #1e293b;
            padding: 15px;
            border-top: 1px solid #334155;
        }
        
        .history {
            grid-area: history;
            background-color: #1e293b;
            padding: 15px;
            border-top: 1px solid #334155;
            border-left: 1px solid #334155;
        }
        
        .table-container {
            overflow-y: auto;
            height: calc(100% - 30px);
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.9rem;
        }
        
        th {
            background-color: #334155;
            color: #94a3b8;
            text-align: right;
            padding: 10px 15px;
            position: sticky;
            top: 0;
        }
        
        td {
            padding: 10px 15px;
            border-bottom: 1px solid #334155;
            text-align: right;
        }
        
        .table-header {
            font-size: 1.1rem;
            font-weight: 700;
            margin-bottom: 10px;
            color: white;
        }
        
        /* Footer Styles */
        footer {
            grid-area: footer;
            background: #0f172a;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            font-size: 0.8rem;
            color: #94a3b8;
            border-top: 1px solid #334155;
        }
        
        .status {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .status-indicator {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: var(--success);
        }
        
        /* Responsive */
        @media (max-width: 1200px) {
            .container {
                grid-template-columns: 200px 1fr;
            }
            
            .main-content {
                grid-template-columns: 1fr 300px;
            }
        }
        
        @media (max-width: 992px) {
            .main-content {
                grid-template-columns: 1fr;
                grid-template-rows: auto auto auto auto;
                grid-template-areas: 
                    "chart"
                    "order"
                    "positions"
                    "history";
            }
            
            .order-box {
                border-left: none;
                border-top: 1px solid #334155;
            }
            
            .history {
                border-left: none;
            }
        }
        
        @media (max-width: 768px) {
            .container {
                grid-template-columns: 1fr;
                grid-template-areas: 
                    "header"
                    "main"
                    "sidebar"
                    "footer";
            }
            
            .sidebar {
                border-right: none;
                border-top: 1px solid #334155;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <div class="logo">
                <i class="fas fa-chart-line fa-lg" style="color: #4fc3f7;"></i>
                <h1>MetaTrader 5 Web</h1>
            </div>
            <div class="account-info">
                <div class="balance">الرصيد: <span>10,250.00 USD</span></div>
                <div class="user-actions">
                    <button id="depositBtn"><i class="fas fa-plus-circle"></i> إيداع</button>
                    <button id="withdrawBtn" class="withdraw"><i class="fas fa-minus-circle"></i> سحب</button>
                </div>
            </div>
        </header>
        
        <aside class="sidebar">
            <div class="market-watch">
                <div class="section-title">
                    <span>قائمة التداول</span>
                    <i class="fas fa-search"></i>
                </div>
                <ul class="symbol-list">
                    <li class="symbol-item active">
                        <div class="symbol-name">EUR/USD</div>
                        <div class="symbol-price positive">1.0875 <i class="fas fa-arrow-up"></i></div>
                    </li>
                    <li class="symbol-item">
                        <div class="symbol-name">GBP/USD</div>
                        <div class="symbol-price negative">1.2713 <i class="fas fa-arrow-down"></i></div>
                    </li>
                    <li class="symbol-item">
                        <div class="symbol-name">USD/JPY</div>
                        <div class="symbol-price positive">149.65 <i class="fas fa-arrow-up"></i></div>
                    </li>
                    <li class="symbol-item">
                        <div class="symbol-name">AUD/USD</div>
                        <div class="symbol-price negative">0.6522 <i class="fas fa-arrow-down"></i></div>
                    </li>
                    <li class="symbol-item">
                        <div class="symbol-name">USD/CAD</div>
                        <div class="symbol-price positive">1.3582 <i class="fas fa-arrow-up"></i></div>
                    </li>
                    <li class="symbol-item">
                        <div class="symbol-name">NZD/USD</div>
                        <div class="symbol-price positive">0.5989 <i class="fas fa-arrow-up"></i></div>
                    </li>
                    <li class="symbol-item">
                        <div class="symbol-name">XAU/USD</div>
                        <div class="symbol-price negative">1975.30 <i class="fas fa-arrow-down"></i></div>
                    </li>
                    <li class="symbol-item">
                        <div class="symbol-name">XAG/USD</div>
                        <div class="symbol-price positive">23.15 <i class="fas fa-arrow-up"></i></div>
                    </li>
                    <li class="symbol-item">
                        <div class="symbol-name">US OIL</div>
                        <div class="symbol-price positive">78.42 <i class="fas fa-arrow-up"></i></div>
                    </li>
                </ul>
            </div>
            
            <div class="quick-actions">
                <div class="section-title">
                    <span>محفظة BEP20</span>
                    <i class="fas fa-wallet"></i>
                </div>
                <div class="action-buttons">
                    <button id="bep20Deposit"><i class="fab fa-ethereum"></i> إيداع BEP20</button>
                    <button id="bep20Withdraw" class="withdraw"><i class="fas fa-external-link-alt"></i> سحب BEP20</button>
                </div>
            </div>
        </aside>
        
        <main class="main-content">
            <section class="chart-container">
                <div class="chart-header">
                    <div class="chart-title">EUR/USD - الرسم البياني</div>
                    <div class="chart-actions">
                        <select id="timeframe">
                            <option value="1m">1 دقيقة</option>
                            <option value="5m">5 دقائق</option>
                            <option value="15m">15 دقيقة</option>
                            <option value="30m">30 دقيقة</option>
                            <option value="1h">1 ساعة</option>
                            <option value="4h" selected>4 ساعات</option>
                            <option value="1d">يومي</option>
                        </select>
                        <button><i class="fas fa-indicator"></i> مؤشرات</button>
                        <button><i class="fas fa-drawing-tool"></i> أدوات</button>
                    </div>
                </div>
                <div class="chart-wrapper">
                    <canvas id="priceChart"></canvas>
                </div>
            </section>
            
            <section class="order-box">
                <div class="order-header">أمر تداول جديد</div>
                <div class="order-form">
                    <div class="form-group">
                        <label for="symbol">الزوج</label>
                        <select id="symbol">
                            <option value="EURUSD">EUR/USD</option>
                            <option value="GBPUSD">GBP/USD</option>
                            <option value="USDJPY">USD/JPY</option>
                            <option value="AUDUSD">AUD/USD</option>
                            <option value="USDCAD">USD/CAD</option>
                            <option value="NZDUSD">NZD/USD</option>
                            <option value="XAUUSD">الذهب</option>
                            <option value="XAGUSD">الفضة</option>
                            <option value="USOIL">النفط</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="volume">الحجم (لوت)</label>
                        <input type="number" id="volume" min="0.01" step="0.01" value="0.10">
                    </div>
                    
                    <div class="form-group">
                        <label for="orderType">نوع الأمر</label>
                        <select id="orderType">
                            <option value="market">سوقي</option>
                            <option value="limit">حد</option>
                            <option value="stop">إيقاف</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="price">السعر (إذا لم يكن سوقي)</label>
                        <input type="number" id="price" step="0.0001" value="1.0875">
                    </div>
                    
                    <div class="order-buttons">
                        <button class="buy-btn">شراء</button>
                        <button class="sell-btn">بيع</button>
                    </div>
                </div>
            </section>
            
            <section class="positions">
                <div class="table-header">المراكز المفتوحة</div>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>الزوج</th>
                                <th>الحجم</th>
                                <th>سعر الدخول</th>
                                <th>السعر الحالي</th>
                                <th>الربح</th>
                                <th>الإجراء</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>EUR/USD</td>
                                <td>0.50</td>
                                <td>1.0852</td>
                                <td>1.0875</td>
                                <td class="positive">+115.00 USD</td>
                                <td><button class="sell-btn">إغلاق</button></td>
                            </tr>
                            <tr>
                                <td>XAU/USD</td>
                                <td>0.20</td>
                                <td>1965.40</td>
                                <td>1975.30</td>
                                <td class="positive">+198.00 USD</td>
                                <td><button class="sell-btn">إغلاق</button></td>
                            </tr>
                            <tr>
                                <td>USD/JPY</td>
                                <td>0.30</td>
                                <td>149.85</td>
                                <td>149.65</td>
                                <td class="negative">-60.00 USD</td>
                                <td><button class="sell-btn">إغلاق</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            
            <section class="history">
                <div class="table-header">سجل التداول</div>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>التاريخ</th>
                                <th>الزوج</th>
                                <th>النوع</th>
                                <th>الحجم</th>
                                <th>السعر</th>
                                <th>الربح</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2023-11-05 14:30</td>
                                <td>GBP/USD</td>
                                <td>بيع</td>
                                <td>0.20</td>
                                <td>1.2720</td>
                                <td class="positive">+42.50 USD</td>
                            </tr>
                            <tr>
                                <td>2023-11-05 10:15</td>
                                <td>AUD/USD</td>
                                <td>شراء</td>
                                <td>0.15</td>
                                <td>0.6510</td>
                                <td class="positive">+18.00 USD</td>
                            </tr>
                            <tr>
                                <td>2023-11-04 16:45</td>
                                <td>US OIL</td>
                                <td>بيع</td>
                                <td>0.10</td>
                                <td>78.80</td>
                                <td class="negative">-38.00 USD</td>
                            </tr>
                            <tr>
                                <td>2023-11-04 09:20</td>
                                <td>EUR/USD</td>
                                <td>شراء</td>
                                <td>0.50</td>
                                <td>1.0852</td>
                                <td class="positive">+115.00 USD</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
        
        <footer>
            <div class="status">
                <div class="status-indicator"></div>
                <span>متصل - سرعة 24 مللي ثانية</span>
            </div>
            <div class="server-info">
                خادم: MT5-Web-Server #1 (London)
            </div>
            <div class="copyright">
                &copy; 2023 MetaTrader 5 Web - نظام التداول الآلي عبر BEP20
            </div>
        </footer>
    </div>
    
    <!-- Deposit Modal -->
    <div id="depositModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>إيداع الأموال عبر BEP20</h2>
            <div class="modal-body">
                <div class="qr-code">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=0x742d35Cc6634C0532925a3b844Bc454e4438f44e" alt="BEP20 Deposit QR">
                </div>
                <div class="wallet-address">
                    <p>عنوان المحفظة:</p>
                    <p id="bep20Address">0x742d35Cc6634C0532925a3b844Bc454e4438f44e</p>
                    <button id="copyAddressBtn">نسخ العنوان</button>
                </div>
                <div class="instructions">
                    <p><strong>تعليمات الإيداع:</strong></p>
                    <ol>
                        <li>ارسل الأموال إلى العنوان أعلاه عبر شبكة BEP20 فقط</li>
                        <li>تأكد من استخدام شبكة Binance Smart Chain (BSC)</li>
                        <li>سوف يتم ايداع الأموال تلقائياً خلال 1-5 دقائق</li>
                        <li>الحد الأدنى للإيداع: 10 USDT</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        // Chart Initialization
        const ctx = document.getElementById('priceChart').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
                datasets: [{
                    label: 'EUR/USD',
                    data: [1.0850, 1.0862, 1.0878, 1.0865, 1.0870, 1.0882, 1.0875, 1.0880],
                    borderColor: '#2962ff',
                    backgroundColor: 'rgba(41, 98, 255, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#94a3b8'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#94a3b8'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                interaction: {
                    mode: 'nearest',
                    intersect: false
                }
            }
        });
        
        // Modal functionality
        const depositModal = document.getElementById('depositModal');
        const depositBtn = document.getElementById('depositBtn');
        const withdrawBtn = document.getElementById('withdrawBtn');
        const closeModal = document.getElementsByClassName('close')[0];
        const copyAddressBtn = document.getElementById('copyAddressBtn');
        
        depositBtn.onclick = function() {
            depositModal.style.display = 'block';
        }
        
        withdrawBtn.onclick = function() {
            alert('نظام السحب الآلي عبر BEP20:\n1. أدخل عنوان محفظتك BEP20\n2. حدد المبلغ\n3. سيتم المعالجة خلال 1-3 دقائق');
        }
        
        closeModal.onclick = function() {
            depositModal.style.display = 'none';
        }
        
        window.onclick = function(event) {
            if (event.target == depositModal) {
                depositModal.style.display = 'none';
            }
        }
        
        // Copy wallet address
        copyAddressBtn.onclick = function() {
            const address = document.getElementById('bep20Address').textContent;
            navigator.clipboard.writeText(address).then(() => {
                alert('تم نسخ عنوان المحفظة: ' + address);
            });
        }
        
        // Symbol selection
        const symbolItems = document.querySelectorAll('.symbol-item');
        symbolItems.forEach(item => {
            item.addEventListener('click', function() {
                symbolItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                
                const symbolName = this.querySelector('.symbol-name').textContent;
                document.querySelector('.chart-title').textContent = symbolName + ' - الرسم البياني';
                document.getElementById('symbol').value = symbolName.split('/').join('');
            });
        });
        
        // BEP20 wallet actions
        document.getElementById('bep20Deposit').addEventListener('click', function() {
            depositModal.style.display = 'block';
        });
        
        document.getElementById('bep20Withdraw').addEventListener('click', function() {
            alert('نظام السحب الآلي عبر BEP20:\n1. أدخل عنوان محفظتك BEP20\n2. حدد المبلغ\n3. سيتم المعالجة خلال 1-3 دقائق');
        });
        
        // Simulate real-time price updates
        setInterval(() => {
            const symbols = document.querySelectorAll('.symbol-item:not(.active)');
            symbols.forEach(symbol => {
                const change = Math.random() > 0.5 ? 1 : -1;
                const priceElement = symbol.querySelector('.symbol-price');
                let price = parseFloat(priceElement.textContent.split(' ')[0]);
                const changeAmount = (Math.random() * 0.001).toFixed(4);
                
                price = (price + (change * changeAmount)).toFixed(4);
                priceElement.textContent = price + ' ';
                
                if (change > 0) {
                    priceElement.classList.remove('negative');
                    priceElement.classList.add('positive');
                    priceElement.innerHTML = price + ' <i class="fas fa-arrow-up"></i>';
                } else {
                    priceElement.classList.remove('positive');
                    priceElement.classList.add('negative');
                    priceElement.innerHTML = price + ' <i class="fas fa-arrow-down"></i>';
                }
            });
        }, 5000);
    </script>
</body>
</html>
