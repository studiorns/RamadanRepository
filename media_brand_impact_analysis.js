// Initialize charts when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Market Performance Chart - Bar chart with secondary axis showing MES vs Brand Recall
    const brandImpactCtx = document.getElementById('brandImpactChart').getContext('2d');
    
    // Updated data for the chart with correct MES values from platform_performance_comparison.html
    const marketData = [
        { market: 'India', mes: 5.0, brandRecall: 63, brandAssociation: 65, region: 'India', adAppeal: 89 },
        { market: 'Kuwait', mes: 1.4, brandRecall: 43, brandAssociation: 64, region: 'GCC', adAppeal: 87 },
        { market: 'Qatar', mes: 1.2, brandRecall: 67, brandAssociation: 22, region: 'GCC', adAppeal: 92 },
        { market: 'Oman', mes: 1.2, brandRecall: 65, brandAssociation: 25, region: 'GCC', adAppeal: 90 },
        { market: 'Saudi Arabia', mes: 1.2, brandRecall: 42, brandAssociation: 67, region: 'GCC', adAppeal: 93 },
        { market: 'UAE', mes: 0.6, brandRecall: 37, brandAssociation: 74, region: 'GCC', adAppeal: 91 },
        { market: 'Italy', mes: 0.9, brandRecall: 20, brandAssociation: 29, region: 'European', adAppeal: 62.7 },
        { market: 'Bahrain', mes: 0.8, brandRecall: 37, brandAssociation: 20, region: 'GCC', adAppeal: 84.3 },
        { market: 'Armenia', mes: 0.5, brandRecall: 67, brandAssociation: 22, region: 'GCC', adAppeal: 92 },
        { market: 'France', mes: 0.5, brandRecall: 12, brandAssociation: 39, region: 'European', adAppeal: 63.4 },
        { market: 'UK', mes: 0.4, brandRecall: 22, brandAssociation: 42, region: 'European', adAppeal: 62.5 },
        { market: 'Germany', mes: 0.4, brandRecall: 20, brandAssociation: 29, region: 'European', adAppeal: 62.7 }
    ];
    
    // Sort data by MES value (descending)
    marketData.sort((a, b) => b.mes - a.mes);
    
    // Define colors for regions
    const regionColors = {
        'GCC': 'rgba(52, 168, 83, 0.7)',
        'European': 'rgba(66, 133, 244, 0.7)',
        'India': 'rgba(251, 188, 4, 0.7)'
    };
    
    // Create the bar chart with secondary axis
    const brandImpactChart = new Chart(brandImpactCtx, {
        type: 'bar',
        data: {
            labels: marketData.map(item => item.market),
            datasets: [
                {
                    label: 'Media Efficiency Score (MES)',
                    data: marketData.map(item => item.mes),
                    backgroundColor: marketData.map(item => regionColors[item.region]),
                    borderColor: marketData.map(item => regionColors[item.region].replace('0.7', '1')),
                    borderWidth: 1,
                    order: 1,
                    yAxisID: 'y'
                },
                {
                    label: 'Ad Recall (%)',
                    data: marketData.map(item => item.brandRecall),
                    type: 'line',
                    borderColor: '#EA4335',
                    backgroundColor: 'rgba(234, 67, 53, 0.1)',
                    borderWidth: 2,
                    pointBackgroundColor: '#EA4335',
                    pointRadius: 4,
                    fill: false,
                    order: 0,
                    yAxisID: 'y1'
                },
                {
                    label: 'Brand Association (%)',
                    data: marketData.map(item => item.brandAssociation),
                    type: 'line',
                    borderColor: '#4285F4',
                    backgroundColor: 'rgba(66, 133, 244, 0.1)',
                    borderWidth: 2,
                    pointBackgroundColor: '#4285F4',
                    pointRadius: 4,
                    fill: false,
                    order: 0,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        color: '#3d3d3d'
                    },
                    ticks: {
                        color: '#c0c0c0'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Media Efficiency Score (MES)',
                        color: '#a0a0a0',
                        font: {
                            size: 14
                        }
                    },
                    grid: {
                        color: '#3d3d3d'
                    },
                    ticks: {
                        color: '#c0c0c0'
                    },
                    position: 'left'
                },
                y1: {
                    title: {
                        display: true,
                        text: 'Brand & Ad Metrics (%)',
                        color: '#a0a0a0',
                        font: {
                            size: 14
                        }
                    },
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        color: '#c0c0c0'
                    },
                    position: 'right',
                    min: 0,
                    max: 100
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const datasetLabel = context.dataset.label || '';
                            const value = context.parsed.y;
                            return `${datasetLabel}: ${value}`;
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Media Efficiency vs. Brand & Ad Metrics by Market',
                    color: '#e0e0e0',
                    font: {
                        size: 16
                    }
                },
                legend: {
                    labels: {
                        color: '#c0c0c0'
                    }
                }
            }
        }
    });
    
    // Correlation Matrix Chart
    const correlationCtx = document.getElementById('correlationMatrixChart').getContext('2d');
    
    // Updated correlation data with validated values
    const correlationData = {
        labels: ['Ad Recall', 'Brand Association', 'Ad Appeal (T2B)'],
        datasets: [
            {
                label: 'Media Efficiency Score',
                data: [0.77, 0.53, 0.37],
                backgroundColor: 'rgba(66, 133, 244, 0.7)',
                borderColor: 'rgba(66, 133, 244, 1)',
                borderWidth: 1
            },
            {
                label: 'Views',
                data: [0.68, 0.47, 0.30],
                backgroundColor: 'rgba(52, 168, 83, 0.7)',
                borderColor: 'rgba(52, 168, 83, 1)',
                borderWidth: 1
            },
            {
                label: 'VTR',
                data: [0.50, 0.61, 0.25],
                backgroundColor: 'rgba(251, 188, 4, 0.7)',
                borderColor: 'rgba(251, 188, 4, 1)',
                borderWidth: 1
            },
            {
                label: 'Sessions',
                data: [0.32, 0.48, 0.57],
                backgroundColor: 'rgba(234, 67, 53, 0.7)',
                borderColor: 'rgba(234, 67, 53, 1)',
                borderWidth: 1
            },
            {
                label: 'CTS%',
                data: [0.30, 0.42, 0.66],
                backgroundColor: 'rgba(142, 36, 170, 0.7)',
                borderColor: 'rgba(142, 36, 170, 1)',
                borderWidth: 1
            }
        ]
    };
    
    const correlationChart = new Chart(correlationCtx, {
        type: 'bar',
        data: correlationData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        color: '#3d3d3d'
                    },
                    ticks: {
                        color: '#c0c0c0'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Correlation Coefficient (r)',
                        color: '#a0a0a0',
                        font: {
                            size: 14
                        }
                    },
                    grid: {
                        color: '#3d3d3d'
                    },
                    ticks: {
                        color: '#c0c0c0'
                    },
                    min: 0,
                    max: 1
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Media Metrics vs. Brand Health Metrics Correlation',
                    color: '#e0e0e0',
                    font: {
                        size: 16
                    }
                },
                legend: {
                    labels: {
                        color: '#c0c0c0'
                    }
                }
            }
        }
    });
    
    
    
    
    
    // Investment vs Brand Metrics Chart (new chart)
    const investmentCtx = document.getElementById('investmentChart').getContext('2d');
    
    // Investment data from paid_media_markets_analysis.md
    const investmentData = [
        { market: 'India', investment: 278444, brandRecall: 63, brandAssociation: 65, adAppeal: 89 },
        { market: 'Kuwait', investment: 98656, brandRecall: 43, brandAssociation: 64, adAppeal: 87 },
        { market: 'Qatar', investment: 82733, brandRecall: 67, brandAssociation: 22, adAppeal: 92 },
        { market: 'Oman', investment: 88717, brandRecall: 65, brandAssociation: 25, adAppeal: 90 },
        { market: 'Saudi Arabia', investment: 451703, brandRecall: 42, brandAssociation: 67, adAppeal: 93 },
        { market: 'UAE', investment: 435855, brandRecall: 37, brandAssociation: 74, adAppeal: 91 },
        { market: 'Italy', investment: 376479, brandRecall: 20, brandAssociation: 29, adAppeal: 62.7 },
        { market: 'Bahrain', investment: 75199, brandRecall: 37, brandAssociation: 20, adAppeal: 84.3 },
        { market: 'Armenia', investment: 11570, brandRecall: 67, brandAssociation: 22, adAppeal: 92 },
        { market: 'France', investment: 622282, brandRecall: 12, brandAssociation: 39, adAppeal: 63.4 },
        { market: 'UK', investment: 873693, brandRecall: 22, brandAssociation: 42, adAppeal: 62.5 },
        { market: 'Germany', investment: 650193, brandRecall: 20, brandAssociation: 29, adAppeal: 62.7 }
    ];
    
    // Sort by investment (descending)
    investmentData.sort((a, b) => b.investment - a.investment);
    
    const investmentChart = new Chart(investmentCtx, {
        type: 'bar',
        data: {
            labels: investmentData.map(item => item.market),
            datasets: [
                {
                    label: 'Investment ($)',
                    data: investmentData.map(item => item.investment),
                    backgroundColor: 'rgba(66, 133, 244, 0.7)',
                    borderColor: 'rgba(66, 133, 244, 1)',
                    borderWidth: 1,
                    yAxisID: 'y',
                    order: 1  // Higher order value, will be drawn first (behind)
                },
                {
                    label: 'Ad Recall (%)',
                    data: investmentData.map(item => item.brandRecall),
                    type: 'line',
                    borderColor: '#EA4335',
                    backgroundColor: 'rgba(234, 67, 53, 0.1)',
                    borderWidth: 2,
                    pointBackgroundColor: '#EA4335',
                    pointRadius: 4,
                    fill: false,
                    yAxisID: 'y1',
                    order: 0  // Lower order value, will be drawn last (in front)
                },
                {
                    label: 'Brand Association (%)',
                    data: investmentData.map(item => item.brandAssociation),
                    type: 'line',
                    borderColor: '#34A853',
                    backgroundColor: 'rgba(52, 168, 83, 0.1)',
                    borderWidth: 2,
                    pointBackgroundColor: '#34A853',
                    pointRadius: 4,
                    fill: false,
                    yAxisID: 'y1',
                    order: 0  // Lower order value, will be drawn last (in front)
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        color: '#3d3d3d'
                    },
                    ticks: {
                        color: '#c0c0c0'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Investment ($)',
                        color: '#a0a0a0',
                        font: {
                            size: 14
                        }
                    },
                    grid: {
                        color: '#3d3d3d'
                    },
                    ticks: {
                        color: '#c0c0c0',
                        callback: function(value) {
                            if (value >= 1000000) return '$' + (value / 1000000).toFixed(1) + 'M';
                            if (value >= 1000) return '$' + (value / 1000).toFixed(0) + 'K';
                            return '$' + value;
                        }
                    },
                    position: 'left'
                },
                y1: {
                    title: {
                        display: true,
                        text: 'Brand & Ad Metrics (%)',
                        color: '#a0a0a0',
                        font: {
                            size: 14
                        }
                    },
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        color: '#c0c0c0'
                    },
                    position: 'right',
                    min: 0,
                    max: 100
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Investment vs. Brand & Ad Metrics by Market',
                    color: '#e0e0e0',
                    font: {
                        size: 16
                    }
                },
                legend: {
                    labels: {
                        color: '#c0c0c0'
                    }
                }
            }
        }
    });
    
    // Investment Efficiency Chart (ROI-like metric)
    const efficiencyCtx = document.getElementById('efficiencyChart').getContext('2d');
    
    // Calculate efficiency metrics (brand recall per $100k invested)
    const efficiencyData = investmentData.map(item => {
        return {
            market: item.market,
            recallEfficiency: (item.brandRecall / (item.investment / 100000)).toFixed(2),
            associationEfficiency: (item.brandAssociation / (item.investment / 100000)).toFixed(2),
            investment: item.investment
        };
    });
    
    // Sort by recall efficiency (descending)
    efficiencyData.sort((a, b) => b.recallEfficiency - a.recallEfficiency);
    
    const efficiencyChart = new Chart(efficiencyCtx, {
        type: 'bar',
        data: {
            labels: efficiencyData.map(item => item.market),
            datasets: [
                {
                    label: 'Ad Recall per $100K',
                    data: efficiencyData.map(item => item.recallEfficiency),
                    backgroundColor: 'rgba(234, 67, 53, 0.7)',
                    borderColor: 'rgba(234, 67, 53, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Brand Association per $100K',
                    data: efficiencyData.map(item => item.associationEfficiency),
                    backgroundColor: 'rgba(52, 168, 83, 0.7)',
                    borderColor: 'rgba(52, 168, 83, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        color: '#3d3d3d'
                    },
                    ticks: {
                        color: '#c0c0c0'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Brand & Ad Metrics per $100K Invested',
                        color: '#a0a0a0',
                        font: {
                            size: 14
                        }
                    },
                    grid: {
                        color: '#3d3d3d'
                    },
                    ticks: {
                        color: '#c0c0c0'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Investment Efficiency by Market',
                    color: '#e0e0e0',
                    font: {
                        size: 16
                    }
                },
                legend: {
                    labels: {
                        color: '#c0c0c0'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.dataset.label || '';
                            const value = context.parsed.y;
                            return `${label}: ${value.toFixed(2)}%`;
                        },
                        afterLabel: function(context) {
                            const index = context.dataIndex;
                            const market = efficiencyData[index];
                            return `Total Investment: $${(market.investment).toLocaleString()}`;
                        }
                    }
                }
            }
        }
    });
    
    // Ad Diagnostics Charts
    const adDiagnosticsCtx = document.getElementById('adDiagnosticsChart').getContext('2d');
    const avgDiagnosticsCtx = document.getElementById('avgDiagnosticsChart').getContext('2d');
    
    // Ad diagnostics data from Ad-diagnostics.csv for Q1 2025
    const adDiagnosticsData = [
        { market: 'India', attention: 94, information: 91, relevance: 89, motivation: 92 },
        { market: 'Saudi Arabia', attention: 90, information: 89, relevance: 86, motivation: 89 },
        { market: 'Kuwait', attention: 87, information: 85, relevance: 83, motivation: 85 },
        { market: 'UAE', attention: 87, information: 86, relevance: 87, motivation: 87 },
        { market: 'Qatar', attention: 86, information: 84, relevance: 83, motivation: 84 },
        { market: 'Oman', attention: 84, information: 83, relevance: 83, motivation: 84 },
        { market: 'Bahrain', attention: 80, information: 72, relevance: 72, motivation: 78 },
        { market: 'Armenia', attention: 68.5, information: 64, relevance: 58, motivation: 59 },
        { market: 'UK', attention: 81, information: 79, relevance: 78, motivation: 80 },
        { market: 'Italy', attention: 64, information: 61, relevance: 53, motivation: 64 },
        { market: 'France', attention: 61, information: 57, relevance: 58, motivation: 61 },
        { market: 'Germany', attention: 56, information: 54, relevance: 50, motivation: 55 }
    ];
    
    // Sort by average of all metrics (descending)
    adDiagnosticsData.sort((a, b) => {
        const avgA = (a.attention + a.information + a.relevance + a.motivation) / 4;
        const avgB = (b.attention + b.information + b.relevance + b.motivation) / 4;
        return avgB - avgA;
    });
    
    // Create the grouped bar chart for ad diagnostics by market
    const adDiagnosticsChart = new Chart(adDiagnosticsCtx, {
        type: 'bar',
        data: {
            labels: adDiagnosticsData.map(item => item.market),
            datasets: [
                {
                    label: 'Attracts Attention',
                    data: adDiagnosticsData.map(item => item.attention),
                    backgroundColor: 'rgba(66, 133, 244, 0.7)',
                    borderColor: 'rgba(66, 133, 244, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Gives New Information',
                    data: adDiagnosticsData.map(item => item.information),
                    backgroundColor: 'rgba(52, 168, 83, 0.7)',
                    borderColor: 'rgba(52, 168, 83, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Is Relevant',
                    data: adDiagnosticsData.map(item => item.relevance),
                    backgroundColor: 'rgba(251, 188, 4, 0.7)',
                    borderColor: 'rgba(251, 188, 4, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Motivates to Find Out More',
                    data: adDiagnosticsData.map(item => item.motivation),
                    backgroundColor: 'rgba(234, 67, 53, 0.7)',
                    borderColor: 'rgba(234, 67, 53, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        color: '#3d3d3d'
                    },
                    ticks: {
                        color: '#c0c0c0'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Top 2 Box (%)',
                        color: '#a0a0a0',
                        font: {
                            size: 14
                        }
                    },
                    grid: {
                        color: '#3d3d3d'
                    },
                    ticks: {
                        color: '#c0c0c0'
                    },
                    min: 0,
                    max: 100
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Ad Diagnostics by Market (Q1 2025)',
                    color: '#e0e0e0',
                    font: {
                        size: 16
                    }
                },
                legend: {
                    labels: {
                        color: '#c0c0c0'
                    }
                }
            }
        }
    });
    
    // Calculate average for each metric
    const avgAttention = adDiagnosticsData.reduce((sum, item) => sum + item.attention, 0) / adDiagnosticsData.length;
    const avgInformation = adDiagnosticsData.reduce((sum, item) => sum + item.information, 0) / adDiagnosticsData.length;
    const avgRelevance = adDiagnosticsData.reduce((sum, item) => sum + item.relevance, 0) / adDiagnosticsData.length;
    const avgMotivation = adDiagnosticsData.reduce((sum, item) => sum + item.motivation, 0) / adDiagnosticsData.length;
    
    // Create the horizontal bar chart for average ad diagnostics metrics
    const avgDiagnosticsChart = new Chart(avgDiagnosticsCtx, {
        type: 'bar',
        data: {
            labels: ['Attracts Attention', 'Gives New Information', 'Is Relevant', 'Motivates to Find Out More'],
            datasets: [
                {
                    label: 'Average T2B (%)',
                    data: [avgAttention, avgInformation, avgRelevance, avgMotivation],
                    backgroundColor: [
                        'rgba(66, 133, 244, 0.7)',
                        'rgba(52, 168, 83, 0.7)',
                        'rgba(251, 188, 4, 0.7)',
                        'rgba(234, 67, 53, 0.7)'
                    ],
                    borderColor: [
                        'rgba(66, 133, 244, 1)',
                        'rgba(52, 168, 83, 1)',
                        'rgba(251, 188, 4, 1)',
                        'rgba(234, 67, 53, 1)'
                    ],
                    borderWidth: 1
                }
            ]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        color: '#3d3d3d'
                    },
                    ticks: {
                        color: '#c0c0c0'
                    },
                    min: 0,
                    max: 100
                },
                y: {
                    grid: {
                        color: '#3d3d3d'
                    },
                    ticks: {
                        color: '#c0c0c0'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Average Ad Diagnostics Metrics Across All Markets (Q1 2025)',
                    color: '#e0e0e0',
                    font: {
                        size: 16
                    }
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.x.toFixed(1)}%`;
                        }
                    }
                }
            }
        }
    });
    
    // Brand Impact Score Charts
    const bisCtx = document.getElementById('bisChart').getContext('2d');
    const bisComponentsCtx = document.getElementById('bisComponentsChart').getContext('2d');
    
    // Calculate Brand Impact Score (BIS) for each market
    const bisData = marketData.map(market => {
        // Get ad diagnostics data for this market
        const adDiagnostic = adDiagnosticsData.find(item => item.market === market.market);
        
        // Calculate BIS components with weights
        const adRecallComponent = market.brandRecall * 0.25;
        const brandAssociationComponent = market.brandAssociation * 0.25;
        const adAppealComponent = market.adAppeal * 0.10;
        const attentionComponent = adDiagnostic.attention * 0.10;
        const informationComponent = adDiagnostic.information * 0.05;
        const relevanceComponent = adDiagnostic.relevance * 0.15;
        const motivationComponent = adDiagnostic.motivation * 0.10;
        
        // Calculate total BIS
        const bis = adRecallComponent + brandAssociationComponent + adAppealComponent + 
                   attentionComponent + informationComponent + relevanceComponent + motivationComponent;
        
        return {
            market: market.market,
            region: market.region,
            bis: parseFloat(bis.toFixed(1)),
            components: {
                adRecall: adRecallComponent,
                brandAssociation: brandAssociationComponent,
                adAppeal: adAppealComponent,
                attention: attentionComponent,
                information: informationComponent,
                relevance: relevanceComponent,
                motivation: motivationComponent
            }
        };
    });
    
    // Sort by BIS (descending)
    bisData.sort((a, b) => b.bis - a.bis);
    
    // Create the BIS chart
    const bisChart = new Chart(bisCtx, {
        type: 'bar',
        data: {
            labels: bisData.map(item => item.market),
            datasets: [
                {
                    label: 'Brand Impact Score',
                    data: bisData.map(item => item.bis),
                    backgroundColor: bisData.map(item => {
                        if (item.bis >= 80) return 'rgba(39, 174, 96, 0.7)'; // Exceptional
                        if (item.bis >= 70) return 'rgba(46, 204, 113, 0.7)'; // Strong
                        if (item.bis >= 60) return 'rgba(241, 196, 15, 0.7)'; // Good
                        if (item.bis >= 50) return 'rgba(243, 156, 18, 0.7)'; // Moderate
                        return 'rgba(231, 76, 60, 0.7)'; // Weak
                    }),
                    borderColor: bisData.map(item => {
                        if (item.bis >= 80) return 'rgba(39, 174, 96, 1)';
                        if (item.bis >= 70) return 'rgba(46, 204, 113, 1)';
                        if (item.bis >= 60) return 'rgba(241, 196, 15, 1)';
                        if (item.bis >= 50) return 'rgba(243, 156, 18, 1)';
                        return 'rgba(231, 76, 60, 1)';
                    }),
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        color: '#3d3d3d'
                    },
                    ticks: {
                        color: '#c0c0c0'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Brand Impact Score (0-100)',
                        color: '#a0a0a0',
                        font: {
                            size: 14
                        }
                    },
                    grid: {
                        color: '#3d3d3d'
                    },
                    ticks: {
                        color: '#c0c0c0'
                    },
                    min: 0,
                    max: 100
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Brand Impact Score by Market',
                    color: '#e0e0e0',
                    font: {
                        size: 16
                    }
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        afterLabel: function(context) {
                            const index = context.dataIndex;
                            const market = bisData[index];
                            let score = market.bis;
                            let rating = '';
                            
                            if (score >= 80) rating = 'Exceptional';
                            else if (score >= 70) rating = 'Strong';
                            else if (score >= 60) rating = 'Good';
                            else if (score >= 50) rating = 'Moderate';
                            else rating = 'Weak';
                            
                            return `Rating: ${rating}`;
                        }
                    }
                }
            }
        }
    });
    
    // Create the BIS Components chart
    const bisComponentsChart = new Chart(bisComponentsCtx, {
        type: 'bar',
        data: {
            labels: bisData.map(item => item.market),
            datasets: [
                {
                    label: 'Ad Recall (25%)',
                    data: bisData.map(item => item.components.adRecall),
                    backgroundColor: 'rgba(66, 133, 244, 0.7)',
                    borderColor: 'rgba(66, 133, 244, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Brand Association (25%)',
                    data: bisData.map(item => item.components.brandAssociation),
                    backgroundColor: 'rgba(52, 168, 83, 0.7)',
                    borderColor: 'rgba(52, 168, 83, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Ad Appeal (10%)',
                    data: bisData.map(item => item.components.adAppeal),
                    backgroundColor: 'rgba(251, 188, 4, 0.7)',
                    borderColor: 'rgba(251, 188, 4, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Attention (10%)',
                    data: bisData.map(item => item.components.attention),
                    backgroundColor: 'rgba(234, 67, 53, 0.7)',
                    borderColor: 'rgba(234, 67, 53, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Information (5%)',
                    data: bisData.map(item => item.components.information),
                    backgroundColor: 'rgba(142, 36, 170, 0.7)',
                    borderColor: 'rgba(142, 36, 170, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Relevance (15%)',
                    data: bisData.map(item => item.components.relevance),
                    backgroundColor: 'rgba(3, 169, 244, 0.7)',
                    borderColor: 'rgba(3, 169, 244, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Motivation (10%)',
                    data: bisData.map(item => item.components.motivation),
                    backgroundColor: 'rgba(255, 152, 0, 0.7)',
                    borderColor: 'rgba(255, 152, 0, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        color: '#3d3d3d'
                    },
                    ticks: {
                        color: '#c0c0c0'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Weighted Component Score',
                        color: '#a0a0a0',
                        font: {
                            size: 14
                        }
                    },
                    grid: {
                        color: '#3d3d3d'
                    },
                    ticks: {
                        color: '#c0c0c0'
                    },
                    stacked: true
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Brand Impact Score Components by Market',
                    color: '#e0e0e0',
                    font: {
                        size: 16
                    }
                },
                legend: {
                    labels: {
                        color: '#c0c0c0'
                    }
                },
                tooltip: {
                    callbacks: {
                        afterTitle: function(context) {
                            const index = context[0].dataIndex;
                            const market = bisData[index];
                            return `Total BIS: ${market.bis}`;
                        }
                    }
                }
            }
        }
    });
});
