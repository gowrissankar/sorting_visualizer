// /src/components/SortingVisualizer.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import ArrayContainer from './ArrayContainer';
import { generateArray } from '../utils/helpers.js';
import { ARRAY_CONFIG, ARRAY_GENERATION_TYPES, ANIMATION_STATES, ALGORITHMS } from '../constants/index.js';
import { bubbleSort } from '../algorithms/bubbleSort.js';
import { selectionSort } from '../algorithms/selectionSort.js';
import { insertionSort } from '../algorithms/insertionSort.js';
import { mergeSort } from '../algorithms/mergeSort.js';
import { quickSort } from '../algorithms/quickSort.js';
import '../styles/sliders.css'; // Import custom slider styles

const algorithmMap = {
    [ALGORITHMS.BUBBLE_SORT]: { name: 'Bubble Sort', func: bubbleSort },
    [ALGORITHMS.SELECTION_SORT]: { name: 'Selection Sort', func: selectionSort },
    [ALGORITHMS.INSERTION_SORT]: { name: 'Insertion Sort', func: insertionSort },
    [ALGORITHMS.MERGE_SORT]: { name: 'Merge Sort', func: mergeSort },
    [ALGORITHMS.QUICK_SORT]: { name: 'Quick Sort', func: quickSort }
};

const SortingVisualizer = ({ activeAlgorithm, onAlgorithmChange, onSortingComplete }) => {
    const [array, setArray] = useState([]);
    const [arraySize, setArraySize] = useState(ARRAY_CONFIG.DEFAULT_SIZE);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(activeAlgorithm || ALGORITHMS.BUBBLE_SORT);
    const [animationState, setAnimationState] = useState(ANIMATION_STATES.IDLE);
    const [animationSpeed, setAnimationSpeed] = useState(3);
    const [animationMethods, setAnimationMethods] = useState(null);

    const isSorting = useRef(false);
    const sortingAborted = useRef(false);
    const speedRef = useRef(3);

    // Sync with navbar algorithm changes
    useEffect(() => {
        if (activeAlgorithm && activeAlgorithm !== selectedAlgorithm) {
            console.log('Algorithm changed from navbar:', activeAlgorithm);
            setSelectedAlgorithm(activeAlgorithm);
        }
    }, [activeAlgorithm]);

    // Update speed ref when speed changes
    useEffect(() => {
        speedRef.current = animationSpeed;
    }, [animationSpeed]);

    // Generate Fisher-Yates shuffled sequential arrays
    useEffect(() => {
        if (animationState === ANIMATION_STATES.IDLE) {
            // Use SEQUENTIAL (Fisher-Yates shuffled) - all values 1-N in random positions
            const newArray = generateArray(arraySize, ARRAY_GENERATION_TYPES.SEQUENTIAL);
            setArray(newArray);
        }
    }, [arraySize, animationState]);

    const handleSizeChange = (e) => {
        if (animationState === ANIMATION_STATES.IDLE) {
            setArraySize(parseInt(e.target.value));
        }
    };

    const handleSpeedChange = (e) => {
        console.log('Speed changing from', animationSpeed, 'to', e.target.value);
        setAnimationSpeed(parseInt(e.target.value));
    };

    const handleShuffle = () => {
        if (animationState === ANIMATION_STATES.IDLE) {
            // Generate new Fisher-Yates shuffled sequential array
            setArray(generateArray(arraySize, ARRAY_GENERATION_TYPES.SEQUENTIAL));
        }
    };

    const handlePlay = () => {
        if (animationState === ANIMATION_STATES.IDLE) {
            sortingAborted.current = false;
            startSorting();
        }
    };

    const handleReset = () => {
        console.log('Reset button clicked - stopping animation');
        
        // Immediately stop any running animation
        sortingAborted.current = true;
        isSorting.current = false;
        
        // Force stop the animation state immediately
        setAnimationState(ANIMATION_STATES.IDLE);
        
        // Reset animation methods and clear all bar states
        if (animationMethods) {
            animationMethods.resetBarStates();
        }
        
        // Generate new Fisher-Yates shuffled sequential array
        const newArray = generateArray(arraySize, ARRAY_GENERATION_TYPES.SEQUENTIAL);
        setArray(newArray);
    };

    // Simple animation methods callback
    const handleAnimationMethodsReady = useCallback((methods) => {
        if (!animationMethods) {
            setAnimationMethods(methods);
        }
    }, [animationMethods]);

    const startSorting = async () => {
        if (!animationMethods || animationState !== ANIMATION_STATES.IDLE || isSorting.current) {
            return;
        }

        isSorting.current = true;
        setAnimationState(ANIMATION_STATES.PLAYING);

        try {
            const algorithmFunc = algorithmMap[selectedAlgorithm].func;
            
            // Pass function that returns current speed for dynamic updates
            const getSpeed = () => {
                // Convert slider value (1-5) to milliseconds (500ms to 50ms)
                const speedMap = { 1: 500, 2: 300, 3: 150, 4: 75, 5: 25 };
                return speedMap[speedRef.current] || 150;
            };
            
            const result = await algorithmFunc([...array], animationMethods, getSpeed, sortingAborted);
            
            // Only complete if not aborted
            if (!sortingAborted.current) {
                setAnimationState(ANIMATION_STATES.COMPLETED);

                // AUTO-SCROLL TO CHART
                setTimeout(() => {
                    const chartElement = document.querySelector('.min-h-96'); // Target the chart container
                    if (chartElement) {
                        chartElement.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start' 
                        });
                    }
                }, 500); // Small delay to let sorting animation finish

                // Delay the update of user run point by 1 second after scroll
                setTimeout(() => {
                    if (onSortingComplete) {
                        onSortingComplete({
                            algorithm: selectedAlgorithm,
                            size: array.length,
                            comparisons: result.comparisons
                        });
                    }
                }, 1500); // 1 second after scroll
            }
        } catch (error) {
            if (!sortingAborted.current) {
                console.error('Sorting error:', error);
                setAnimationState(ANIMATION_STATES.IDLE);
            }
        } finally {
            isSorting.current = false;
        }
    };

    // Check if controls should be disabled
    const isPlaying = animationState === ANIMATION_STATES.PLAYING;
    const isIdle = animationState === ANIMATION_STATES.IDLE;

    return (
        <div className="w-full h-full flex flex-col gap-6">
            {/* Bars Card */}
            <div className="bg-visualizer-bg-secondary rounded-xl shadow-lg p-6 flex-1 min-h-80">
                <div className="w-full h-full flex items-end justify-center overflow-hidden">
                    <ArrayContainer
                        array={array}
                        animationState={animationState}
                        onAnimationComplete={handleAnimationMethodsReady}
                    />
                </div>
            </div>

            {/* Controls Card - Responsive layout */}
            <div className="bg-visualizer-bg-secondary rounded-xl shadow-lg p-6 flex-shrink-0">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center">
                    {/* Sliders Container */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
                        {/* Size Slider */}
                        <div className="flex flex-col items-center">
                            <input
                                type="range"
                                min={ARRAY_CONFIG.MIN_SIZE}
                                max={ARRAY_CONFIG.MAX_SIZE}
                                value={arraySize}
                                onChange={handleSizeChange}
                                disabled={!isIdle}
                                className="w-32 custom-slider disabled:opacity-50"
                                aria-label="Array Size"
                            />
                            <span className="text-xs text-visualizer-text-secondary mt-1 font-normal">
                                size: {arraySize}
                            </span>
                        </div>

                        {/* Speed Slider */}
                        <div className="flex flex-col items-center">
                            <input
                                type="range"
                                min="1"
                                max="5"
                                step="1"
                                value={animationSpeed}
                                onChange={handleSpeedChange}
                                className="w-32 custom-slider"
                                aria-label="Speed"
                            />
                            <span className="text-xs text-visualizer-text-secondary mt-1 font-normal">
                                speed: {animationSpeed}
                            </span>
                        </div>
                    </div>

                    {/* Control Buttons Container - Stays contained */}
                    <div className="flex gap-3 items-center flex-shrink-0">
                        {/* Shuffle */}
                        <button
                            onClick={handleShuffle}
                            disabled={!isIdle}
                            className="w-12 h-12 flex items-center justify-center rounded-lg bg-visualizer-bg-dark hover:bg-visualizer-border-muted text-gray-400 hover:text-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Shuffle"
                        >
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="16 3 21 3 21 8" />
                                <line x1="21" y1="3" x2="12" y2="12" />
                                <polyline points="8 21 3 21 3 16" />
                                <line x1="3" y1="21" x2="12" y2="12" />
                            </svg>
                        </button>

                        {/* Play */}
                        <button
                            onClick={handlePlay}
                            disabled={!animationMethods || !isIdle}
                            className="w-12 h-12 flex items-center justify-center rounded-lg bg-visualizer-bg-dark hover:bg-visualizer-border-muted text-gray-400 hover:text-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Play"
                        >
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                <polygon points="7 5 19 12 7 19" />
                            </svg>
                        </button>

                        {/* Reset */}
                        <button
                            onClick={handleReset}
                            disabled={isIdle}
                            className="w-12 h-12 flex items-center justify-center rounded-lg bg-visualizer-bg-dark hover:bg-visualizer-border-muted text-gray-400 hover:text-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Reset"
                        >
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="1 4 1 10 7 10" />
                                <path d="M3.51 15A9 9 0 1 0 5.64 5.64L1 10" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SortingVisualizer;
