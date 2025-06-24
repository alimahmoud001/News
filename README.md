

====
<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>صفحة التداول</title>
    <style>
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    direction: rtl; /* Right-to-left for Arabic */
}

#sidebar {
    width: 250px;
    background-color: #333;
    color: white;
    padding-top: 20px;
    position: fixed;
    height: 100%;
    overflow-y: auto;
    transition: 0.3s;
    right: -250px; /* Hidden by default */
    z-index: 1000;
}

#sidebar.active {
    right: 0; /* Show when active */
}

#sidebar a {
    padding: 15px 20px;
    text-decoration: none;
    font-size: 18px;
    color: white;
    display: block;
    transition: 0.2s;
}

#sidebar a:hover {
    background-color: #575757;
}

#close-sidebar-btn {
    background-color: #575757;
    color: white;
    border: none;
    font-size: 30px;
    position: absolute;
    left: 10px;
    top: 10px;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 5px;
}

#main-content {
    margin-right: 0;
    padding: 20px;
    transition: margin-right 0.3s;
    width: 100%;
}

#main-content.shifted {
    margin-right: 250px;
}

#open-sidebar-btn {
    background-color: #333;
    color: white;
    border: none;
    font-size: 30px;
    cursor: pointer;
    padding: 10px 15px;
    border-radius: 5px;
    position: fixed;
    right: 10px;
    top: 10px;
    z-index: 999;
}

header {
    background-color: #f4f4f4;
    padding: 20px;
    text-align: center;
    border-bottom: 1px solid #ddd;
    margin-bottom: 20px;
}

section {
    background-color: #fff;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Responsive adjustments */
@media (max-width: 768px) {
    #sidebar {
        width: 200px;
        right: -200px;
    }

    #sidebar.active {
        right: 0;
    }

    #main-content.shifted {
        margin-right: 0;
    }
}


/* Enhanced Styling for Beautiful Design */

/* Import Google Fonts */
@import url(\'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap\');

/* Update body font */
body {
    font-family: \'Cairo\', Arial, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
}

/* Enhanced header */
header {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    color: white;
    padding: 30px 20px;
    text-align: center;
    border-radius: 0 0 20px 20px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    margin-bottom: 30px;
}

header h1 {
    margin: 0;
    font-size: 2.5em;
    font-weight: 700;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

/* Enhanced sections */
section {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    margin-bottom: 30px;
}

section:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.15);
}

section h2 {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    margin: 0 0 20px 0;
    padding: 20px;
    border-radius: 15px 15px 0 0;
    font-size: 1.8em;
    font-weight: 600;
}

/* Enhanced links */
.main-link, .secondary-link, .review-link, .app-link, .educational-link, .telegram-link, .signal-link {
    display: inline-block;
    padding: 12px 20px;
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    color: white;
    text-decoration: none;
    border-radius: 25px;
    margin: 5px;
    transition: all 0.3s ease;
    font-weight: 500;
    box-shadow: 0 4px 15px rgba(79, 172, 254, 0.3);
}

.main-link:hover, .secondary-link:hover, .review-link:hover, .app-link:hover, .educational-link:hover, .telegram-link:hover, .signal-link:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(79, 172, 254, 0.4);
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Features list styling */
.features-list {
    list-style: none;
    padding: 0;
}

.features-list li {
    background: rgba(79, 172, 254, 0.1);
    margin: 10px 0;
    padding: 15px;
    border-radius: 10px;
    border-right: 4px solid #4facfe;
    transition: all 0.3s ease;
}

.features-list li:hover {
    background: rgba(79, 172, 254, 0.2);
    transform: translateX(-5px);
}

/* Review items */
.review-item {
    background: rgba(255, 255, 255, 0.8);
    padding: 20px;
    margin: 15px 0;
    border-radius: 10px;
    border-left: 4px solid #4facfe;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

/* App items */
.app-item {
    background: rgba(255, 255, 255, 0.8);
    padding: 20px;
    margin: 15px 0;
    border-radius: 10px;
    border-left: 4px solid #667eea;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.note {
    background: rgba(255, 193, 7, 0.2);
    padding: 10px;
    border-radius: 8px;
    margin-top: 10px;
    font-style: italic;
    border-left: 3px solid #ffc107;
}

/* Video container */
.video-container {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    margin: 20px 0;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 8px 25px rgba(0,0,0,0.2);
}

.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
}

/* Telegram channels */
.telegram-channel {
    background: rgba(0, 136, 204, 0.1);
    padding: 20px;
    margin: 15px 0;
    border-radius: 10px;
    border-left: 4px solid #0088cc;
}

.signals-channels {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 15px;
}

/* Educational items */
.educational-item {
    background: rgba(40, 167, 69, 0.1);
    padding: 20px;
    margin: 15px 0;
    border-radius: 10px;
    border-left: 4px solid #28a745;
}

/* Investment placeholder */
.investment-placeholder {
    background: rgba(255, 193, 7, 0.1);
    padding: 30px;
    border-radius: 10px;
    text-align: center;
    border: 2px dashed #ffc107;
}

.placeholder-text {
    color: #856404;
    font-style: italic;
    font-size: 1.1em;
}

/* Deposit steps */
.deposit-steps {
    counter-reset: step-counter;
}

.step {
    background: rgba(255, 255, 255, 0.8);
    padding: 20px;
    margin: 15px 0;
    border-radius: 10px;
    border-left: 4px solid #17a2b8;
    position: relative;
    counter-increment: step-counter;
}

.step::before {
    content: counter(step-counter);
    position: absolute;
    left: -15px;
    top: 15px;
    background: #17a2b8;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}

.step ul {
    margin-top: 10px;
    padding-right: 20px;
}

.step li {
    margin: 5px 0;
    padding: 5px 0;
}

/* Calculator styling */
.calculator-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    margin-bottom: 30px;
}

.input-section, .output-section {
    background: rgba(255, 255, 255, 0.9);
    padding: 25px;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.input-group {
    margin-bottom: 20px;
}

.input-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #333;
}

.input-group input {
    width: 100%;
    padding: 12px;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.3s ease;
}

.input-group input:focus {
    outline: none;
    border-color: #4facfe;
    box-shadow: 0 0 0 3px rgba(79, 172, 254, 0.1);
}

#calculate-btn {
    width: 100%;
    padding: 15px;
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
}

#calculate-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(40, 167, 69, 0.4);
}

.result-item {
    display: flex;
    justify-content: space-between;
    padding: 15px;
    margin: 10px 0;
    background: rgba(79, 172, 254, 0.1);
    border-radius: 8px;
    border-right: 3px solid #4facfe;
}

/* Table styling */
.table-container {
    background: rgba(255, 255, 255, 0.9);
    padding: 25px;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    margin-bottom: 30px;
    overflow-x: auto;
}

#capital-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
}

#capital-table th {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 15px;
    text-align: center;
    font-weight: 600;
}

#capital-table td {
    padding: 12px 15px;
    text-align: center;
    border-bottom: 1px solid #e9ecef;
}

#capital-table tbody tr:hover {
    background: rgba(79, 172, 254, 0.1);
}

/* Chart container */
.chart-container {
    background: rgba(255, 255, 255, 0.9);
    padding: 25px;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    text-align: center;
}

#capital-chart {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

/* Enhanced responsive design */
@media (max-width: 768px) {
    header h1 {
        font-size: 2em;
    }
    
    .calculator-container {
        grid-template-columns: 1fr;
        gap: 20px;
    }
    
    .signals-channels {
        flex-direction: column;
    }
    
    .signal-link {
        display: block;
        text-align: center;
        margin: 5px 0;
    }
    
    section {
        margin: 10px;
        padding: 15px;
    }
    
    #main-content {
        padding: 10px;
    }
}

@media (max-width: 480px) {
    header {
        padding: 20px 15px;
    }
    
    header h1 {
        font-size: 1.8em;
    }
    
    section h2 {
        font-size: 1.5em;
        padding: 15px;
    }
    
    .input-group input {
        font-size: 14px;
    }
    
    #calculate-btn {
        font-size: 16px;
        padding: 12px;
    }
}

/* Animation for page load */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

section {
    animation: fadeInUp 0.6s ease forwards;
}

section:nth-child(even) {
    animation-delay: 0.1s;
}

section:nth-child(odd) {
    animation-delay: 0.2s;
}

</style>
</head>
<body>
    <div id="sidebar">
        <button id="close-sidebar-btn">&times;</button>
        <a href="#section1">القسم الأول</a>
        <a href="#section2">القسم الثاني</a>
        <a href="#section3">القسم الثالث</a>
        <a href="#section4">القسم الرابع</a>
        <a href="#section5">القسم الخامس</a>
        <a href="#section6">القسم السادس</a>
        <a href="#section7">القسم السابع</a>
        <a href="#section8">القسم الثامن</a>
        <a href="#section9">حاسبة تطور رأس المال</a>
    </div>

    <div id="main-content">
        <button id="open-sidebar-btn">&#9776;</button>
        <header>
            <h1>صفحة التداول والمعلومات</h1>
        </header>

        <section id="section1">
            <h2>القسم الأول: شركة الوساطة المالية</h2>
            <div class="section-content">
                <h3>⬅️ رابط شركة الوساطة المالية:</h3>
                <a href="https://my.rannforex.com/en/auth/register/?fprc=cf22v1" target="_blank" class="main-link">https://my.rannforex.com/en/auth/register/?fprc=cf22v1</a>
                
                <h3>ميزاتها:</h3>
                <ul class="features-list">
                    <li>★ اقل ايداع 10$ خلال 30 ثانية</li>
                    <li>★ أقل سحب 10$ خلال 30 ثانية</li>
                    <li>★ عمولة قليلة جدا</li>
                    <li>★ اسبريد 0.3~1.2</li>
                    <li>★ رافعة مالية 1:500</li>
                    <li>★ تداول أمن على جميع ازواج الفوريكس والمعادن والنفط والمؤشرات والعملات المشفرة</li>
                    <li>★ اربع انواع من الحسابات ميتا تريدر 5 حقيقي وبدون عمولة وكريبتو وحساب ib ويدعم الحسابات المدارة pamm</li>
                    <li>★ انزلاق منخفض</li>
                    <li>★ تنفيذ فوري للصفقات</li>
                    <li>★ تقييم ممتاز على موقع trust pilot & myfxbook & wikifx & Forex peace army</li>
                    <li>★ الأمان عالي جدا بسبب 2FA</li>
                    <li>★ توثيق من سورية اي دولة أخرى</li>
                    <li>★ نموذج a book من افضل مزودي السيولة</li>
                </ul>
                
                <h3>⬅️ راني فوريكس اسبريد للاطلاع على الاسبريد المتوسط اليومي:</h3>
                <a href="https://rannforex.com/en/trading/quotesonline/" target="_blank" class="secondary-link">https://rannforex.com/en/trading/quotesonline/</a>
            </div>
        </section>

        <section id="section2">
            <h2>القسم الثاني: تقييمات الشركة</h2>
            <div class="section-content">
                <h3>⬅️ تقييمات الشركة:</h3>
                <div class="reviews-list">
                    <div class="review-item">
                        <h4>1 - Trust Pilot</h4>
                        <a href="https://fr.trustpilot.com/review/rannforex.com" target="_blank" class="review-link">https://fr.trustpilot.com/review/rannforex.com</a>
                    </div>
                    
                    <div class="review-item">
                        <h4>2 - WikiFX</h4>
                        <a href="https://www.wikifx.com/en/dealer/1141850612.html" target="_blank" class="review-link">https://www.wikifx.com/en/dealer/1141850612.html</a>
                    </div>
                    
                    <div class="review-item">
                        <h4>3 - MyFXBook</h4>
                        <a href="https://www.myfxbook.com/reviews/brokers/rannforex/1933426,1" target="_blank" class="review-link">https://www.myfxbook.com/reviews/brokers/rannforex/1933426,1</a>
                    </div>
                    
                    <div class="review-item">
                        <h4>4 - Forex Peace Army</h4>
                        <a href="https://www.forexpeacearmy.com/forex-reviews/15906/rannforex-review" target="_blank" class="review-link">https://www.forexpeacearmy.com/forex-reviews/15906/rannforex-review</a>
                    </div>
                </div>
        </section>

        <section id="section3">
            <h2>القسم الثالث: تطبيقات يجب تحميلها للبدء بالتداول</h2>
            <div class="section-content">
                <div class="app-item">
                    <h3>⬅️ منصة ميتا تريدر 5</h3>
                    <a href="https://play.google.com/store/apps/details?id=net.metaquotes.metatrader5" target="_blank" class="app-link">https://play.google.com/store/apps/details?id=net.metaquotes.metatrader5</a>
                    <p class="note">ملاحظة: هي المنصة الموثوقة الافضل في مجال التداول في جميع الاسواق</p>
                </div>
                
                <div class="app-item">
                    <h3>⬅️ المحفظة الالكترونية</h3>
                    <a href="https://cwallet.com/referral/DvY6dZtS" target="_blank" class="app-link">https://cwallet.com/referral/DvY6dZtS</a>
                </div>
                
                <div class="app-item">
                    <h3>⬅️ تطبيق المصادقة الثنائية</h3>
                    <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2" target="_blank" class="app-link">https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2</a>
                </div>
                
                <div class="app-item">
                    <h3>⬅️ تطبيق تريدنغ فيو</h3>
                    <a href="https://play.google.com/store/apps/details?id=com.tradingview.tradingviewapp" target="_blank" class="app-link">https://play.google.com/store
(Content truncated due to size limit. Use line ranges to read in chunks)
====
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('sidebar');
    const openSidebarBtn = document.getElementById('open-sidebar-btn');
    const closeSidebarBtn = document.getElementById('close-sidebar-btn');
    const mainContent = document.getElementById('main-content');

    openSidebarBtn.addEventListener('click', function() {
        sidebar.classList.add('active');
        mainContent.classList.add('shifted');
    });

    closeSidebarBtn.addEventListener('click', function() {
        sidebar.classList.remove('active');
        mainContent.classList.remove('shifted');
    });

    // Smooth scrolling for sidebar links
    document.querySelectorAll('#sidebar a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            sidebar.classList.remove('active'); // Close sidebar after clicking a link
            mainContent.classList.remove('shifted');
        });
    });
});



// Capital Growth Calculator Functions
function calculateCapitalGrowth() {
    const initialCapital = parseFloat(document.getElementById('initial-capital').value) || 1000;
    const winRate = parseFloat(document.getElementById('win-rate').value) || 60;
    const profitRate = parseFloat(document.getElementById('profit-rate').value) || 2;
    const lossRate = parseFloat(document.getElementById('loss-rate').value) || 1;
    const tradesPerUpdate = parseInt(document.getElementById('trades-per-update').value) || 10;
    const targetCapital = parseFloat(document.getElementById('target-capital').value) || 10000;

    // Calculate average return per trade
    const winRateDecimal = winRate / 100;
    const lossRateDecimal = (100 - winRate) / 100;
    const avgReturn = (winRateDecimal * profitRate) - (lossRateDecimal * lossRate);

    // Display results
    document.getElementById('avg-return').textContent = avgReturn.toFixed(2) + '%';

    // Calculate required trades and growth rate
    let currentCapital = initialCapital;
    let totalTrades = 0;
    let updates = 0;
    const tableData = [];
    const chartData = [];

    // Add initial data point
    tableData.push({
        update: 0,
        trades: 0,
        capital: currentCapital,
        growth: 0
    });
    chartData.push({ x: 0, y: currentCapital });

    while (currentCapital < targetCapital && updates < 1000) { // Safety limit
        updates++;
        totalTrades += tradesPerUpdate;
        
        // Calculate capital after this update
        for (let i = 0; i < tradesPerUpdate; i++) {
            const growthFactor = 1 + (avgReturn / 100);
            currentCapital *= growthFactor;
        }

        const growthPercentage = ((currentCapital - initialCapital) / initialCapital) * 100;

        tableData.push({
            update: updates,
            trades: totalTrades,
            capital: currentCapital,
            growth: growthPercentage
        });
        chartData.push({ x: totalTrades, y: currentCapital });
    }

    document.getElementById('required-trades').textContent = totalTrades;
    const finalGrowthRate = ((currentCapital - initialCapital) / initialCapital) * 100;
    document.getElementById('growth-rate').textContent = finalGrowthRate.toFixed(2) + '%';

    // Update table
    updateTable(tableData);
    
    // Update chart
    updateChart(chartData);
}

function updateTable(data) {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.update}</td>
            <td>${row.trades}</td>
            <td>$${row.capital.toFixed(2)}</td>
            <td>${row.growth.toFixed(2)}%</td>
        `;
        tableBody.appendChild(tr);
    });
}

function updateChart(data) {
    const canvas = document.getElementById('capital-chart');
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (data.length === 0) return;

    // Set up chart dimensions
    const padding = 40;
    const chartWidth = canvas.width - 2 * padding;
    const chartHeight = canvas.height - 2 * padding;

    // Find min and max values
    const maxX = Math.max(...data.map(d => d.x));
    const minY = Math.min(...data.map(d => d.y));
    const maxY = Math.max(...data.map(d => d.y));

    // Draw axes
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();

    // Draw data line
    ctx.strokeStyle = '#007bff';
    ctx.lineWidth = 3;
    ctx.beginPath();

    data.forEach((point, index) => {
        const x = padding + (point.x / maxX) * chartWidth;
        const y = canvas.height - padding - ((point.y - minY) / (maxY - minY)) * chartHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();

    // Draw data points
    ctx.fillStyle = '#007bff';
    data.forEach(point => {
        const x = padding + (point.x / maxX) * chartWidth;
        const y = canvas.height - padding - ((point.y - minY) / (maxY - minY)) * chartHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
    });

    // Add labels
    ctx.fillStyle = '#333';
    ctx.font = '12px Arial';
    ctx.fillText('عدد الصفقات', canvas.width - 80, canvas.height - 10);
    ctx.save();
    ctx.translate(15, canvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('رأس المال ($)', 0, 0);
    ctx.restore();
}

// Add event listener for calculate button
document.addEventListener('DOMContentLoaded', function() {
    // Previous code remains the same...
    
    // Add calculator functionality
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateCapitalGrowth);
    }
});


