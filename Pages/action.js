// Global state
let currentLang = 'ar';
let charts = {};

// Data
const esgData = {
    totalCompanies: 373,
    nonListedTotal: 158,
    nonListedRatings: {
        excellent: 8,
        veryGood: 7,
        good: 49,
        acceptable: 55,
        needsImprovement: 39
    },
    nonListedSectors: [
        { nameAr: 'قطاع سوق المال', nameEn: 'Capital Market', icon: '📈', ratings: [4, 3, 5, 16, 14] },
        { nameAr: 'قطاع التأمين', nameEn: 'Insurance', icon: '🛡️', ratings: [0, 1, 13, 16, 4] },
        { nameAr: 'قطاع التمويل العقاري', nameEn: 'Mortgage Finance', icon: '🏠', ratings: [2, 0, 4, 2, 5] },
        { nameAr: 'قطاع التمويل الاستهلاكي', nameEn: 'Consumer Finance', icon: '💳', ratings: [1, 1, 8, 6, 4] },
        { nameAr: 'قطاع التخصيم', nameEn: 'Factoring', icon: '📋', ratings: [0, 0, 2, 2, 0] },
        { nameAr: 'قطاع التأجير التمويلي', nameEn: 'Leasing', icon: '🚗', ratings: [1, 1, 11, 8, 8] },
        { nameAr: 'قطاع التمويل متناهي الصغر', nameEn: 'Microfinance', icon: '🤝', ratings: [0, 1, 6, 5, 4] }
    ],
    listedTotal: 215,
    listedRatings: {
        excellent: 4,
        veryGood: 13,
        good: 46,
        acceptable: 104,
        needsImprovement: 48
    },
    listedNonBanking: [2, 0, 6, 14, 8],
    listedOtherSectors: [2, 13, 40, 90, 40]
};

const tcfdData = {
    totalCompanies: 167,
    nonListedTotal: 48,
    nonListedRatings: {
        excellent: 0,
        veryGood: 1,
        good: 11,
        acceptable: 16,
        needsImprovement: 20
    },
    allSectors: [
        { nameAr: 'قطاع سوق المال', nameEn: 'Capital Market', icon: '📈', ratings: [0, 0, 4, 3, 6] },
        { nameAr: 'قطاع التأمين', nameEn: 'Insurance', icon: '🛡️', ratings: [0, 0, 3, 6, 3] },
        { nameAr: 'قطاع التمويل العقاري', nameEn: 'Mortgage Finance', icon: '🏠', ratings: [0, 1, 1, 0, 1] },
        { nameAr: 'قطاع التمويل الاستهلاكي', nameEn: 'Consumer Finance', icon: '💳', ratings: [0, 0, 2, 1, 1] },
        { nameAr: 'قطاع التخصيم', nameEn: 'Factoring', icon: '📋', ratings: [0, 0, 0, 0, 2] },
        { nameAr: 'قطاع التأجير التمويلي', nameEn: 'Leasing', icon: '🚗', ratings: [0, 0, 1, 5, 5] },
        { nameAr: 'قطاع التمويل متناهي الصغر', nameEn: 'Microfinance', icon: '🤝', ratings: [0, 0, 0, 1, 2] }
    ],
    listedTotal: 119,
    listedRatings: {
        excellent: 5,
        veryGood: 7,
        good: 15,
        acceptable: 49,
        needsImprovement: 43
    },
    listedNonBanking: [1, 0, 1, 6, 8],
    listedOtherSectors: [4, 7, 14, 43, 35]
};

const ratingLabels = {
    ar: ['ممتاز', 'جيد جدًا', 'جيد', 'مقبول', 'يحتاج إلى تحسين'],
    en: ['Excellent', 'Very Good', 'Good', 'Fair', 'Needs Improvement']
};

const colors = {
    excellent: '#002060',
    veryGood: '#8DCA4D',
    good: '#005D87',
    acceptable: '#BD8D00',
    needsImprovement: '#7C0000'
};

const ratingColors = [colors.excellent, colors.veryGood, colors.good, colors.acceptable, colors.needsImprovement];

const translations = {
    ar: {
        mainTitle: 'تحليل تقييمات الإفصاحات - ESG & TCFD',
        tabEsg: 'تحليل ESG',
        tabTcfd: 'تحليل TCFD',
        tabComparison: 'مقارنة',
        totalCompanies: 'إجمالي الشركات',
        excellent: 'ممتاز',
        veryGood: 'جيد جدًا',
        good: 'جيد',
        acceptable: 'مقبول',
        needsImprovement: 'يحتاج إلى تحسين',
        detailedTables: 'الجداول التفصيلية',
        esgNonListedTableTitle: 'الشركات المالية غير المصرفية غير مقيدة بالبورصة',
        esgListedTableTitle: 'الشركات المقيدة بالبورصة',
        tcfdNonListedTableTitle: 'الشركات المالية غير المصرفية غير مقيدة بالبورصة',
        tcfdListedTableTitle: 'الشركات المقيدة بالبورصة',
        esgNonListedTitle: 'الشركات المالية غير المصرفية غير مقيدة بالبورصة',
        esgListedTitle: 'الشركات المقيدة بالبورصة',
        tcfdNonListedTitle: 'الشركات المالية غير المصرفية غير مقيدة بالبورصة',
        tcfdListedTitle: 'الشركات المقيدة بالبورصة',
        esgNonListedPieTitle: 'التوزيع العام للتقييمات',
        esgListedPieTitle: 'التوزيع العام للتقييمات',
        esgSectorsBarTitle: 'التوزيع حسب القطاع المالي',
        esgListedNonBankTitle: 'الشركات المالية غير المصرفية',
        esgListedOtherTitle: 'القطاعات الأخرى',
        tcfdNonListedPieTitle: 'التوزيع العام للتقييمات',
        tcfdAllSectorsTitle: 'التوزيع حسب القطاع المالي',
        tcfdListedPieTitle: 'التوزيع العام للتقييمات',
        tcfdListedNonBankTitle: 'الشركات المالية غير المصرفية',
        tcfdListedOtherTitle: 'القطاعات الأخرى',
        comparisonTotalTitle: 'مقارنة إجمالي الشركات',
        comparisonNonListedTitle: 'مقارنة الشركات غير المقيدة بالبورصة',
        comparisonListedTitle: 'مقارنة الشركات المقيدة بالبورصة'
    }
};

const ratingIcons = {
    excellent: '⭐⭐⭐⭐',
    veryGood: '⭐⭐⭐',
    good: '⭐⭐',
    acceptable: '⭐',
    needsImprovement: '⚠️',
    total: '📊'
};

// Initialize
function init() {
    createESGSummary();
    createTCFDSummary();
    createComparisonSummary();
    createESGCharts();
    createTCFDCharts();
    createComparisonCharts();
    createESGTables();
    createTCFDTables();
}

// Tab switching
function switchTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));
    
    if (tabName === 'esg') {
        document.getElementById('esgTab').classList.add('active');
        document.getElementById('tabEsg').classList.add('active');
    } else if (tabName === 'tcfd') {
        document.getElementById('tcfdTab').classList.add('active');
        document.getElementById('tabTcfd').classList.add('active');
    } else if (tabName === 'comparison') {
        document.getElementById('comparisonTab').classList.add('active');
        document.getElementById('tabComparison').classList.add('active');
    }
}

// Summary cards
function createESGSummary() {
    const container = document.getElementById('esgSummary');
    const t = translations[currentLang];
    
    const summaryData = [
        { label: t.totalCompanies, value: esgData.totalCompanies, icon: ratingIcons.total, color: '#1976D2' },
        { label: t.excellent, value: 12, icon: ratingIcons.excellent, color: colors.excellent },
        { label: t.veryGood, value: 20, icon: ratingIcons.veryGood, color: colors.veryGood },
        { label: t.good, value: 95, icon: ratingIcons.good, color: colors.good },
        { label: t.acceptable, value: 159, icon: ratingIcons.acceptable, color: colors.acceptable },
        { label: t.needsImprovement, value: 87, icon: ratingIcons.needsImprovement, color: colors.needsImprovement }
    ];
    
    container.innerHTML = summaryData.map(item => `
        <div class="summary-card">
            <div class="icon">${item.icon}</div>
            <div class="value" style="color: ${item.color}">${item.value}</div>
            <div class="label">${item.label}</div>
        </div>
    `).join('');
}

function createTCFDSummary() {
    const container = document.getElementById('tcfdSummary');
    const t = translations[currentLang];
    
    const summaryData = [
        { label: t.totalCompanies, value: tcfdData.totalCompanies, icon: ratingIcons.total, color: '#1976D2' },
        { label: t.excellent, value: 5, icon: ratingIcons.excellent, color: colors.excellent },
        { label: t.veryGood, value: 8, icon: ratingIcons.veryGood, color: colors.veryGood },
        { label: t.good, value: 26, icon: ratingIcons.good, color: colors.good },
        { label: t.acceptable, value: 65, icon: ratingIcons.acceptable, color: colors.acceptable },
        { label: t.needsImprovement, value: 63, icon: ratingIcons.needsImprovement, color: colors.needsImprovement }
    ];
    
    container.innerHTML = summaryData.map(item => `
        <div class="summary-card">
            <div class="icon">${item.icon}</div>
            <div class="value" style="color: ${item.color}">${item.value}</div>
            <div class="label">${item.label}</div>
        </div>
    `).join('');
}

// Comparison Summary
function createComparisonSummary() {
    const esgContainer = document.getElementById('esgColumn');
    const tcfdContainer = document.getElementById('tcfdColumn');
    const t = translations[currentLang];
    
    const esgData = [
        { label: t.excellent, value: 12, icon: '⭐⭐⭐⭐', color: colors.excellent },
        { label: t.veryGood, value: 20, icon: '⭐⭐⭐', color: colors.veryGood },
        { label: t.good, value: 95, icon: '⭐⭐', color: colors.good },
        { label: t.acceptable, value: 159, icon: '⭐', color: colors.acceptable },
        { label: t.needsImprovement, value: 87, icon: '⚠️', color: colors.needsImprovement }
    ];
    
    const tcfdData = [
        { label: t.excellent, value: 5, icon: '⭐⭐⭐⭐', color: colors.excellent },
        { label: t.veryGood, value: 8, icon: '⭐⭐⭐', color: colors.veryGood },
        { label: t.good, value: 26, icon: '⭐⭐', color: colors.good },
        { label: t.acceptable, value: 65, icon: '⭐', color: colors.acceptable },
        { label: t.needsImprovement, value: 63, icon: '⚠️', color: colors.needsImprovement }
    ];
    
    esgContainer.innerHTML = esgData.map(item => `
        <div class="comparison-card">
            <div class="icon">${item.icon}</div>
            <div class="value" style="color: ${item.color}">${item.value}</div>
            <div class="label">ESG - ${item.label}</div>
        </div>
    `).join('');
    
    tcfdContainer.innerHTML = tcfdData.map(item => `
        <div class="comparison-card">
            <div class="icon">${item.icon}</div>
            <div class="value" style="color: ${item.color}">${item.value}</div>
            <div class="label">TCFD - ${item.label}</div>
        </div>
    `).join('');
}

// ESG Charts
function createESGCharts() {
    // Non-listed pie chart
    charts.esgNonListedPie = new Chart(document.getElementById('esgNonListedPie'), {
        type: 'pie',
        data: {
            labels: ratingLabels[currentLang],
            datasets: [{
                data: [
                    esgData.nonListedRatings.excellent,
                    esgData.nonListedRatings.veryGood,
                    esgData.nonListedRatings.good,
                    esgData.nonListedRatings.acceptable,
                    esgData.nonListedRatings.needsImprovement
                ],
                backgroundColor: ratingColors
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    rtl: currentLang === 'ar',
                    labels: {
                        font: {
                            size: 16
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true
            }
        }
    });
    
    // Sectors bar chart - ensure column order: Excellent, Very Good, Good, Fair, Needs Improvement
    const sectorLabels = esgData.nonListedSectors.map(s => currentLang === 'ar' ? s.nameAr : s.nameEn);
    const datasets = [
        {
            label: ratingLabels[currentLang][0], // Excellent
            data: esgData.nonListedSectors.map(s => s.ratings[0]),
            backgroundColor: ratingColors[0]
        },
        {
            label: ratingLabels[currentLang][1], // Very Good
            data: esgData.nonListedSectors.map(s => s.ratings[1]),
            backgroundColor: ratingColors[1]
        },
        {
            label: ratingLabels[currentLang][2], // Good
            data: esgData.nonListedSectors.map(s => s.ratings[2]),
            backgroundColor: ratingColors[2]
        },
        {
            label: ratingLabels[currentLang][3], // Fair
            data: esgData.nonListedSectors.map(s => s.ratings[3]),
            backgroundColor: ratingColors[3]
        },
        {
            label: ratingLabels[currentLang][4], // Needs Improvement
            data: esgData.nonListedSectors.map(s => s.ratings[4]),
            backgroundColor: ratingColors[4]
        }
    ];
    
    charts.esgSectorsBar = new Chart(document.getElementById('esgSectorsBar'), {
        type: 'bar',
        data: {
            labels: sectorLabels,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    rtl: currentLang === 'ar'
                }
            },
            scales: {
                x: {
                    stacked: false,
                    reverse: currentLang === 'ar'
                },
                y: {
                    stacked: false,
                    beginAtZero: true
                }
            }
        }
    });
    
    // Listed pie chart
    charts.esgListedPie = new Chart(document.getElementById('esgListedPie'), {
        type: 'pie',
        data: {
            labels: ratingLabels[currentLang],
            datasets: [{
                data: [
                    esgData.listedRatings.excellent,
                    esgData.listedRatings.veryGood,
                    esgData.listedRatings.good,
                    esgData.listedRatings.acceptable,
                    esgData.listedRatings.needsImprovement
                ],
                backgroundColor: ratingColors
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    rtl: currentLang === 'ar',
                    labels: {
                        font: {
                            size: 16
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true
            }
        }
    });
    
    // Listed non-banking bar chart
    charts.esgListedNonBank = new Chart(document.getElementById('esgListedNonBank'), {
        type: 'bar',
        data: {
            labels: ratingLabels[currentLang],
            datasets: [{
                label: currentLang === 'ar' ? 'عدد الشركات' : 'Number of Companies',
                data: esgData.listedNonBanking,
                backgroundColor: ratingColors
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    reverse: currentLang === 'ar'
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Listed other sectors bar chart
    charts.esgListedOther = new Chart(document.getElementById('esgListedOther'), {
        type: 'bar',
        data: {
            labels: ratingLabels[currentLang],
            datasets: [{
                label: currentLang === 'ar' ? 'عدد الشركات' : 'Number of Companies',
                data: esgData.listedOtherSectors,
                backgroundColor: ratingColors
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    reverse: currentLang === 'ar'
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// ESG Tables
function createESGTables() {
    const t = translations[currentLang];
    
    // Non-listed table
    const nonListedTable = document.getElementById('esgNonListedTable');
    let nonListedHTML = `
        <thead>
            <tr>
                <th>${currentLang === 'ar' ? 'القطاع' : 'Sector'}</th>
                <th>${t.excellent}</th>
                <th>${t.veryGood}</th>
                <th>${t.good}</th>
                <th>${t.acceptable}</th>
                <th>${t.needsImprovement}</th>
                <th>${currentLang === 'ar' ? 'الإجمالي' : 'Total'}</th>
            </tr>
        </thead>
        <tbody>
    `;
    
    esgData.nonListedSectors.forEach(sector => {
        const total = sector.ratings.reduce((a, b) => a + b, 0);
        const name = currentLang === 'ar' ? `${sector.icon} ${sector.nameAr}` : `${sector.icon} ${sector.nameEn}`;
        nonListedHTML += `
            <tr>
                <td>${name}</td>
                <td>${sector.ratings[0]}</td>
                <td>${sector.ratings[1]}</td>
                <td>${sector.ratings[2]}</td>
                <td>${sector.ratings[3]}</td>
                <td>${sector.ratings[4]}</td>
                <td><strong>${total}</strong></td>
            </tr>
        `;
    });
    
    nonListedHTML += '</tbody>';
    nonListedTable.innerHTML = nonListedHTML;
    
    // Listed table
    const listedTable = document.getElementById('esgListedTable');
    const listedHTML = `
        <thead>
            <tr>
                <th>${currentLang === 'ar' ? 'القطاع' : 'Sector'}</th>
                <th>${t.excellent}</th>
                <th>${t.veryGood}</th>
                <th>${t.good}</th>
                <th>${t.acceptable}</th>
                <th>${t.needsImprovement}</th>
                <th>${currentLang === 'ar' ? 'الإجمالي' : 'Total'}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>${currentLang === 'ar' ? 'الشركات المالية غير المصرفية' : 'Non-Banking Financial Companies'}</td>
                <td>${esgData.listedNonBanking[0]}</td>
                <td>${esgData.listedNonBanking[1]}</td>
                <td>${esgData.listedNonBanking[2]}</td>
                <td>${esgData.listedNonBanking[3]}</td>
                <td>${esgData.listedNonBanking[4]}</td>
                <td><strong>${esgData.listedNonBanking.reduce((a, b) => a + b, 0)}</strong></td>
            </tr>
            <tr>
                <td>${currentLang === 'ar' ? 'القطاعات الأخرى' : 'Other Sectors'}</td>
                <td>${esgData.listedOtherSectors[0]}</td>
                <td>${esgData.listedOtherSectors[1]}</td>
                <td>${esgData.listedOtherSectors[2]}</td>
                <td>${esgData.listedOtherSectors[3]}</td>
                <td>${esgData.listedOtherSectors[4]}</td>
                <td><strong>${esgData.listedOtherSectors.reduce((a, b) => a + b, 0)}</strong></td>
            </tr>
        </tbody>
    `;
    listedTable.innerHTML = listedHTML;
}

// TCFD Tables
function createTCFDTables() {
    const t = translations[currentLang];
    
    // Non-listed table
    const nonListedTable = document.getElementById('tcfdNonListedTable');
    let nonListedHTML = `
        <thead>
            <tr>
                <th>${currentLang === 'ar' ? 'القطاع' : 'Sector'}</th>
                <th>${t.excellent}</th>
                <th>${t.veryGood}</th>
                <th>${t.good}</th>
                <th>${t.acceptable}</th>
                <th>${t.needsImprovement}</th>
                <th>${currentLang === 'ar' ? 'الإجمالي' : 'Total'}</th>
            </tr>
        </thead>
        <tbody>
    `;
    
    tcfdData.allSectors.forEach(sector => {
        const total = sector.ratings.reduce((a, b) => a + b, 0);
        const name = currentLang === 'ar' ? `${sector.icon} ${sector.nameAr}` : `${sector.icon} ${sector.nameEn}`;
        nonListedHTML += `
            <tr>
                <td>${name}</td>
                <td>${sector.ratings[0]}</td>
                <td>${sector.ratings[1]}</td>
                <td>${sector.ratings[2]}</td>
                <td>${sector.ratings[3]}</td>
                <td>${sector.ratings[4]}</td>
                <td><strong>${total}</strong></td>
            </tr>
        `;
    });
    
    nonListedHTML += '</tbody>';
    nonListedTable.innerHTML = nonListedHTML;
    
    // Listed table
    const listedTable = document.getElementById('tcfdListedTable');
    const listedHTML = `
        <thead>
            <tr>
                <th>${currentLang === 'ar' ? 'القطاع' : 'Sector'}</th>
                <th>${t.excellent}</th>
                <th>${t.veryGood}</th>
                <th>${t.good}</th>
                <th>${t.acceptable}</th>
                <th>${t.needsImprovement}</th>
                <th>${currentLang === 'ar' ? 'الإجمالي' : 'Total'}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>${currentLang === 'ar' ? 'الشركات المالية غير المصرفية' : 'Non-Banking Financial Companies'}</td>
                <td>${tcfdData.listedNonBanking[0]}</td>
                <td>${tcfdData.listedNonBanking[1]}</td>
                <td>${tcfdData.listedNonBanking[2]}</td>
                <td>${tcfdData.listedNonBanking[3]}</td>
                <td>${tcfdData.listedNonBanking[4]}</td>
                <td><strong>${tcfdData.listedNonBanking.reduce((a, b) => a + b, 0)}</strong></td>
            </tr>
            <tr>
                <td>${currentLang === 'ar' ? 'القطاعات الأخرى' : 'Other Sectors'}</td>
                <td>${tcfdData.listedOtherSectors[0]}</td>
                <td>${tcfdData.listedOtherSectors[1]}</td>
                <td>${tcfdData.listedOtherSectors[2]}</td>
                <td>${tcfdData.listedOtherSectors[3]}</td>
                <td>${tcfdData.listedOtherSectors[4]}</td>
                <td><strong>${tcfdData.listedOtherSectors.reduce((a, b) => a + b, 0)}</strong></td>
            </tr>
        </tbody>
    `;
    listedTable.innerHTML = listedHTML;
}

// TCFD Charts
function createTCFDCharts() {
    // Non-listed pie chart
    charts.tcfdNonListedPie = new Chart(document.getElementById('tcfdNonListedPie'), {
        type: 'pie',
        data: {
            labels: ratingLabels[currentLang],
            datasets: [{
                data: [
                    tcfdData.nonListedRatings.excellent,
                    tcfdData.nonListedRatings.veryGood,
                    tcfdData.nonListedRatings.good,
                    tcfdData.nonListedRatings.acceptable,
                    tcfdData.nonListedRatings.needsImprovement
                ],
                backgroundColor: ratingColors
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    rtl: currentLang === 'ar',
                    labels: {
                        font: {
                            size: 16
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true
            }
        }
    });
    
    // All sectors grouped bar chart
    // Special handling: In Arabic, columns display RTL (reversed order)
    // In English, columns display LTR (normal order)
    const allSectorsLabels = tcfdData.allSectors.map(s => currentLang === 'ar' ? s.nameAr : s.nameEn);
    
    // Create datasets in reverse order for Arabic to achieve RTL column display
    const allSectorsDatasets = currentLang === 'ar' ? [
        {
            label: ratingLabels[currentLang][4], // Needs Improvement (rightmost)
            data: tcfdData.allSectors.map(s => s.ratings[4]),
            backgroundColor: ratingColors[4]
        },
        {
            label: ratingLabels[currentLang][3], // Fair
            data: tcfdData.allSectors.map(s => s.ratings[3]),
            backgroundColor: ratingColors[3]
        },
        {
            label: ratingLabels[currentLang][2], // Good
            data: tcfdData.allSectors.map(s => s.ratings[2]),
            backgroundColor: ratingColors[2]
        },
        {
            label: ratingLabels[currentLang][1], // Very Good
            data: tcfdData.allSectors.map(s => s.ratings[1]),
            backgroundColor: ratingColors[1]
        },
        {
            label: ratingLabels[currentLang][0], // Excellent (leftmost)
            data: tcfdData.allSectors.map(s => s.ratings[0]),
            backgroundColor: ratingColors[0]
        }
    ] : [
        {
            label: ratingLabels[currentLang][0], // Excellent (leftmost)
            data: tcfdData.allSectors.map(s => s.ratings[0]),
            backgroundColor: ratingColors[0]
        },
        {
            label: ratingLabels[currentLang][1], // Very Good
            data: tcfdData.allSectors.map(s => s.ratings[1]),
            backgroundColor: ratingColors[1]
        },
        {
            label: ratingLabels[currentLang][2], // Good
            data: tcfdData.allSectors.map(s => s.ratings[2]),
            backgroundColor: ratingColors[2]
        },
        {
            label: ratingLabels[currentLang][3], // Fair
            data: tcfdData.allSectors.map(s => s.ratings[3]),
            backgroundColor: ratingColors[3]
        },
        {
            label: ratingLabels[currentLang][4], // Needs Improvement (rightmost)
            data: tcfdData.allSectors.map(s => s.ratings[4]),
            backgroundColor: ratingColors[4]
        }
    ];
    
    charts.tcfdAllSectors = new Chart(document.getElementById('tcfdAllSectors'), {
        type: 'bar',
        data: {
            labels: allSectorsLabels,
            datasets: allSectorsDatasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    rtl: currentLang === 'ar'
                }
            },
            scales: {
                x: {
                    stacked: false,
                    reverse: currentLang === 'ar'
                },
                y: {
                    stacked: false,
                    beginAtZero: true
                }
            }
        }
    });
    
    // Listed pie chart
    charts.tcfdListedPie = new Chart(document.getElementById('tcfdListedPie'), {
        type: 'pie',
        data: {
            labels: ratingLabels[currentLang],
            datasets: [{
                data: [
                    tcfdData.listedRatings.excellent,
                    tcfdData.listedRatings.veryGood,
                    tcfdData.listedRatings.good,
                    tcfdData.listedRatings.acceptable,
                    tcfdData.listedRatings.needsImprovement
                ],
                backgroundColor: ratingColors
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    rtl: currentLang === 'ar',
                    labels: {
                        font: {
                            size: 16
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true
            }
        }
    });
    
    // Listed non-banking bar chart
    charts.tcfdListedNonBank = new Chart(document.getElementById('tcfdListedNonBank'), {
        type: 'bar',
        data: {
            labels: ratingLabels[currentLang],
            datasets: [{
                label: currentLang === 'ar' ? 'عدد الشركات' : 'Number of Companies',
                data: tcfdData.listedNonBanking,
                backgroundColor: ratingColors
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    reverse: currentLang === 'ar'
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Listed other sectors bar chart
    charts.tcfdListedOther = new Chart(document.getElementById('tcfdListedOther'), {
        type: 'bar',
        data: {
            labels: ratingLabels[currentLang],
            datasets: [{
                label: currentLang === 'ar' ? 'عدد الشركات' : 'Number of Companies',
                data: tcfdData.listedOtherSectors,
                backgroundColor: ratingColors
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    reverse: currentLang === 'ar'
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Comparison Charts
function createComparisonCharts() {
    // Comparison data
    const esgNonListed = [8, 7, 49, 55, 39];
    const tcfdNonListed = [0, 1, 11, 16, 20];
    const esgListed = [4, 13, 46, 104, 48];
    const tcfdListed = [5, 7, 15, 49, 43];
    
    // Non-listed companies comparison - data already in correct order
    charts.comparisonNonListed = new Chart(document.getElementById('comparisonNonListed'), {
        type: 'bar',
        data: {
            labels: ratingLabels[currentLang], // Order: Excellent, Very Good, Good, Fair, Needs Improvement
            datasets: [
                {
                    label: 'ESG',
                    data: esgNonListed, // [4, 25, 30, 40, 50] - correct order
                    backgroundColor: '#005D87'
                },
                {
                    label: 'TCFD',
                    data: tcfdNonListed, // [0, 1, 11, 16, 20] - correct order
                    backgroundColor: '#002060'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    rtl: currentLang === 'ar'
                }
            },
            scales: {
                x: {
                    reverse: currentLang === 'ar'
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Listed companies comparison - data already in correct order
    charts.comparisonListed = new Chart(document.getElementById('comparisonListed'), {
        type: 'bar',
        data: {
            labels: ratingLabels[currentLang], // Order: Excellent, Very Good, Good, Fair, Needs Improvement
            datasets: [
                {
                    label: 'ESG',
                    data: esgListed, // [10, 24, 40, 50, 100] - correct order
                    backgroundColor: '#005D87'
                },
                {
                    label: 'TCFD',
                    data: tcfdListed, // [5, 7, 15, 49, 43] - correct order
                    backgroundColor: '#002060'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    rtl: currentLang === 'ar'
                }
            },
            scales: {
                x: {
                    reverse: currentLang === 'ar'
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Update all charts when language changes
function updateCharts() {
    // Destroy existing charts
    Object.keys(charts).forEach(key => {
        if (charts[key]) {
            charts[key].destroy();
        }
    });
    
    // Recreate all charts
    createESGCharts();
    createTCFDCharts();
    createComparisonCharts();
}

// Initialize on load
window.addEventListener('DOMContentLoaded', init);