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

