<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>منصة التداول المتقدمة - MT5 Web</title>
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js"></script>
    <style>
        :root {
            --primary: #2962ff;
            --secondary: #0d47a1;
            --success: #00c853;
            --danger: #ff1744;
            --warning: #ffab00;
            --dark: #0f1a2e;
            --darker: #0a1425;
            --light: #f5f7fa;
            --gray: #78909c;
            --border: #1e2b48;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Tajawal', sans-serif;
        }
        
        body {
            background-color: var(--darker);
            color: #e0e0e0;
            overflow-x: hidden;
            font-size: 0.95rem;
        }
        
        .container {
            display: grid;
            grid-template-columns: 250px 1fr;
            grid-template-rows: 70px 1fr 40px;
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
            padding: 0 25px;
            border-bottom: 1px solid var(--border);
            box-shadow: 0 2px 15px rgba(0,0,0,0.5);
            position: relative;
            z-index: 100;
        }
        
        .logo {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .logo img {
            height: 45px;
        }
        
        .logo h1 {
            font-size: 1.6rem;
            background: linear-gradient(90deg, #fff, #64b5f6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 700;
        }
        
        .nav-menu {
            display: flex;
            gap: 5px;
            margin: 0 20px;
        }
        
        .nav-menu button {
            background: rgba(255,255,255,0.08);
            border: none;
            color: #bbdefb;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .nav-menu button:hover {
            background: rgba(41, 98, 255, 0.3);
        }
        
        .nav-menu button.active {
            background: var(--primary);
            color: white;
        }
        
        .account-info {
            display: flex;
            align-items: center;
            gap: 20px;
        }
        
        .balance {
            background: rgba(0, 0, 0, 0.3);
            padding: 8px 18px;
            border-radius: 25px;
            font-weight: 600;
            border: 1px solid var(--primary);
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .balance i {
            color: #64b5f6;
        }
        
        .balance span {
            color: var(--success);
            font-weight: 700;
        }
        
        .user-menu {
            position: relative;
        }
        
        .user-btn {
            background: rgba(41, 98, 255, 0.2);
            border: 1px solid var(--primary);
            color: white;
            padding: 8px 15px;
            border-radius: 20px;
            cursor: pointer;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s;
        }
        
        .user-btn:hover {
            background: rgba(41, 98, 255, 0.4);
        }
        
        .dropdown-menu {
            position: absolute;
            top: 110%;
            right: 0;
            background: var(--dark);
            border: 1px solid var(--border);
            border-radius: 8px;
            width: 250px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.5);
            display: none;
            z-index: 200;
        }
        
        .dropdown-menu.show {
            display: block;
        }
        
        .dropdown-menu button {
            width: 100%;
            text-align: right;
            padding: 12px 20px;
            background: none;
            border: none;
            color: #e0e0e0;
            display: flex;
            align-items: center;
            gap: 12px;
            border-bottom: 1px solid var(--border);
            transition: all 0.2s;
        }
        
        .dropdown-menu button:hover {
            background: rgba(41, 98, 255, 0.2);
        }
        
        .dropdown-menu button i {
            width: 20px;
            text-align: center;
        }
        
        /* Sidebar Styles */
        .sidebar {
            grid-area: sidebar;
            background-color: var(--dark);
            border-right: 1px solid var(--border);
            overflow-y: auto;
            padding: 20px 0;
            display: flex;
            flex-direction: column;
        }
        
        .sidebar-section {
            margin-bottom: 25px;
        }
        
        .section-title {
            padding: 10px 20px;
            color: #64b5f6;
            font-size: 1rem;
            border-bottom: 1px solid var(--border);
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
        }
        
        .symbol-list {
            list-style: none;
        }
        
        .symbol-item {
            padding: 12px 20px;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid var(--border);
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .symbol-item:hover {
            background-color: rgba(41, 98, 255, 0.1);
        }
        
        .symbol-item.active {
            background: linear-gradient(90deg, rgba(13, 71, 161, 0.3), rgba(13, 71, 161, 0.1));
            border-right: 3px solid var(--primary);
        }
        
        .symbol-name {
            font-weight: 600;
        }
        
        .symbol-price {
            font-weight: 700;
            font-family: 'Courier New', monospace;
        }
        
        .positive {
            color: var(--success);
        }
        
        .negative {
            color: var(--danger);
        }
        
        /* Main Content Styles */
        .main-content {
            grid-area: main;
            display: grid;
            grid-template-columns: 1fr 350px;
            grid-template-rows: 1fr 250px;
            grid-template-areas: 
                "chart trading"
                "positions history";
            gap: 1px;
            overflow: hidden;
        }
        
        .chart-container {
            grid-area: chart;
            background-color: var(--dark);
            padding: 15px;
            position: relative;
            display: flex;
            flex-direction: column;
        }
        
        .chart-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
            align-items: center;
        }
        
        .chart-title {
            font-size: 1.3rem;
            font-weight: 700;
            color: white;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .chart-actions {
            display: flex;
            gap: 10px;
        }
        
        .chart-actions select, .chart-actions button {
            background: rgba(30, 43, 72, 0.8);
            color: white;
            border: 1px solid var(--border);
            padding: 8px 15px;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.2s;
        }
        
        .chart-actions select:hover, .chart-actions button:hover {
            background: rgba(41, 98, 255, 0.3);
        }
        
        .chart-wrapper {
            height: 100%;
            position: relative;
            border: 1px solid var(--border);
            border-radius: 8px;
            overflow: hidden;
        }
        
        #tv-chart {
            width: 100%;
            height: 100%;
        }
        
        /* Trading Panel */
        .trading-panel {
            grid-area: trading;
            background-color: var(--dark);
            padding: 20px;
            border-left: 1px solid var(--border);
            display: flex;
            flex-direction: column;
        }
        
        .panel-header {
            font-size: 1.2rem;
            font-weight: 700;
            margin-bottom: 20px;
            color: white;
            text-align: center;
            padding-bottom: 10px;
            border-bottom: 1px solid var(--border);
        }
        
        .order-tabs {
            display: flex;
            background: rgba(30, 43, 72, 0.8);
            border-radius: 8px;
            padding: 5px;
            margin-bottom: 20px;
        }
        
        .tab {
            flex: 1;
            text-align: center;
            padding: 10px;
            cursor: pointer;
            border-radius: 6px;
            transition: all 0.3s;
            font-weight: 500;
        }
        
        .tab.active {
            background: var(--primary);
            color: white;
        }
        
        .order-form {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .form-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        
        .form-group label {
            font-size: 0.95rem;
            color: #90a4ae;
            font-weight: 500;
        }
        
        .form-group input, .form-group select {
            background: rgba(30, 43, 72, 0.8);
            border: 1px solid var(--border);
            border-radius: 6px;
            padding: 12px 15px;
            color: white;
            font-size: 1rem;
        }
        
        .form-group input:focus, .form-group select:focus {
            outline: none;
            border-color: var(--primary);
        }
        
        .size-buttons {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
            margin-top: 5px;
        }
        
        .size-btn {
            background: rgba(30, 43, 72, 0.8);
            border: 1px solid var(--border);
            color: #bbdefb;
            padding: 8px;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .size-btn:hover {
            background: rgba(41, 98, 255, 0.3);
        }
        
        .size-btn.active {
            background: var(--primary);
            color: white;
            border-color: var(--primary);
        }
        
        .order-buttons {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-top: 10px;
        }
        
        .order-buttons button {
            padding: 15px;
            border-radius: 8px;
            border: none;
            font-weight: 700;
            font-size: 1.05rem;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }
        
        .buy-btn {
            background: linear-gradient(135deg, var(--success), #009624);
            color: white;
            box-shadow: 0 4px 10px rgba(0, 200, 83, 0.3);
        }
        
        .buy-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 15px rgba(0, 200, 83, 0.4);
        }
        
        .sell-btn {
            background: linear-gradient(135deg, var(--danger), #d50000);
            color: white;
            box-shadow: 0 4px 10px rgba(255, 23, 68, 0.3);
        }
        
        .sell-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 15px rgba(255, 23, 68, 0.4);
        }
        
        /* Positions and History */
        .positions {
            grid-area: positions;
            background-color: var(--dark);
            padding: 20px;
            border-top: 1px solid var(--border);
            display: flex;
            flex-direction: column;
        }
        
        .history {
            grid-area: history;
            background-color: var(--dark);
            padding: 20px;
            border-top: 1px solid var(--border);
            border-left: 1px solid var(--border);
            display: flex;
            flex-direction: column;
        }
        
        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .section-title {
            padding: 0;
            border: none;
            margin: 0;
            color: #64b5f6;
            font-size: 1.1rem;
        }
        
        .table-container {
            overflow-y: auto;
            flex: 1;
            border: 1px solid var(--border);
            border-radius: 8px;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.95rem;
        }
        
        th {
            background-color: rgba(30, 43, 72, 0.8);
            color: #90a4ae;
            text-align: right;
            padding: 12px 15px;
            position: sticky;
            top: 0;
            font-weight: 600;
        }
        
        td {
            padding: 12px 15px;
            border-bottom: 1px solid var(--border);
            text-align: right;
        }
        
        tr:hover {
            background-color: rgba(41, 98, 255, 0.05);
        }
        
        .action-btn {
            padding: 6px 12px;
            border-radius: 4px;
            border: none;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .close-btn {
            background: rgba(255, 23, 68, 0.15);
            color: var(--danger);
        }
        
        .close-btn:hover {
            background: rgba(255, 23, 68, 0.25);
        }
        
        /* Footer Styles */
        footer {
            grid-area: footer;
            background: var(--dark);
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 25px;
            font-size: 0.9rem;
            color: #90a4ae;
            border-top: 1px solid var(--border);
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
        
        /* Wallet Section */
        .wallet-section {
            display: none;
            position: fixed;
            top: 70px;
            right: 0;
            bottom: 40px;
            width: 100%;
            background: var(--dark);
            z-index: 90;
            padding: 30px;
            overflow-y: auto;
        }
        
        .wallet-section.active {
            display: block;
        }
        
        .wallet-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 1px solid var(--border);
        }
        
        .wallet-title {
            font-size: 1.8rem;
            color: white;
            font-weight: 700;
        }
        
        .close-wallet {
            background: rgba(255,255,255,0.1);
            border: none;
            color: #90a4ae;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.2rem;
            transition: all 0.3s;
        }
        
        .close-wallet:hover {
            background: var(--danger);
            color: white;
        }
        
        .wallet-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 25px;
            margin-bottom: 40px;
        }
        
        .wallet-card {
            background: linear-gradient(135deg, rgba(30, 43, 72, 0.8), rgba(13, 71, 161, 0.5));
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 25px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }
        
        .card-title {
            font-size: 1.3rem;
            color: white;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .card-title i {
            color: var(--primary);
        }
        
        .wallet-info {
            margin-bottom: 25px;
        }
        
        .info-row {
            display: flex;
            justify-content: space-between;
            padding: 12px 0;
            border-bottom: 1px solid var(--border);
        }
        
        .info-label {
            color: #90a4ae;
        }
        
        .info-value {
            color: white;
            font-weight: 600;
        }
        
        .wallet-address {
            background: rgba(0,0,0,0.2);
            border: 1px dashed var(--primary);
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .address-text {
            font-family: monospace;
            font-size: 0.9rem;
            word-break: break-all;
            color: #bbdefb;
        }
        
        .copy-btn {
            background: rgba(41, 98, 255, 0.2);
            border: 1px solid var(--primary);
            color: var(--primary);
            border-radius: 5px;
            padding: 8px 15px;
            cursor: pointer;
            transition: all 0.2s;
            flex-shrink: 0;
            margin-left: 15px;
        }
        
        .copy-btn:hover {
            background: var(--primary);
            color: white;
        }
        
        .instructions {
            background: rgba(0,0,0,0.2);
            border-radius: 8px;
            padding: 20px;
            margin-top: 20px;
        }
        
        .instructions h3 {
            color: #64b5f6;
            margin-bottom: 15px;
        }
        
        .instructions ol {
            padding-right: 20px;
            line-height: 1.8;
        }
        
        .instructions li {
            margin-bottom: 10px;
        }
        
        .form-actions {
            display: flex;
            gap: 15px;
            margin-top: 20px;
        }
        
        .form-actions button {
            flex: 1;
            padding: 15px;
            border-radius: 8px;
            border: none;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .submit-btn {
            background: var(--primary);
            color: white;
        }
        
        .cancel-btn {
            background: rgba(255,255,255,0.1);
            color: #e0e0e0;
        }
        
        .submit-btn:hover {
            background: var(--secondary);
        }
        
        .cancel-btn:hover {
            background: rgba(255,255,255,0.2);
        }
        
        /* Responsive */
        @media (max-width: 1200px) {
            .container {
                grid-template-columns: 200px 1fr;
            }
            
            .trading-panel {
                padding: 15px;
            }
        }
        
        @media (max-width: 992px) {
            .main-content {
                grid-template-columns: 1fr;
                grid-template-rows: 500px auto auto auto;
                grid-template-areas: 
                    "chart"
                    "trading"
                    "positions"
                    "history";
            }
            
            .trading-panel {
                border-left: none;
                border-top: 1px solid var(--border);
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
                    "footer";
            }
            
            .sidebar {
                display: none;
            }
            
            .nav-menu {
                display: none;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <div class="logo">
                <i class="fas fa-chart-line fa-lg" style="color: #64b5f6;"></i>
                <h1>MT5 Web Pro</h1>
            </div>
            
            <div class="nav-menu">
                <button class="active"><i class="fas fa-chart-line"></i> التداول</button>
                <button><i class="fas fa-exchange-alt"></i> التحويلات</button>
                <button><i class="fas fa-history"></i> السجلات</button>
                <button><i class="fas fa-cog"></i> الإعدادات</button>
            </div>
            
            <div class="account-info">
                <div class="balance">
                    <i class="fas fa-wallet"></i>
                    الرصيد: <span>8,450.75 USD</span>
                </div>
                
                <div class="user-menu">
                    <button class="user-btn" id="userMenuBtn">
                        <i class="fas fa-user-circle"></i>
                        محمد أحمد
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="dropdown-menu" id="dropdownMenu">
                        <button><i class="fas fa-user"></i> الملف الشخصي</button>
                        <button><i class="fas fa-wallet"></i> المحفظة</button>
                        <button><i class="fas fa-lock"></i> الأمان</button>
                        <button><i class="fas fa-history"></i> سجل التداول</button>
                        <button><i class="fas fa-sign-out-alt"></i> تسجيل الخروج</button>
                    </div>
                </div>
            </div>
        </header>
        
        <aside class="sidebar">
            <div class="sidebar-section">
                <div class="section-title">
                    <span>أزواج العملات</span>
                    <i class="fas fa-search"></i>
                </div>
                <ul class="symbol-list">
                    <li class="symbol-item active">
                        <div class="symbol-name">EUR/USD</div>
                        <div class="symbol-price positive">1.0875</div>
                    </li>
                    <li class="symbol-item">
                        <div class="symbol-name">GBP/USD</div>
                        <div class="symbol-price negative">1.2713</div>
                    </li>
                    <li class="symbol-item">
                        <div class="symbol-name">USD/JPY</div>
                        <div class="symbol-price positive">149.65</div>
                    </li>
                    <li class="symbol-item">
                        <div class="symbol-name">AUD/USD</div>
                        <div class="symbol-price negative">0.6522</div>
                    </li>
                    <li class="symbol-item">
                        <div class="symbol-name">USD/CAD</div>
                        <div class="symbol-price positive">1.3582</div>
                    </li>
                    <li class="symbol-item">
                        <div class="symbol-name">NZD/USD</div>
                        <div class="symbol-price positive">0.5989</div>
                    </li>
                </ul>
            </div>
            
            <div class="sidebar-section">
                <div class="section-title">
                    <span>السلع والمؤشرات</span>
                    <i class="fas fa-chart-bar"></i>
                </div>
                <ul class="symbol-list">
                    <li class="symbol-item">
                        <div class="symbol-name">XAU/USD</div>
                        <div class="symbol-price negative">1975.30</div>
                    </li>
                    <li class="symbol-item">
                        <div class="symbol-name">XAG/USD</div>
                        <div class="symbol-price positive">23.15</div>
                    </li>
                    <li class="symbol-item">
                        <div class="symbol-name">النفط الخام</div>
                        <div class="symbol-price positive">78.42</div>
                    </li>
                    <li class="symbol-item">
                        <div class="symbol-name">داو جونز</div>
                        <div class="symbol-price negative">33,845.20</div>
                    </li>
                </ul>
            </div>
            
            <div class="sidebar-section">
                <div class="section-title">
                    <span>المفضلة</span>
                    <i class="fas fa-star"></i>
                </div>
                <ul class="symbol-list">
                    <li class="symbol-item">
                        <div class="symbol-name">BTC/USD</div>
                        <div class="symbol-price positive">34,850.00</div>
                    </li>
                    <li class="symbol-item">
                        <div class="symbol-name">ETH/USD</div>
                        <div class="symbol-price positive">1,845.60</div>
                    </li>
                </ul>
            </div>
        </aside>
        
        <main class="main-content">
            <section class="chart-container">
                <div class="chart-header">
                    <div class="chart-title">
                        <i class="fas fa-euro-sign"></i>/<i class="fas fa-dollar-sign"></i>
                        EUR/USD - رسم بياني مباشر
                    </div>
                    <div class="chart-actions">
                        <select id="timeframe">
                            <option value="1m">1 دقيقة</option>
                            <option value="5m">5 دقائق</option>
                            <option value="15m">15 دقيقة</option>
                            <option value="30m">30 دقيقة</option>
                            <option value="1h">1 ساعة</option>
                            <option value="4h" selected>4 ساعات</option>
                            <option value="1d">يومي</option>
                            <option value="1w">أسبوعي</option>
                        </select>
                        <button><i class="fas fa-drawing-tool"></i> أدوات</button>
                        <button><i class="fas fa-cog"></i> إعدادات</button>
                    </div>
                </div>
                <div class="chart-wrapper">
                    <div id="tv-chart"></div>
                </div>
            </section>
            
            <section class="trading-panel">
                <div class="panel-header">لوحة التداول</div>
                
                <div class="order-tabs">
                    <div class="tab active" data-tab="market">سوقي</div>
                    <div class="tab" data-tab="limit">حد</div>
                    <div class="tab" data-tab="stop">إيقاف</div>
                </div>
                
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
                        
                        <div class="size-buttons">
                            <div class="size-btn">0.01</div>
                            <div class="size-btn">0.10</div>
                            <div class="size-btn active">0.50</div>
                            <div class="size-btn">1.00</div>
                        </div>
                    </div>
                    
                    <div class="form-group" id="limitGroup" style="display: none;">
                        <label for="limitPrice">سعر الحد</label>
                        <input type="number" id="limitPrice" step="0.0001" value="1.0850">
                    </div>
                    
                    <div class="form-group" id="stopGroup" style="display: none;">
                        <label for="stopPrice">سعر الإيقاف</label>
                        <input type="number" id="stopPrice" step="0.0001" value="1.0900">
                    </div>
                    
                    <div class="form-group">
                        <label for="stoploss">وقف الخسارة</label>
                        <input type="number" id="stoploss" step="0.0001" value="1.0820">
                    </div>
                    
                    <div class="form-group">
                        <label for="takeprofit">جني الأرباح</label>
                        <input type="number" id="takeprofit" step="0.0001" value="1.0950">
                    </div>
                    
                    <div class="order-buttons">
                        <button class="buy-btn"><i class="fas fa-arrow-up"></i> شراء</button>
                        <button class="sell-btn"><i class="fas fa-arrow-down"></i> بيع</button>
                    </div>
                </div>
            </section>
            
            <section class="positions">
                <div class="section-header">
                    <div class="section-title">المراكز المفتوحة</div>
                    <button class="action-btn"><i class="fas fa-sync-alt"></i> تحديث</button>
                </div>
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
                                <td><button class="action-btn close-btn">إغلاق</button></td>
                            </tr>
                            <tr>
                                <td>XAU/USD</td>
                                <td>0.20</td>
                                <td>1965.40</td>
                                <td>1975.30</td>
                                <td class="positive">+198.00 USD</td>
                                <td><button class="action-btn close-btn">إغلاق</button></td>
                            </tr>
                            <tr>
                                <td>USD/JPY</td>
                                <td>0.30</td>
                                <td>149.85</td>
                                <td>149.65</td>
                                <td class="negative">-60.00 USD</td>
                                <td><button class="action-btn close-btn">إغلاق</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            
            <section class="history">
                <div class="section-header">
                    <div class="section-title">سجل التداول</div>
                    <button class="action-btn"><i class="fas fa-download"></i> تصدير</button>
                </div>
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
                <span>متصل - سرعة 18 مللي ثانية</span>
            </div>
            <div class="server-info">
                خادم: MT5-Pro-Server #1 (دبي)
            </div>
            <div class="copyright">
                &copy; 2023 MT5 Web Pro - نظام التداول الآلي عبر BEP20
            </div>
        </footer>
        
        <!-- Wallet Section -->
        <section class="wallet-section" id="walletSection">
            <div class="wallet-header">
                <div class="wallet-title"><i class="fas fa-wallet"></i> محفظة BEP20</div>
                <button class="close-wallet" id="closeWalletBtn"><i class="fas fa-times"></i></button>
            </div>
            
            <div class="wallet-cards">
                <div class="wallet-card">
                    <div class="card-title"><i class="fas fa-coins"></i> الإيداع التلقائي</div>
                    
                    <div class="wallet-info">
                        <div class="info-row">
                            <span class="info-label">شبكة الإيداع:</span>
                            <span class="info-value">BEP20</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">الحد الأدنى:</span>
                            <span class="info-value">10 USDT</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">الرسوم:</span>
                            <span class="info-value">0%</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">مدة المعالجة:</span>
                            <span class="info-value">1-5 دقائق</span>
                        </div>
                    </div>
                    
                    <div class="wallet-address">
                        <div class="address-text">0x742d35Cc6634C0532925a3b844Bc454e4438f44e</div>
                        <button class="copy-btn" id="copyAddressBtn">نسخ</button>
                    </div>
                    
                    <div class="instructions">
                        <h3><i class="fas fa-info-circle"></i> تعليمات الإيداع:</h3>
                        <ol>
                            <li>ارسل الأموال إلى العنوان أعلاه عبر شبكة BEP20 فقط</li>
                            <li>تأكد من استخدام شبكة Binance Smart Chain (BSC)</li>
                            <li>لا ترسل عملات غير USDT أو BUSD</li>
                            <li>سوف يتم ايداع الأموال تلقائياً خلال 1-5 دقائق</li>
                        </ol>
                    </div>
                </div>
                
                <div class="wallet-card">
                    <div class="card-title"><i class="fas fa-external-link-alt"></i> السحب التلقائي</div>
                    
                    <div class="wallet-info">
                        <div class="info-row">
                            <span class="info-label">شبكة السحب:</span>
                            <span class="info-value">BEP20</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">الحد الأدنى:</span>
                            <span class="info-value">20 USDT</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">الرسوم:</span>
                            <span class="info-value">1 USDT</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">مدة المعالجة:</span>
                            <span class="info-value">1-3 دقائق</span>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="withdrawAmount">المبلغ (USDT)</label>
                        <input type="number" id="withdrawAmount" min="20" step="0.1" value="100">
                    </div>
                    
                    <div class="form-group">
                        <label for="walletAddress">عنوان المحفظة</label>
                        <input type="text" id="walletAddress" placeholder="أدخل عنوان محفظتك BEP20">
                    </div>
                    
                    <div class="form-actions">
                        <button class="cancel-btn">إلغاء</button>
                        <button class="submit-btn">طلب السحب</button>
                    </div>
                    
                    <div class="instructions">
                        <h3><i class="fas fa-info-circle"></i> ملاحظات هامة:</h3>
                        <ol>
                            <li>تأكد من صحة عنوان المحفظة قبل الإرسال</li>
                            <li>السحوبات تتم بشكل آلي ولا تحتاج لموافقة مدير</li>
                            <li>الحد الأقصى للسحب اليومي: 10,000 USDT</li>
                            <li>يجب أن يكون الحساب مفعّل عبر التحقق الثنائي</li>
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    </div>
    
    <script>
        // User menu functionality
        const userMenuBtn = document.getElementById('userMenuBtn');
        const dropdownMenu = document.getElementById('dropdownMenu');
        const walletSection = document.getElementById('walletSection');
        const closeWalletBtn = document.getElementById('closeWalletBtn');
        
        userMenuBtn.addEventListener('click', () => {
            dropdownMenu.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!userMenuBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.classList.remove('show');
            }
        });
        
        // Wallet functionality
        dropdownMenu.querySelectorAll('button')[1].addEventListener('click', () => {
            walletSection.classList.add('active');
            dropdownMenu.classList.remove('show');
        });
        
        closeWalletBtn.addEventListener('click', () => {
            walletSection.classList.remove('active');
        });
        
        // Order tabs functionality
        const tabs = document.querySelectorAll('.tab');
        const limitGroup = document.getElementById('limitGroup');
        const stopGroup = document.getElementById('stopGroup');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                const tabType = tab.getAttribute('data-tab');
                
                // Show/hide price fields based on tab
                if (tabType === 'market') {
                    limitGroup.style.display = 'none';
                    stopGroup.style.display = 'none';
                } else if (tabType === 'limit') {
                    limitGroup.style.display = 'flex';
                    stopGroup.style.display = 'none';
                } else if (tabType === 'stop') {
                    limitGroup.style.display = 'none';
                    stopGroup.style.display = 'flex';
                }
            });
        });
        
        // Size buttons functionality
        const sizeBtns = document.querySelectorAll('.size-btn');
        const volumeInput = document.getElementById('volume');
        
        sizeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                sizeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                volumeInput.value = btn.textContent;
            });
        });
        
        // Copy address functionality
        document.getElementById('copyAddressBtn').addEventListener('click', () => {
            const address = document.querySelector('.address-text').textContent;
            navigator.clipboard.writeText(address).then(() => {
                alert('تم نسخ عنوان المحفظة: ' + address);
            });
        });
        
        // TradingView chart simulation
        const chartContainer = document.getElementById('tv-chart');
        
        // Chart initialization
        const chart = LightweightCharts.createChart(chartContainer, {
            width: chartContainer.clientWidth,
            height: chartContainer.clientHeight,
            layout: {
                backgroundColor: '#0f1a2e',
                textColor: '#d9d9d9',
            },
            grid: {
                vertLines: {
                    color: 'rgba(42, 46, 57, 0.5)',
                },
                horzLines: {
                    color: 'rgba(42, 46, 57, 0.5)',
                },
            },
            timeScale: {
                timeVisible: true,
                secondsVisible: false,
            },
            crosshair: {
                mode: LightweightCharts.CrosshairMode.Normal,
            },
        });
        
        const candleSeries = chart.addCandlestickSeries({
            upColor: 'rgba(0, 150, 36, 0.8)',
            downColor: 'rgba(255, 23, 68, 0.8)',
            borderDownColor: 'rgba(255, 23, 68, 1)',
            borderUpColor: 'rgba(0, 150, 36, 1)',
            wickDownColor: 'rgba(255, 23, 68, 0.8)',
            wickUpColor: 'rgba(0, 150, 36, 0.8)',
        });
        
        // Generate sample data
        const now = Math.floor(Date.now() / 1000);
        const data = [];
        let value = 1.0850;
        
        for (let i = 0; i < 100; i++) {
            const time = now - (100 - i) * 300;
            const open = value;
            const close = open + (Math.random() - 0.5) * 0.005;
            const high = Math.max(open, close) + Math.random() * 0.002;
            const low = Math.min(open, close) - Math.random() * 0.002;
            
            data.push({
                time: time,
                open: open,
                high: high,
                low: low,
                close: close,
            });
            
            value = close;
        }
        
        candleSeries.setData(data);
        
        // Update chart on resize
        window.addEventListener('resize', () => {
            chart.applyOptions({
                width: chartContainer.clientWidth,
                height: chartContainer.clientHeight
            });
        });
        
        // Simulate real-time price updates
        setInterval(() => {
            const symbols = document.querySelectorAll('.symbol-item:not(.active)');
            symbols.forEach(symbol => {
                const change = Math.random() > 0.5 ? 1 : -1;
                const priceElement = symbol.querySelector('.symbol-price');
                let price = parseFloat(priceElement.textContent);
                const changeAmount = (Math.random() * 0.001).toFixed(4);
                
                price = (price + (change * changeAmount)).toFixed(4);
                priceElement.textContent = price;
                
                if (change > 0) {
                    priceElement.classList.remove('negative');
                    priceElement.classList.add('positive');
                } else {
                    priceElement.classList.remove('positive');
                    priceElement.classList.add('negative');
                }
            });
        }, 3000);
    </script>
</body>
</html>
