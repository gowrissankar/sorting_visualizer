// src/components/PerformanceChart.jsx
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Legend,
} from 'chart.js';
import { PerformanceService } from '../services/performanceService.js';
import { CHART_CONFIG, CHART_COLORS, CHART_STYLES, ALGORITHM_NAMES } from '../constants/chartConstants';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Legend);

export default function PerformanceChart({ selectedAlgorithm, lastRunData }) {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [yAxisMax, setYAxisMax] = useState(CHART_CONFIG.Y_AXIS.DEFAULT_SCALE);

    useEffect(() => {
        loadChartData();
    }, [selectedAlgorithm]);

    useEffect(() => {
        if (chartData && lastRunData) {
            updateUserRunPoint();
        }
    }, [lastRunData]);

    const loadChartData = async () => {
        try {
            setLoading(true);
            const data = await PerformanceService.getAllPerformanceData();
            const transformed = transformToChartData(data, selectedAlgorithm);
            setChartData(transformed);
        } catch (error) {
            console.error('Failed to load chart data:', error);
        } finally {
            setLoading(false);
        }
    };

    const transformToChartData = (data, selectedAlgo) => {
        // Group by algorithm key
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

        // Build datasets for all algorithms present in DB/constants
        const datasets = Object.entries(algorithms).map(([algo, points]) => {
            const isSelected = algo === selectedAlgo;
            const algorithmColor = CHART_COLORS.ALGORITHMS[algo] || CHART_COLORS.USER_RUN;
            return {
                label: ALGORITHM_NAMES[algo] || algo,
                data: points,
                borderColor: isSelected ? CHART_COLORS.CURRENT_ALGORITHM : algorithmColor,
                backgroundColor: 'transparent',
                tension: CHART_STYLES.ALGORITHM_LINE.TENSION,
                pointRadius: 0,
                pointHoverRadius: 0,
                borderWidth: isSelected ? 3 : CHART_STYLES.ALGORITHM_LINE.BORDER_WIDTH,
                order: isSelected ? 1 : 2,
                pointHitRadius: 0
            };
        });

        // Add user run dataset (teal dot)
        datasets.push({
            label: 'user_run',
            data: [],
            pointBackgroundColor: CHART_COLORS.CURRENT_ALGORITHM,
            pointBorderColor: CHART_COLORS.CURRENT_ALGORITHM,
            pointBorderWidth: 0,
            pointRadius: 6,
            pointHoverRadius: 6,
            showLine: false,
            order: -1,
            pointStyle: 'circle',
            tension: 0,
            pointHitRadius: 0
        });

        return { datasets };
    };

    // Only update user run point
    const updateUserRunPoint = () => {
        setChartData(prevChartData => {
            if (!prevChartData) return prevChartData;
            return {
                ...prevChartData,
                datasets: prevChartData.datasets.map(dataset =>
                    dataset.label === 'user_run'
                        ? {
                            ...dataset,
                            data: lastRunData ? [{ x: lastRunData.size, y: lastRunData.comparisons }] : []
                        }
                        : dataset
                )
            };
        });
    };

    const handleYAxisChange = (e) => {
        setYAxisMax(parseInt(e.target.value));
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: '📊 Algorithm Performance Analysis',
                color: CHART_COLORS.TEXT_PRIMARY,
                font: { size: 16, weight: 'bold' }
            },
            legend: {
                labels: { 
                    color: CHART_COLORS.TEXT_PRIMARY, 
                    font: { size: 12 },
                    filter: (legendItem) => legendItem.text !== 'user_run'
                }
            },
            tooltip: { enabled: false }
        },
        scales: {
            x: {
                type: 'linear',
                min: 10,
                max: 100,
                title: {
                    display: true,
                    text: 'Array Size',
                    color: CHART_COLORS.TEXT_PRIMARY,
                    font: { size: 12, weight: 'bold' }
                },
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
                title: {
                    display: true,
                    text: 'Comparisons',
                    color: CHART_COLORS.TEXT_PRIMARY,
                    font: { size: 12, weight: 'bold' }
                },
                ticks: { 
                    color: CHART_COLORS.TEXT_SECONDARY,
                    font: { size: 12 },
                    stepSize: Math.ceil(yAxisMax / 10)
                },
                grid: { color: CHART_COLORS.GRID }
            }
        }
    };

    return (
        <div className="bg-visualizer-bg-secondary p-6 rounded-lg mb-6">
            {/* Header with algorithm indicator */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
                <div className="flex items-center gap-4">
                    <h3 className="text-lg font-semibold text-visualizer-text-primary">
                        Performance Analysis
                    </h3>
                    <div className="flex items-center gap-2">
                        <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: CHART_COLORS.CURRENT_ALGORITHM }}
                        ></div>
                        <span className="text-sm text-visualizer-text-primary">
                            {ALGORITHM_NAMES[selectedAlgorithm] || 'Unknown'}
                        </span>
                    </div>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <label className="text-visualizer-text-primary text-sm font-medium">
                            Y-Scale: 
                            <span className="text-visualizer-text-accent font-bold ml-1">
                                {yAxisMax.toLocaleString()}
                            </span>
                        </label>
                        <input
                            type="range"
                            min={CHART_CONFIG.Y_AXIS.MIN_SCALE}
                            max={CHART_CONFIG.Y_AXIS.MAX_SCALE}
                            step={CHART_CONFIG.Y_AXIS.SCALE_STEP}
                            value={yAxisMax}
                            onChange={handleYAxisChange}
                            className="w-32 h-2 bg-visualizer-bg-dark rounded-lg appearance-none cursor-pointer slider-thumb"
                        />
                    </div>
                    
                    <button 
                        onClick={loadChartData}
                        className="px-3 py-1 text-sm bg-visualizer-bg-dark text-visualizer-text-secondary rounded hover:bg-visualizer-bg-primary"
                    >
                        🔄 Refresh
                    </button>
                </div>
            </div>
            
            {/* Chart container */}
            <div style={{ height: CHART_CONFIG.CONTAINER.HEIGHT }}>
                {loading ? (
                    <div className="flex items-center justify-center h-full text-visualizer-text-primary">
                        Loading performance data...
                    </div>
                ) : chartData && chartData.datasets.length > 0 ? (
                    <Line data={chartData} options={options} />
                ) : (
                    <div className="flex items-center justify-center h-full text-visualizer-text-secondary">
                        No performance data available. Run some sorting algorithms to see comparisons!
                    </div>
                )}
            </div>
            
            <div className="mt-2 text-xs text-visualizer-text-secondary text-center">
                Clean static curves • Teal dot = your last run • Y-scale persists across updates
            </div>
        </div>
    );
}
