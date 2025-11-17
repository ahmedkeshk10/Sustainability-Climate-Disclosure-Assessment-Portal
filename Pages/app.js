// Data
const overallData = {
  esg: {
    addressed: 489,
    compliant: 373,
    rate: 76
  },
  tcfd: {
    addressed: 236,
    compliant: 167,
    rate: 70
  }
};

const nonListedData = {
  overall: {
    esg: {
      addressed: 250,
      compliant: 158,
      rate: 63
    },
    tcfd: {
      addressed: 96,
      compliant: 48,
      rate: 50
    }
  },
  esgSectors: [
    { name: 'قطاع سوق المال', addressed: 107, compliant: 42, rate: 39 },
    { name: 'قطاع التأمين', addressed: 37, compliant: 34, rate: 92 },
    { name: 'قطاع التمويل الاستهلاكي', addressed: 29, compliant: 20, rate: 69 },
    { name: 'قطاع التمويل العقاري', addressed: 15, compliant: 13, rate: 86 },
    { name: 'قطاع التأجير التمويلي', addressed: 33, compliant: 29, rate: 88 },
    { name: 'قطاع التخصيم', addressed: 7, compliant: 4, rate: 57 },
    { name: 'قطاع التمويل متناهي الصغر', addressed: 22, compliant: 16, rate: 72 }
  ],
  tcfdSectors: [
    { name: 'قطاع سوق المال', addressed: 33, compliant: 13, rate: 39 },
    { name: 'قطاع التأمين', addressed: 23, compliant: 12, rate: 52 },
    { name: 'قطاع التمويل الاستهلاكي', addressed: 6, compliant: 4, rate: 66 },
    { name: 'قطاع التمويل العقاري', addressed: 5, compliant: 3, rate: 60 },
    { name: 'قطاع التأجير التمويلي', addressed: 16, compliant: 11, rate: 68 },
    { name: 'قطاع التخصيم', addressed: 4, compliant: 2, rate: 50 },
    { name: 'قطاع التمويل متناهي الصغر', addressed: 9, compliant: 3, rate: 33 }
  ]
};

const listedData = {
  esg: {
    addressed: 239,
    compliant: 215,
    rate: 90
  },
  tcfd: {
    addressed: 140,
    compliant: 119,
    rate: 85
  }
};

const colors = {
  addressed: '#005D87',
  compliant: '#8DCA4D'
};

// Chart.js default configuration
Chart.defaults.font.family = 'Tahoma, Arial, Segoe UI, sans-serif';
Chart.defaults.font.size = 13;

// Initialize all charts
function initCharts() {
  createOverallChart();
  createNonListedOverallChart();
  createNonListedESGChart();
  createNonListedTCFDChart();
  createListedOverallChart();
}

// Overall Analysis Chart
function createOverallChart() {
  const ctx = document.getElementById('overallChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['ESG', 'TCFD'],
      datasets: [
        {
          label: 'الشركات المخاطبة',
          data: [overallData.esg.addressed, overallData.tcfd.addressed],
          backgroundColor: colors.addressed,
          borderRadius: 6
        },
        {
          label: 'الشركات الملتزمة',
          data: [overallData.esg.compliant, overallData.tcfd.compliant],
          backgroundColor: colors.compliant,
          borderRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          rtl: true,
          labels: {
            font: {
              size: 14,
              weight: '600'
            },
            padding: 15
          }
        },
        tooltip: {
          rtl: true,
          callbacks: {
            afterLabel: function(context) {
              const datasetIndex = context.datasetIndex;
              const dataIndex = context.dataIndex;
              if (datasetIndex === 1) {
                const rate = dataIndex === 0 ? overallData.esg.rate : overallData.tcfd.rate;
                return 'معدل الالتزام: ' + rate + '%';
              }
              return '';
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            font: {
              size: 14,
              weight: '600'
            }
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          },
          ticks: {
            font: {
              size: 13
            }
          }
        }
      },
      animation: {
        duration: 1000,
        easing: 'easeOutQuart'
      }
    }
  });
}

// Non-Listed Overall Chart
function createNonListedOverallChart() {
  const ctx = document.getElementById('nonListedOverallChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['ESG', 'TCFD'],
      datasets: [
        {
          label: 'الشركات المخاطبة',
          data: [nonListedData.overall.esg.addressed, nonListedData.overall.tcfd.addressed],
          backgroundColor: colors.addressed,
          borderRadius: 6
        },
        {
          label: 'الشركات الملتزمة',
          data: [nonListedData.overall.esg.compliant, nonListedData.overall.tcfd.compliant],
          backgroundColor: colors.compliant,
          borderRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          rtl: true,
          labels: {
            font: {
              size: 14,
              weight: '600'
            },
            padding: 15
          }
        },
        tooltip: {
          rtl: true,
          callbacks: {
            afterLabel: function(context) {
              const datasetIndex = context.datasetIndex;
              const dataIndex = context.dataIndex;
              if (datasetIndex === 1) {
                const rate = dataIndex === 0 ? nonListedData.overall.esg.rate : nonListedData.overall.tcfd.rate;
                return 'معدل الالتزام: ' + rate + '%';
              }
              return '';
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            font: {
              size: 14,
              weight: '600'
            }
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          },
          ticks: {
            font: {
              size: 13
            }
          }
        }
      },
      animation: {
        duration: 1000,
        easing: 'easeOutQuart'
      }
    }
  });
}

// Non-Listed ESG by Sector Chart
function createNonListedESGChart() {
  const ctx = document.getElementById('nonListedESGChart').getContext('2d');
  const labels = nonListedData.esgSectors.map(s => s.name);
  const addressedData = nonListedData.esgSectors.map(s => s.addressed);
  const compliantData = nonListedData.esgSectors.map(s => s.compliant);
  const rates = nonListedData.esgSectors.map(s => s.rate);
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'الشركات المخاطبة',
          data: addressedData,
          backgroundColor: colors.addressed,
          borderRadius: 6
        },
        {
          label: 'الشركات الملتزمة',
          data: compliantData,
          backgroundColor: colors.compliant,
          borderRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          rtl: true,
          labels: {
            font: {
              size: 14,
              weight: '600'
            },
            padding: 15
          }
        },
        tooltip: {
          rtl: true,
          callbacks: {
            afterLabel: function(context) {
              const datasetIndex = context.datasetIndex;
              const dataIndex = context.dataIndex;
              if (datasetIndex === 1) {
                return 'معدل الالتزام: ' + rates[dataIndex] + '%';
              }
              return '';
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            font: {
              size: 12
            },
            maxRotation: 45,
            minRotation: 45
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          },
          ticks: {
            font: {
              size: 13
            }
          }
        }
      },
      animation: {
        duration: 1000,
        easing: 'easeOutQuart'
      }
    }
  });
}

// Non-Listed TCFD by Sector Chart
function createNonListedTCFDChart() {
  const ctx = document.getElementById('nonListedTCFDChart').getContext('2d');
  const labels = nonListedData.tcfdSectors.map(s => s.name);
  const addressedData = nonListedData.tcfdSectors.map(s => s.addressed);
  const compliantData = nonListedData.tcfdSectors.map(s => s.compliant);
  const rates = nonListedData.tcfdSectors.map(s => s.rate);
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'الشركات المخاطبة',
          data: addressedData,
          backgroundColor: colors.addressed,
          borderRadius: 6
        },
        {
          label: 'الشركات الملتزمة',
          data: compliantData,
          backgroundColor: colors.compliant,
          borderRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          rtl: true,
          labels: {
            font: {
              size: 14,
              weight: '600'
            },
            padding: 15
          }
        },
        tooltip: {
          rtl: true,
          callbacks: {
            afterLabel: function(context) {
              const datasetIndex = context.datasetIndex;
              const dataIndex = context.dataIndex;
              if (datasetIndex === 1) {
                return 'معدل الالتزام: ' + rates[dataIndex] + '%';
              }
              return '';
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            font: {
              size: 12
            },
            maxRotation: 45,
            minRotation: 45
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          },
          ticks: {
            font: {
              size: 13
            }
          }
        }
      },
      animation: {
        duration: 1000,
        easing: 'easeOutQuart'
      }
    }
  });
}

// Listed Overall Chart
function createListedOverallChart() {
  const ctx = document.getElementById('listedOverallChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['ESG', 'TCFD'],
      datasets: [
        {
          label: 'الشركات المخاطبة',
          data: [listedData.esg.addressed, listedData.tcfd.addressed],
          backgroundColor: colors.addressed,
          borderRadius: 6
        },
        {
          label: 'الشركات الملتزمة',
          data: [listedData.esg.compliant, listedData.tcfd.compliant],
          backgroundColor: colors.compliant,
          borderRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          rtl: true,
          labels: {
            font: {
              size: 14,
              weight: '600'
            },
            padding: 15
          }
        },
        tooltip: {
          rtl: true,
          callbacks: {
            afterLabel: function(context) {
              const datasetIndex = context.datasetIndex;
              const dataIndex = context.dataIndex;
              if (datasetIndex === 1) {
                const rate = dataIndex === 0 ? listedData.esg.rate : listedData.tcfd.rate;
                return 'معدل الالتزام: ' + rate + '%';
              }
              return '';
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            font: {
              size: 14,
              weight: '600'
            }
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          },
          ticks: {
            font: {
              size: 13
            }
          }
        }
      },
      animation: {
        duration: 1000,
        easing: 'easeOutQuart'
      }
    }
  });
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', initCharts);