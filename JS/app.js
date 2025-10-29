// ESG & TCFD Dashboard 

class ESGTCFDDashboard {
    constructor() {
        // Data from the application_data_json
        this.data = {
            esgData: {
                title: "تقييم الافصاحات المالية المتعلقة بالممارسات البيئية والاجتماعية والحوكمة – ESG",
                totalCompanies: 346,
                totals: {
                    "A+": 12,
                    "A": 20,
                    "B": 93,
                    "C": 144,
                    "D": 77
                },
                sectors: [
                    {
                        name: "Finance",
                        nameAr: "قطاع سوق المال",
                        ratings: {"A+": 8, "A": 16, "B": 47, "C": 101, "D": 50},
                        total: 222
                    },
                    {
                        name: "Insurance",
                        nameAr: "قطاع التأمين",
                        ratings: {"A+": 0, "A": 1, "B": 16, "C": 18, "D": 4},
                        total: 39
                    },
                    {
                        name: "Real Estate Finance",
                        nameAr: "التمويل العقاري",
                        ratings: {"A+": 2, "A": 0, "B": 3, "C": 3, "D": 5},
                        total: 13
                    },
                    {
                        name: "Consumer Finance",
                        nameAr: "التمويل الاستهلاكي",
                        ratings: {"A+": 1, "A": 1, "B": 6, "C": 7, "D": 3},
                        total: 18
                    },
                    {
                        name: "Factoring",
                        nameAr: "التخصيم",
                        ratings: {"A+": 1, "A": 0, "B": 3, "C": 1, "D": 1},
                        total: 6
                    },
                    {
                        name: "Financial Leasing",
                        nameAr: "التأجير التمويلي",
                        ratings: {"A+": 0, "A": 1, "B": 9, "C": 8, "D": 7},
                        total: 25
                    },
                    {
                        name: "Multi-license Finance",
                        nameAr: "التمويل متعدد الرخص",
                        ratings: {"A+": 0, "A": 1, "B": 3, "C": 1, "D": 2},
                        total: 7
                    },
                    {
                        name: "Micro-finance",
                        nameAr: "التمويل متناهي الصغر",
                        ratings: {"A+": 0, "A": 0, "B": 6, "C": 5, "D": 5},
                        total: 16
                    }
                ]
            },
            tcfdData: {
                title: "تقييم الافصاحات المالية المتعلقة بالتغيرات المناخية – TCFD",
                totalCompanies: 148,
                totals: {
                    "A+": 4,
                    "A": 7,
                    "B": 23,
                    "C": 54,
                    "D": 60
                },
                sectors: [
                    {
                        name: "Finance",
                        nameAr: " قطاع سوق المال",
                        ratings: {"A+": 4, "A": 6, "B": 16, "C": 40, "D": 43},
                        total: 109
                    },
                    {
                        name: "Insurance",
                        nameAr: "قطاع التأمين",
                        ratings: {"A+": 0, "A": 0, "B": 3, "C": 7, "D": 4},
                        total: 14
                    },
                    {
                        name: "Real Estate Finance",
                        nameAr: "التمويل العقاري",
                        ratings: {"A+": 0, "A": 1, "B": 1, "C": 0, "D": 1},
                        total: 3
                    },
                    {
                        name: "Consumer Finance",
                        nameAr: "التمويل الاستهلاكي",
                        ratings: {"A+": 0, "A": 0, "B": 1, "C": 0, "D": 3},
                        total: 4
                    },
                    {
                        name: "Factoring",
                        nameAr: "التخصيم",
                        ratings: {"A+": 0, "A": 0, "B": 1, "C": 1, "D": 1},
                        total: 3
                    },
                    {
                        name: "Financial Leasing",
                        nameAr: "التأجير التمويلي",
                        ratings: {"A+": 0, "A": 0, "B": 0, "C": 5, "D": 5},
                        total: 10
                    },
                    {
                        name: "Multi-license Finance",
                        nameAr: "التمويل متعدد الرخص",
                        ratings: {"A+": 0, "A": 0, "B": 1, "C": 1, "D": 1},
                        total: 3
                    },
                    {
                        name: "Micro-finance",
                        nameAr: "التمويل متناهي الصغر",
                        ratings: {"A+": 0, "A": 0, "B": 0, "C": 0, "D": 2},
                        total: 2
                    }
                ]
            },
            ratingLabels: {
                "A+": "ممتاز (A+)",
                "A": "جيد جداً (A)",
                "B": "جيد (B)",
                "C": "مقبول (C)",
                "D": "يحتاج تحسين (D)"
            },
            colors: {
                "A+": "#1FB8CD",
                "A": "#FFC185",
                "B": "#B4413C",
                "C": "#ECEBD5",
                "D": "#5D878F"
            }
        };

        this.currentTab = 'esg';
        this.selectedSector = null;
        this.charts = {};
        this.sectorCharts = { esg: {}, tcfd: {} };
        this.filters = {
            esg: { ratings: ['A+', 'A', 'B', 'C', 'D'], sector: 'all' },
            tcfd: { ratings: ['A+', 'A', 'B', 'C', 'D'], sector: 'all' }
        };

        this.init();
    }

    init() {
        try {
            this.setupEventListeners();
            this.populateSectorFilters();
            this.generateSummaryCards();
            this.generateSectorCards();
            this.generateAnalysisTables();
            this.generateCharts();
            this.generateComparisonContent();
            this.showTab('esg');
        } catch (error) {
            console.error('Error initializing dashboard:', error);
        }
    }

    setupEventListeners() {
        // Tab switching - Fixed to be more robust
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const tabName = e.target.getAttribute('data-tab');
                if (tabName) {
                    this.showTab(tabName);
                }
            });
        });

        // Filter controls for both ESG and TCFD
        ['esg', 'tcfd'].forEach(type => {
            // Apply filters button
            const applyBtn = document.getElementById(`${type}-apply-filters`);
            if (applyBtn) {
                applyBtn.addEventListener('click', () => {
                    this.applyFilters(type);
                });
            }

            // Clear filters button
            const clearBtn = document.getElementById(`${type}-clear-filters`);
            if (clearBtn) {
                clearBtn.addEventListener('click', () => {
                    this.clearFilters(type);
                });
            }

            // Chart type buttons
            const chartTypeBtns = document.querySelectorAll(`#${type}-tab .chart-type-btn`);
            chartTypeBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    chartTypeBtns.forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    this.updateChart(type, e.target.dataset.type);
                });
            });
        });

        // Export functionality
        this.addExportButtons();

        // Modal functionality
        const closeBtn = document.getElementById('close-export-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hideModal());
        }

        const exportCsvBtn = document.getElementById('export-csv');
        if (exportCsvBtn) {
            exportCsvBtn.addEventListener('click', () => this.exportCSV());
        }

        const exportChartBtn = document.getElementById('export-chart');
        if (exportChartBtn) {
            exportChartBtn.addEventListener('click', () => this.exportChart());
        }

        // Close modal when clicking backdrop
        const modal = document.getElementById('export-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target.classList.contains('modal-backdrop')) {
                    this.hideModal();
                }
            });
        }
    }

    addExportButtons() {
        const sections = document.querySelectorAll('.chart-header');
        sections.forEach(section => {
            if (!section.querySelector('.export-btn')) {
                const exportBtn = document.createElement('button');
                exportBtn.className = 'btn btn--outline export-btn';
                exportBtn.innerHTML = 'تصدير البيانات';
                exportBtn.addEventListener('click', () => this.showModal());
                section.appendChild(exportBtn);
            }
        });
    }

    showTab(tabName) {
        try {
            console.log('Switching to tab:', tabName);
            
            // Hide all tab contents
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
                tab.style.display = 'none';
            });
            
            // Remove active class from all tab buttons
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });

            // Show selected tab content
            const targetTab = document.getElementById(`${tabName}-tab`);
            const targetBtn = document.querySelector(`[data-tab="${tabName}"]`);
            
            if (targetTab) {
                targetTab.classList.add('active');
                targetTab.style.display = 'block';
                console.log('Tab content shown:', targetTab.id);
            } else {
                console.error('Target tab not found:', `${tabName}-tab`);
            }
            
            if (targetBtn) {
                targetBtn.classList.add('active');
                console.log('Tab button activated:', targetBtn);
            } else {
                console.error('Target button not found for tab:', tabName);
            }

            this.currentTab = tabName;
            this.selectedSector = null;
            
            // Update charts when switching tabs
            setTimeout(() => {
                try {
                    if (this.charts[tabName]) {
                        this.charts[tabName].resize();
                    }
                    if (tabName === 'comparison' && this.charts.comparison) {
                        this.charts.comparison.resize();
                    }
                    this.updateSectorCards(tabName);
                } catch (error) {
                    console.error('Error updating charts after tab switch:', error);
                }
            }, 100);
        } catch (error) {
            console.error('Error in showTab:', error);
        }
    }

    populateSectorFilters() {
        const esgSelect = document.getElementById('esg-sector-filter');
        const tcfdSelect = document.getElementById('tcfd-sector-filter');

        if (esgSelect) {
            this.data.esgData.sectors.forEach(sector => {
                const option = document.createElement('option');
                option.value = sector.name;
                option.textContent = sector.nameAr;
                esgSelect.appendChild(option);
            });
        }

        if (tcfdSelect) {
            this.data.tcfdData.sectors.forEach(sector => {
                const option = document.createElement('option');
                option.value = sector.name;
                option.textContent = sector.nameAr;
                tcfdSelect.appendChild(option);
            });
        }
    }

    generateSummaryCards() {
        this.generateSummaryCardsForType('esg');
        this.generateSummaryCardsForType('tcfd');
    }

    generateSummaryCardsForType(type) {
        const container = document.getElementById(`${type}-summary-cards`);
        if (!container) return;

        const data = type === 'esg' ? this.data.esgData : this.data.tcfdData;
        container.innerHTML = '';

        //Total companies card
        const totalCard = this.createSummaryCard(
            'إجمالي الشركات',
            data.totalCompanies,
            '',
            'total-card'
        );
        container.appendChild(totalCard);

        // Rating cards
        Object.entries(data.totals).forEach(([rating, count]) => {
            const percentage = ((count / data.totalCompanies) * 100).toFixed(1);
            const card = this.createSummaryCard(
                this.data.ratingLabels[rating],
                count,
                `${percentage}%`,
                `rating-${rating.toLowerCase().replace('+', '-plus')}`
            );
            container.appendChild(card);
        });
    }

    createSummaryCard(title, value, percentage, className) {
        const card = document.createElement('div');
        card.className = `summary-card ${className}`;
        card.innerHTML = `
            <div class="card-title">${title}</div>
            <div class="card-value">${value}</div>
            <div class="card-percentage">${percentage}</div>
        `;
        return card;
    }

    // Generate Sector Cards with Pie Charts
    generateSectorCards() {
        this.generateSectorCardsForType('esg');
        this.generateSectorCardsForType('tcfd');
    }

    generateSectorCardsForType(type) {
        try {
            const container = document.getElementById(`${type}-sector-cards`);
            if (!container) {
                console.error(`Container not found: ${type}-sector-cards`);
                return;
            }

            const data = type === 'esg' ? this.data.esgData : this.data.tcfdData;
            container.innerHTML = '';

            data.sectors.forEach((sector, index) => {
                try {
                    const card = this.createSectorCard(sector, type, index);
                    container.appendChild(card);
                } catch (error) {
                    console.error(`Error creating sector card ${index} for ${type}:`, error);
                }
            });

            // Generate pie charts after cards are in DOM - with error handling
            setTimeout(() => {
                data.sectors.forEach((sector, index) => {
                    try {
                        this.createSectorPieChart(sector, type, index);
                    } catch (error) {
                        console.error(`Error creating pie chart ${index} for ${type}:`, error);
                    }
                });
            }, 200);
        } catch (error) {
            console.error(`Error generating sector cards for ${type}:`, error);
        }
    }

    createSectorCard(sector, type, index) {
        const successCount = (sector.ratings['A+'] || 0) + (sector.ratings['A'] || 0) + (sector.ratings['B'] || 0) + (sector.ratings['C'] || 0);
        const complianceRate = sector.total > 0 ? ((successCount / sector.total) * 100).toFixed(1) : '0.0';

        const card = document.createElement('div');
        card.className = 'sector-card';
        card.dataset.sector = sector.name;
        card.dataset.type = type;
        
        card.innerHTML = `
            <div class="sector-card-title">${sector.nameAr}</div>
            <div class="sector-chart-container">
                <canvas id="${type}-sector-chart-${index}" width="150" height="150"></canvas>
            </div>
            <div class="sector-stats">
                <div class="sector-stat">
                    <div class="sector-stat-label">إجمالي الشركات</div>
                    <div class="sector-stat-value companies">${sector.total}</div>
                </div>
                <div class="sector-stat">
                    <div class="sector-stat-label">معدل الاجتياز</div>
                    <div class="sector-stat-value compliance">${complianceRate}%</div>
                </div>
            </div>
            <div class="sector-card-legend">
                ${Object.entries(sector.ratings).map(([rating, count]) => `
                    <div class="legend-item">
                        <div class="legend-color" style="background-color: ${this.data.colors[rating]}"></div>
                        <div class="legend-label">${rating}</div>
                        <div class="legend-count">${count}</div>
                    </div>
                `).join('')}
            </div>
        `;

        // Add click event listener for sector filtering
        card.addEventListener('click', (e) => {
            e.preventDefault();
            this.selectSector(sector.name, type);
        });

        return card;
    }

    createSectorPieChart(sector, type, index) {
        const canvas = document.getElementById(`${type}-sector-chart-${index}`);
        if (!canvas) {
            console.error(`Canvas not found: ${type}-sector-chart-${index}`);
            return;
        }

        const ctx = canvas.getContext('2d');
        
        // Prepare data for pie chart
        const ratings = ['A+', 'A', 'B', 'C', 'D'];
        const data = ratings.map(rating => sector.ratings[rating] || 0);
        const colors = ratings.map(rating => this.data.colors[rating]);
        const labels = ratings.map(rating => `${rating} (${sector.ratings[rating] || 0})`);

        // Filter out zero values for cleaner display
        const filteredData = [];
        const filteredColors = [];
        const filteredLabels = [];
        
        data.forEach((value, idx) => {
            if (value > 0) {
                filteredData.push(value);
                filteredColors.push(colors[idx]);
                filteredLabels.push(labels[idx]);
            }
        });

        // Handle case where all values are zero
        if (filteredData.length === 0) {
            filteredData.push(1);
            filteredColors.push('#CCCCCC');
            filteredLabels.push('لا توجد بيانات');
        }

        try {
            this.sectorCharts[type][index] = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: filteredLabels,
                    datasets: [{
                        data: filteredData,
                        backgroundColor: filteredColors,
                        borderWidth: 2,
                        borderColor: 'rgba(255, 255, 255, 0.8)'
                    }]
                },
                options: {
                    responsive: false,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: true,
                            callbacks: {
                                label: function(context) {
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = ((context.parsed / total) * 100).toFixed(1);
                                    return `${context.label}: ${percentage}%`;
                                }
                            }
                        }
                    }
                }
            });
        } catch (error) {
            console.error(`Error creating chart for ${type}-sector-chart-${index}:`, error);
        }
    }

    selectSector(sectorName, type) {
        try {
            // Update selected sector
            this.selectedSector = sectorName;
            
            // Update visual selection
            const cards = document.querySelectorAll(`#${type}-sector-cards .sector-card`);
            cards.forEach(card => {
                if (card.dataset.sector === sectorName) {
                    card.classList.add('selected');
                } else {
                    card.classList.remove('selected');
                }
            });

            // Update sector filter dropdown
            const sectorSelect = document.getElementById(`${type}-sector-filter`);
            if (sectorSelect) {
                sectorSelect.value = sectorName;
            }

            // Apply the filter to main chart
            this.filters[type].sector = sectorName;
            this.updateChartWithFilters(type);
        } catch (error) {
            console.error('Error selecting sector:', error);
        }
    }

    updateSectorCards(type) {
        try {
            // Clear selection when switching tabs
            if (type !== 'comparison') {
                const cards = document.querySelectorAll(`#${type}-sector-cards .sector-card`);
                cards.forEach(card => card.classList.remove('selected'));
            }
        } catch (error) {
            console.error('Error updating sector cards:', error);
        }
    }

    generateAnalysisTables() {
        this.generateAnalysisTableForType('esg');
        this.generateAnalysisTableForType('tcfd');
    }

    generateAnalysisTableForType(type) {
        const table = document.getElementById(`${type}-analysis-table`);
        if (!table) return;

        const data = type === 'esg' ? this.data.esgData : this.data.tcfdData;
        const tbody = table.querySelector('tbody');
        tbody.innerHTML = '';

        data.sectors.forEach(sector => {
            const row = document.createElement('tr');
            const successCount = (sector.ratings['A+'] || 0) + (sector.ratings['A'] || 0) + (sector.ratings['B'] || 0) + (sector.ratings['C'] || 0) ;
            const successRate = ((successCount / sector.total) * 100).toFixed(1);
            
            let successRateClass = 'low';
            if (parseFloat(successRate) >= 70) successRateClass = 'high';
            else if (parseFloat(successRate) >= 50) successRateClass = 'medium';

            row.innerHTML = `
                <td>${sector.nameAr}</td>
                <td>${sector.total}</td>
                <td>${sector.ratings['A+'] || 0}</td>
                <td>${sector.ratings['A'] || 0}</td>
                <td>${sector.ratings['B'] || 0}</td>
                <td>${sector.ratings['C'] || 0}</td>
                <td>${sector.ratings['D'] || 0}</td>
                <td class="success-rate ${successRateClass}">${successRate}%</td>
            `;
            tbody.appendChild(row);
        });
    }

    generateCharts() {
        this.generateChart('esg');
        this.generateChart('tcfd');
        this.generateComparisonChart();
    }

    generateChart(type) {
        const canvas = document.getElementById(`${type}-chart`);
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const data = type === 'esg' ? this.data.esgData : this.data.tcfdData;

        // Destroy existing chart
        if (this.charts[type]) {
            this.charts[type].destroy();
        }

        const chartData = this.prepareChartData(data);
        
        this.charts[type] = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: `توزيع التقييمات - ${type.toUpperCase()}`,
                        font: { size: 16, weight: 'bold' }
                    },
                    legend: {
                        position: 'top',
                        labels: { usePointStyle: true }
                    },
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            title: function(context) {
                                return context[0].label;
                            },
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y} شركة`;
                            },
                            afterLabel: function(context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = total > 0 ? ((context.parsed.y / total) * 100).toFixed(1) : '0';
                                return `النسبة: ${percentage}%`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'عدد الشركات'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'القطاع'
                        }
                    }
                },
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'index',
                    intersect: false
                }
            }
        });
    }

    prepareChartData(data) {
        const ratings = ['A+', 'A', 'B', 'C', 'D'];
        const labels = data.sectors.map(s => s.nameAr);
        
        const datasets = ratings.map(rating => ({
            label: this.data.ratingLabels[rating],
            data: data.sectors.map(sector => sector.ratings[rating] || 0),
            backgroundColor: this.data.colors[rating],
            borderColor: this.data.colors[rating],
            borderWidth: 1
        }));

        return { labels, datasets };
    }

    updateChart(type, chartType) {
        if (!this.charts[type]) return;

        const chart = this.charts[type];
        
        if (chartType === 'stacked') {
            chart.options.scales.x.stacked = true;
            chart.options.scales.y.stacked = true;
            chart.options.plugins.title.text = `توزيع التقييمات - ${type.toUpperCase()} (مكدس)`;
        } else {
            chart.options.scales.x.stacked = false;
            chart.options.scales.y.stacked = false;
            chart.options.plugins.title.text = `توزيع التقييمات - ${type.toUpperCase()}`;
        }

        chart.update('none');
    }

    generateComparisonChart() {
        const canvas = document.getElementById('comparison-chart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        // Destroy existing chart
        if (this.charts.comparison) {
            this.charts.comparison.destroy();
        }

        const esgTotals = Object.values(this.data.esgData.totals);
        const tcfdTotals = Object.values(this.data.tcfdData.totals);
        const labels = Object.keys(this.data.ratingLabels).map(k => this.data.ratingLabels[k]);

        this.charts.comparison = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'ESG',
                        data: esgTotals,
                        backgroundColor: '#1FB8CD',
                        borderColor: '#1FB8CD',
                        borderWidth: 1
                    },
                    {
                        label: 'TCFD',
                        data: tcfdTotals,
                        backgroundColor: '#FFC185',
                        borderColor: '#FFC185',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'مقارنة إجمالية بين ESG و TCFD',
                        font: { size: 16, weight: 'bold' }
                    },
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y} شركة`;
                            },
                            afterLabel: function(context) {
                                const esgTotal = context.chart.data.datasets[0].data[context.dataIndex];
                                const tcfdTotal = context.chart.data.datasets[1].data[context.dataIndex];
                                const diff = esgTotal - tcfdTotal;
                                return `الفرق: ${diff > 0 ? '+' : ''}${diff} شركة`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'عدد الشركات'
                        }
                    }
                },
                interaction: {
                    mode: 'index',
                    intersect: false,
                }
            }
        });
    }

    generateComparisonContent() {
        this.generateComparisonStats();
        this.generateGapAnalysis();
        this.generateSectorRanking();
    }

    generateComparisonStats() {
        const esgContainer = document.getElementById('esg-comparison-stats');
        const tcfdContainer = document.getElementById('tcfd-comparison-stats');

        if (esgContainer) {
            esgContainer.innerHTML = this.generateStatsHTML(this.data.esgData);
        }

        if (tcfdContainer) {
            tcfdContainer.innerHTML = this.generateStatsHTML(this.data.tcfdData);
        }
    }

    generateStatsHTML(data) {
        return Object.entries(data.totals).map(([rating, count]) => {
            const percentage = ((count / data.totalCompanies) * 100).toFixed(1);
            return `
                <div class="comparison-stat">
                    <div class="comparison-stat-label">${this.data.ratingLabels[rating]}</div>
                    <div class="comparison-stat-value">${count}</div>
                    <div class="comparison-stat-label">${percentage}%</div>
                </div>
            `;
        }).join('');
    }

    generateGapAnalysis() {
        const container = document.getElementById('gap-analysis-cards');
        if (!container) return;

        const ratings = ['A+', 'A', 'B', 'C', 'D'];
        container.innerHTML = '';

        ratings.forEach(rating => {
            const esgCount = this.data.esgData.totals[rating];
            const tcfdCount = this.data.tcfdData.totals[rating];
            const difference = esgCount - tcfdCount;
            const isPositive = difference > 0;

            const card = document.createElement('div');
            card.className = `gap-card ${isPositive ? 'positive' : difference < 0 ? 'negative' : 'neutral'}`;
            card.innerHTML = `
                <div class="gap-title">${this.data.ratingLabels[rating]}</div>
                <div class="gap-value ${isPositive ? 'positive' : difference < 0 ? 'negative' : 'neutral'}">
                    ${difference > 0 ? '+' : ''}${difference}
                </div>
                <div class="gap-title">
                    ${difference > 0 ? 'ESG أعلى' : difference < 0 ? 'TCFD أعلى' : 'متساوي'}
                </div>
            `;
            container.appendChild(card);
        });
    }

    generateSectorRanking() {
        const esgRanking = this.calculateSectorRanking('esg');
        const tcfdRanking = this.calculateSectorRanking('tcfd');

        this.renderRanking('esg-ranking', esgRanking);
        this.renderRanking('tcfd-ranking', tcfdRanking);
    }

    calculateSectorRanking(type) {
        const data = type === 'esg' ? this.data.esgData : this.data.tcfdData;
        
        return data.sectors.map(sector => {
            const successCount = (sector.ratings['A+'] || 0) + (sector.ratings['A'] || 0) + (sector.ratings['B'] || 0);
            const successRate = sector.total > 0 ? (successCount / sector.total) * 100 : 0;
            
            return {
                name: sector.nameAr,
                score: successRate.toFixed(1)
            };
        }).sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
    }

    renderRanking(containerId, ranking) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = ranking.map((item, index) => `
            <div class="ranking-item">
                <div class="ranking-position">${index + 1}</div>
                <div class="ranking-sector">${item.name}</div>
                <div class="ranking-score">${item.score}%</div>
            </div>
        `).join('');
    }

    applyFilters(type) {
        const ratingCheckboxes = document.querySelectorAll(`#${type}-rating-filters input[type="checkbox"]`);
        const sectorSelect = document.getElementById(`${type}-sector-filter`);

        const selectedRatings = Array.from(ratingCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        this.filters[type].ratings = selectedRatings;
        this.filters[type].sector = sectorSelect.value;

        // Update selected sector visual indicator
        if (sectorSelect.value !== 'all') {
            this.selectedSector = sectorSelect.value;
            this.updateSectorCardSelection(type, sectorSelect.value);
        } else {
            this.selectedSector = null;
            this.clearSectorSelection(type);
        }

        // Update chart with filtered data
        this.updateChartWithFilters(type);
    }

    updateSectorCardSelection(type, sectorName) {
        const cards = document.querySelectorAll(`#${type}-sector-cards .sector-card`);
        cards.forEach(card => {
            if (card.dataset.sector === sectorName) {
                card.classList.add('selected');
            } else {
                card.classList.remove('selected');
            }
        });
    }

    clearSectorSelection(type) {
        const cards = document.querySelectorAll(`#${type}-sector-cards .sector-card`);
        cards.forEach(card => card.classList.remove('selected'));
    }

    updateChartWithFilters(type) {
        const data = type === 'esg' ? this.data.esgData : this.data.tcfdData;
        let filteredData = { ...data };

        // Filter by sector
        if (this.filters[type].sector !== 'all') {
            filteredData.sectors = data.sectors.filter(s => s.name === this.filters[type].sector);
        }

        // Update chart
        const chartData = this.prepareFilteredChartData(filteredData, this.filters[type].ratings);
        if (this.charts[type]) {
            this.charts[type].data = chartData;
            this.charts[type].update();
        }
    }

    prepareFilteredChartData(data, selectedRatings) {
        const labels = data.sectors.map(s => s.nameAr);
        
        const datasets = selectedRatings.map(rating => ({
            label: this.data.ratingLabels[rating],
            data: data.sectors.map(sector => sector.ratings[rating] || 0),
            backgroundColor: this.data.colors[rating],
            borderColor: this.data.colors[rating],
            borderWidth: 1
        }));

        return { labels, datasets };
    }

    clearFilters(type) {
        // Reset rating checkboxes
        const ratingCheckboxes = document.querySelectorAll(`#${type}-rating-filters input[type="checkbox"]`);
        ratingCheckboxes.forEach(cb => cb.checked = true);

        // Reset sector filter
        const sectorSelect = document.getElementById(`${type}-sector-filter`);
        if (sectorSelect) sectorSelect.value = 'all';

        // Clear sector selection
        this.selectedSector = null;
        this.clearSectorSelection(type);

        // Reset filters and update chart
        this.filters[type] = { ratings: ['A+', 'A', 'B', 'C', 'D'], sector: 'all' };
        this.generateChart(type);
    }

    exportCSV() {
        let csvContent = '';
        let filename = '';
        
        if (this.currentTab === 'esg') {
            csvContent = this.generateCSVContent(this.data.esgData);
            filename = 'esg-data.csv';
        } else if (this.currentTab === 'tcfd') {
            csvContent = this.generateCSVContent(this.data.tcfdData);
            filename = 'tcfd-data.csv';
        } else if (this.currentTab === 'comparison') {
            csvContent = this.generateComparisonCSV();
            filename = 'comparison-data.csv';
        }

        this.downloadFile(filename, csvContent, 'text/csv');
        this.hideModal();
    }

    generateCSVContent(data) {
        let csv = 'القطاع,إجمالي الشركات,ممتاز (A+),جيد جداً (A),جيد (B),مقبول (C),يحتاج تحسين (D),معدل النجاح\n';
        
        data.sectors.forEach(sector => {
            const successCount = (sector.ratings['A+'] || 0) + (sector.ratings['A'] || 0) + (sector.ratings['B'] || 0);
            const successRate = ((successCount / sector.total) * 100).toFixed(1);
            
            csv += `${sector.nameAr},${sector.total},${sector.ratings['A+'] || 0},${sector.ratings['A'] || 0},${sector.ratings['B'] || 0},${sector.ratings['C'] || 0},${sector.ratings['D'] || 0},${successRate}%\n`;
        });
        
        return csv;
    }

    generateComparisonCSV() {
        let csv = 'التقييم,ESG,TCFD,الفرق\n';
        
        Object.keys(this.data.ratingLabels).forEach(rating => {
            const esgCount = this.data.esgData.totals[rating];
            const tcfdCount = this.data.tcfdData.totals[rating];
            const difference = esgCount - tcfdCount;
            
            csv += `${this.data.ratingLabels[rating]},${esgCount},${tcfdCount},${difference}\n`;
        });
        
        return csv;
    }

    exportChart() {
        let canvas;
        let filename;
        
        if (this.currentTab === 'comparison') {
            canvas = document.getElementById('comparison-chart');
            filename = 'comparison-chart.png';
        } else {
            canvas = document.getElementById(`${this.currentTab}-chart`);
            filename = `${this.currentTab}-chart.png`;
        }
        
        if (canvas) {
            canvas.toBlob(blob => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            });
        }
        this.hideModal();
    }

    downloadFile(filename, content, contentType) {
        const blob = new Blob([content], { type: contentType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    showModal() {
        const modal = document.getElementById('export-modal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    hideModal() {
        const modal = document.getElementById('export-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }
}

// Initialize the dashboard when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ESGTCFDDashboard();
});
