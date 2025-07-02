// src/components/SortingVisualizer.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import ArrayContainer from './ArrayContainer';
import { generateArray } from '../utils/helpers.js';
import { ARRAY_CONFIG, ARRAY_GENERATION_TYPES, ANIMATION_STATES, ANIMATION_SPEEDS, ALGORITHMS } from '../constants/index.js';
import { bubbleSort } from '../algorithms/bubbleSort.js';
import { selectionSort } from '../algorithms/selectionSort.js';
import { insertionSort } from '../algorithms/insertionSort.js';
import { mergeSort } from '../algorithms/mergeSort.js';
import { quickSort } from '../algorithms/quickSort.js';

const algorithmMap = {
    [ALGORITHMS.BUBBLE_SORT]: { name: 'Bubble Sort', func: bubbleSort },
    [ALGORITHMS.SELECTION_SORT]: { name: 'Selection Sort', func: selectionSort },
    [ALGORITHMS.INSERTION_SORT]: { name: 'Insertion Sort', func: insertionSort },
    [ALGORITHMS.MERGE_SORT]: { name: 'Merge Sort', func: mergeSort },
    [ALGORITHMS.QUICK_SORT]: { name: 'Quick Sort', func: quickSort }
};

const SortingVisualizer = ({ onAlgorithmChange, onSortingComplete }) => {
    const [array, setArray] = useState([]);
    const [arraySize, setArraySize] = useState(ARRAY_CONFIG.DEFAULT_SIZE);
    const [generationType, setGenerationType] = useState(ARRAY_GENERATION_TYPES.SEQUENTIAL);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(ALGORITHMS.BUBBLE_SORT);
    const [animationState, setAnimationState] = useState(ANIMATION_STATES.IDLE);
    const [animationSpeed, setAnimationSpeed] = useState(ANIMATION_SPEEDS.MEDIUM);
    const [animationMethods, setAnimationMethods] = useState(null);
    const [performanceStats, setPerformanceStats] = useState({
        comparisons: 0,
        algorithm: '',
        executionTime: 0
    });

    // Execution guard to prevent double runs (works even in React Strict Mode)
    const isSorting = useRef(false);

    useEffect(() => {
        if (animationState === ANIMATION_STATES.IDLE) {
            const newArray = generateArray(arraySize, generationType);
            setArray(newArray);
            setPerformanceStats({
                comparisons: 0,
                algorithm: '',
                executionTime: 0
            });
        }
    }, [arraySize, generationType, animationState]);

    const handleSizeChange = (e) => {
        if (animationState === ANIMATION_STATES.IDLE) {
            setArraySize(parseInt(e.target.value));
        }
    };

    const handleTypeChange = (type) => {
        if (animationState === ANIMATION_STATES.IDLE) {
            setGenerationType(type);
        }
    };

    const handleAlgorithmChange = (algorithm) => {
        if (animationState === ANIMATION_STATES.IDLE) {
            setSelectedAlgorithm(algorithm);
            if (onAlgorithmChange) {
                onAlgorithmChange(algorithm);
            }
        }
    };

    const handleAnimationMethodsReady = useCallback((methods) => {
        if (!animationMethods) {
            setAnimationMethods(methods);
        }
    }, [animationMethods]);

    // Main sorting trigger with execution guard
    const startSorting = async () => {
        if (
            !animationMethods ||
            animationState !== ANIMATION_STATES.IDLE ||
            isSorting.current
        ) return;

        isSorting.current = true; // Set guard
        setAnimationState(ANIMATION_STATES.PLAYING);
        const startTime = performance.now();

        try {
            const algorithmFunc = algorithmMap[selectedAlgorithm].func;
            const result = await algorithmFunc([...array], animationMethods, animationSpeed);

            const endTime = performance.now();
            const performanceData = {
                comparisons: result.comparisons,
                algorithm: result.algorithm,
                executionTime: endTime - startTime
            };

            setPerformanceStats(performanceData);
            setAnimationState(ANIMATION_STATES.COMPLETED);

            if (onSortingComplete) {
                onSortingComplete({
                    algorithm: result.algorithm,
                    arraySize: array.length,
                    comparisons: result.comparisons,
                    executionTime: performanceData.executionTime
                });
            }

        } catch (error) {
            console.error('Sorting error:', error);
            setAnimationState(ANIMATION_STATES.IDLE);
        } finally {
            isSorting.current = false; // Release guard
        }
    };

    const resetSorting = () => {
        if (animationMethods) {
            animationMethods.resetBarStates();
        }
        setAnimationState(ANIMATION_STATES.IDLE);
        setPerformanceStats({
            comparisons: 0,
            algorithm: '',
            executionTime: 0
        });
    };

    return (
        <div className="sorting-visualizer p-6 bg-visualizer-bg-secondary rounded-lg">
            {/* Controls */}
            <div className="controls mb-6">
                <div className="flex flex-wrap gap-6 items-center justify-center mb-4">
                    {/* Array Size Slider */}
                    <div className="flex items-center gap-3">
                        <label className="text-visualizer-text-primary text-sm font-medium">
                            Array Size: 
                            <span className="text-visualizer-text-accent font-bold ml-1">
                                {arraySize}
                            </span>
                        </label>
                        <input
                            type="range"
                            min={ARRAY_CONFIG.MIN_SIZE}
                            max={ARRAY_CONFIG.MAX_SIZE}
                            value={arraySize}
                            onChange={handleSizeChange}
                            disabled={animationState !== ANIMATION_STATES.IDLE}
                            className="w-32 h-2 bg-visualizer-bg-dark rounded-lg appearance-none cursor-pointer slider-thumb"
                        />
                    </div>
                    
                    {/* Generation Type Toggle */}
                    <div className="flex items-center gap-2">
                        <span className="text-visualizer-text-primary text-sm">Type:</span>
                        <div className="flex bg-visualizer-bg-dark rounded-lg p-1">
                            <button
                                onClick={() => handleTypeChange(ARRAY_GENERATION_TYPES.SEQUENTIAL)}
                                disabled={animationState !== ANIMATION_STATES.IDLE}
                                className={`px-3 py-1 rounded text-sm transition-colors ${
                                    generationType === ARRAY_GENERATION_TYPES.SEQUENTIAL
                                        ? 'bg-visualizer-text-accent text-visualizer-bg-primary font-medium'
                                        : 'text-visualizer-text-secondary hover:text-visualizer-text-primary'
                                }`}
                            >
                                Sequential
                            </button>
                            <button
                                onClick={() => handleTypeChange(ARRAY_GENERATION_TYPES.RANDOM)}
                                disabled={animationState !== ANIMATION_STATES.IDLE}
                                className={`px-3 py-1 rounded text-sm transition-colors ${
                                    generationType === ARRAY_GENERATION_TYPES.RANDOM
                                        ? 'bg-visualizer-text-accent text-visualizer-bg-primary font-medium'
                                        : 'text-visualizer-text-secondary hover:text-visualizer-text-primary'
                                }`}
                            >
                                Random
                            </button>
                        </div>
                    </div>
                    
                    {/* Speed Control */}
                    <div className="flex items-center gap-2">
                        <span className="text-visualizer-text-primary text-sm">Speed:</span>
                        <select
                            value={animationSpeed}
                            onChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
                            disabled={animationState === ANIMATION_STATES.PLAYING}
                            className="bg-visualizer-bg-dark text-visualizer-text-primary px-2 py-1 rounded text-sm"
                        >
                            <option value={ANIMATION_SPEEDS.SLOW}>Slow</option>
                            <option value={ANIMATION_SPEEDS.MEDIUM}>Medium</option>
                            <option value={ANIMATION_SPEEDS.FAST}>Fast</option>
                            <option value={ANIMATION_SPEEDS.VERY_FAST}>Very Fast</option>
                            <option value={ANIMATION_SPEEDS.INSTANT}>Instant</option>
                        </select>
                    </div>
                </div>
                
                {/* Algorithm Selection */}
                <div className="flex flex-wrap gap-4 items-center justify-center mb-4">
                    <div className="flex items-center gap-2">
                        <span className="text-visualizer-text-primary text-sm">Algorithm:</span>
                        <select
                            value={selectedAlgorithm}
                            onChange={(e) => handleAlgorithmChange(e.target.value)}
                            disabled={animationState === ANIMATION_STATES.PLAYING}
                            className="bg-visualizer-bg-dark text-visualizer-text-primary px-3 py-1 rounded text-sm"
                        >
                            {Object.entries(algorithmMap).map(([key, algo]) => (
                                <option key={key} value={key}>
                                    {algo.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                
                {/* Sorting Controls */}
                <div className="flex gap-4 items-center justify-center">
                    <button
                        onClick={startSorting}
                        disabled={animationState !== ANIMATION_STATES.IDLE || !animationMethods}
                        className="px-6 py-2 bg-visualizer-text-accent text-visualizer-bg-primary rounded font-medium hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {animationState === ANIMATION_STATES.PLAYING 
                            ? `Sorting with ${algorithmMap[selectedAlgorithm].name}...` 
                            : `Start ${algorithmMap[selectedAlgorithm].name}`
                        }
                    </button>
                    
                    <button
                        onClick={resetSorting}
                        disabled={animationState === ANIMATION_STATES.PLAYING}
                        className="px-4 py-2 bg-visualizer-bg-dark text-visualizer-text-primary rounded hover:bg-visualizer-bg-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Reset
                    </button>
                </div>
                
                {/* Performance Stats */}
                {performanceStats.comparisons > 0 && (
                    <div className="mt-4 text-center">
                        <div className="inline-block bg-visualizer-bg-dark px-4 py-2 rounded">
                            <p className="text-visualizer-text-accent font-medium">
                                {performanceStats.algorithm}
                            </p>
                            <p className="text-visualizer-text-primary text-sm">
                                Comparisons: <span className="text-visualizer-text-accent font-bold">
                                    {performanceStats.comparisons.toLocaleString()}
                                </span>
                            </p>
                            <p className="text-visualizer-text-secondary text-xs">
                                Execution Time: {performanceStats.executionTime.toFixed(0)}ms
                            </p>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Array Container */}
            <ArrayContainer
                array={array}
                animationState={animationState}
                onAnimationComplete={handleAnimationMethodsReady}
            />
        </div>
    );
};

export default SortingVisualizer;
