// Donut Chart - Win / Loss
  const winLossCtx = document.getElementById('winLossChart').getContext('2d');
  new Chart(winLossCtx, {
    type: 'doughnut',
    data: {
      labels: ['Won', 'Lost'],
      datasets: [{
        data: [14, 9],               // 14 won, 9 lost → 61% win
        backgroundColor: ['#198754', '#dc3545'],
        borderWidth: 1,
        borderColor: '#fff',
        hoverOffset: 12
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => `${context.label}: ${context.raw} (${Math.round((context.raw / 23) * 100)}%)`
          }
        }
      }
    }
  });

  // Line Chart - Monthly Revenue Trend (last 12 months)
  const revenueCtx = document.getElementById('revenueChart').getContext('2d');
  new Chart(revenueCtx, {
    type: 'line',
    data: {
      labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
      datasets: [{
        label: 'Revenue (NPR)',
        data: [620000, 850000, 980000, 1120000, 1450000, 1680000, 1840000, 2100000, 1950000, 2200000, 2450000, 3200000],
        borderColor: '#0d6efd',
        backgroundColor: 'rgba(13, 110, 253, 0.15)',
        fill: true,
        tension: 0.3,
        pointBackgroundColor: '#0d6efd',
        pointBorderColor: '#fff',
        pointHoverRadius: 8,
        pointRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: { callback: (value) => 'NPR ' + value.toLocaleString() }
        },
        x: { grid: { display: false } }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => `NPR ${context.parsed.y.toLocaleString()}`
          }
        }
      }
    }
  });