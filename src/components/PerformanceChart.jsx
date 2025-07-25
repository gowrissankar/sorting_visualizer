// /src/components/PerformanceChart.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Legend,
    Tooltip,
} from 'chart.js';
import { PerformanceService } from '../services/performanceService.js';
import { CHART_CONFIG, CHART_COLORS, CHART_STYLES, ALGORITHM_NAMES } from '../constants/chartConstants';
import '../styles/sliders.css'; // Import custom slider styles

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Legend, Tooltip);

export default function PerformanceChart({ selectedAlgorithm, lastRunData }) {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [yAxisMax, setYAxisMax] = useState(CHART_CONFIG.Y_AXIS.DEFAULT_SCALE);
    
    // Use ref to track last processed run data to prevent loops
    const lastProcessedRun = useRef(null);

    useEffect(() => {
        loadChartData();
    }, [selectedAlgorithm]);

    // Only update user run point when lastRunData actually changes
    useEffect(() => {
        if (chartData && lastRunData && 
            (!lastProcessedRun.current || 
             lastProcessedRun.current.size !== lastRunData.size || 
             lastProcessedRun.current.comparisons !== lastRunData.comparisons ||
             lastProcessedRun.current.algorithm !== lastRunData.algorithm)) {
            
            console.log('Updating user run point:', lastRunData);
            lastProcessedRun.current = { ...lastRunData };
            updateUserRunPoint();
        }
    }, [lastRunData]);

    const loadChartData = async () => {
        try {
            setLoading(true);
            const data = await PerformanceService.getAllPerformanceData();
            const transformed = transformToChartData(data, selectedAlgorithm);
            setChartData(transformed);
            // Reset the last processed run when loading new data
            lastProcessedRun.current = null;
        } catch (error) {
            console.error('Failed to load chart data:', error);
        } finally {
            setLoading(false);
        }
    };

    const transformToChartData = (data, selectedAlgo) => {
        const algorithms = {};
        data.forEach(record => {
            if (!algorithms[record.algorithm]) {
                algorithms[record.algorithm] = [];
            }
            algorithms[record.algorithm].push({
                x: record.size,
                y: record.average_comparisons
            });
        });

        const datasets = Object.entries(algorithms).map(([algo, points]) => {
            const isSelected = algo === selectedAlgo;
            return {
                label: ALGORITHM_NAMES[algo] || algo,
                data: points,
                borderColor: isSelected
                    ? '#e2b714'  // YELLOW for active algorithm line
                    : CHART_COLORS.INACTIVE_ALGORITHM, // Gray for inactive
                backgroundColor: 'transparent',
                tension: CHART_STYLES.ALGORITHM_LINE.TENSION,
                pointRadius: 0,
                pointHoverRadius: 0,
                borderWidth: isSelected ? 3 : CHART_STYLES.ALGORITHM_LINE.BORDER_WIDTH,
                order: isSelected ? 1 : 2,
                pointHitRadius: 0
            };
        });

        // Add user run dataset (WHITE dot with tooltip)
        datasets.push({
            label: 'user_run',
            data: [], // Start empty
            pointBackgroundColor: '#4ecdc4', // WHITE dot
            pointBorderColor: '#ffffff',
            pointBorderWidth: 1,
            pointRadius: 4,
            pointHoverRadius: 6,
            showLine: false,
            order: -1,
            pointStyle: 'circle',
            tension: 0,
            pointHitRadius: 10
        });

        return { datasets };
    };

    // Update user run point without triggering re-render loop
    const updateUserRunPoint = () => {
        if (!lastRunData) return;
        
        console.log('Adding user run point at:', { x: lastRunData.size, y: lastRunData.comparisons });
        
        setChartData(prevChartData => {
            if (!prevChartData) return prevChartData;
            
            // Create new datasets array with updated user run data
            const newDatasets = prevChartData.datasets.map(dataset => {
                if (dataset.label === 'user_run') {
                    return {
                        ...dataset,
                        data: [{ x: lastRunData.size, y: lastRunData.comparisons }]
                    };
                }
                return dataset;
            });
            
            return {
                ...prevChartData,
                datasets: newDatasets
            };
        });
    };

    const handleYAxisChange = (e) => {
        setYAxisMax(parseInt(e.target.value));
    };

    return (
        <div className="w-full h-full bg-visualizer-bg-secondary rounded-xl shadow-lg p-6 flex flex-col min-h-96">
            {/* Chart - Takes most of the space */}
            <div className="flex-1 w-full min-h-80">
                {loading ? (
                    <div className="flex items-center justify-center h-full text-visualizer-text-primary">
                        Loading...
                    </div>
                ) : chartData && chartData.datasets.length > 0 ? (
                    <Line
                        data={chartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                title: { display: false },
                                legend: { display: false },
                                tooltip: { 
                                    enabled: true,
                                    filter: function(tooltipItem) {
                                        return tooltipItem.dataset.label === 'user_run';
                                    },
                                    backgroundColor: 'rgba(44,46,52,0.95)',
                                    titleColor: '#94a3b8',
                                    bodyColor: '#94a3b8',
                                    borderColor: 'rgba(148,163,184,0.20)',
                                    borderWidth: 1,
                                    cornerRadius: 8,
                                    padding: 6,
                                    displayColors: false,
                                    callbacks: {
                                        title: () => '',
                                        label: (ctx) => {
                                            const algo = ALGORITHM_NAMES[lastRunData?.algorithm] ?? lastRunData?.algorithm;
                                            return [algo, ctx.parsed.x + ' • ' + ctx.parsed.y];
                                        }
                                    }
                                }
                            },
                            scales: {
                                x: {
                                    type: 'linear',
                                    min: 10,
                                    max: 100,
                                    title: { display: false },
                                    ticks: {
                                        color: CHART_COLORS.TEXT_SECONDARY,
                                        font: { size: 12 },
                                        stepSize: 10
                                    },
                                    grid: { color: CHART_COLORS.GRID }
                                },
                                y: {
                                    min: 0,
                                    max: yAxisMax,
                                    title: { display: false },
                                    ticks: {
                                        color: CHART_COLORS.TEXT_SECONDARY,
                                        font: { size: 12 },
                                        stepSize: Math.ceil(yAxisMax / 10)
                                    },
                                    grid: { color: CHART_COLORS.GRID }
                                }
                            }
                        }}
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-visualizer-text-secondary">
                        No data
                    </div>
                )}
            </div>
            
            {/* Controls row below chart */}
            <div className="flex gap-6 mt-6 items-center justify-center flex-shrink-0">
                {/* Y-Scale Slider */}
                <div className="flex flex-col items-center">
                    <input
                        type="range"
                        min={CHART_CONFIG.Y_AXIS.MIN_SCALE}
                        max={CHART_CONFIG.Y_AXIS.MAX_SCALE}
                        step={CHART_CONFIG.Y_AXIS.SCALE_STEP}
                        value={yAxisMax}
                        onChange={handleYAxisChange}
                        className="w-32 custom-slider"
                        aria-label="Y-Scale"
                    />
                    <span className="text-xs text-visualizer-text-secondary mt-1 font-normal">
                        scale: {yAxisMax.toLocaleString()}
                    </span>
                </div>
                
                {/* Refresh Button */}
                <button
                    onClick={loadChartData}
                    className="w-10 h-10 rounded bg-visualizer-bg-dark hover:bg-visualizer-border-muted transition text-gray-400 hover:text-gray-300 flex items-center justify-center"
                    aria-label="Refresh"
                >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="1 4 1 10 7 10" />
                        <path d="M3.51 15A9 9 0 1 0 5.64 5.64L1 10" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
