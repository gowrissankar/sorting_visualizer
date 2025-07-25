// /src/components/ArrayContainer.jsx

import React, { useState, useRef, useEffect, useCallback } from 'react';
import ArrayBar from './ArrayBar';
import { BAR_STATES, VISUAL_CONFIG, ANIMATION_STATES, ANIMATION_SPEEDS } from '../constants/index.js';

const ArrayContainer = ({
    array = [],
    animationState = ANIMATION_STATES.IDLE,
    animationSpeed = ANIMATION_SPEEDS.MEDIUM,
    onAnimationComplete,
    className = ""
}) => {
    // Reference to the container for responsive
    const containerRef = useRef(null);

    // State to track current width of the container
    const [containerWidth, setContainerWidth] = useState(VISUAL_CONFIG.CONTAINER.WIDTH);

    // Pause/Step control
    const [isPaused, setIsPaused] = useState(false);
    const [stepMode, setStepMode] = useState(false);
    const pauseResolve = useRef(null);

    // Update container width on resize
    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
        };

        updateWidth(); // Initial update
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    // Local display array used for visual changes like swapping
    const [displayArray, setDisplayArray] = useState(array);

    // Sync internal display array when the incoming array prop changes
    useEffect(() => {
        setDisplayArray(array);
    }, [array]);

    // Bar states: each index has a visual state (e.g., DEFAULT, COMPARING)
    const [barStates, setBarStates] = useState({});

    // Reset bar states when the main array changes
    useEffect(() => {
        const initialStates = {};
        array.forEach((_, index) => {
            initialStates[index] = BAR_STATES.DEFAULT;
        });
        setBarStates(initialStates);
    }, [array]);

    // Highlight multiple bars with a given state (e.g., COMPARING)
    const highlightBars = useCallback((indices, state = BAR_STATES.COMPARING) => {
        const updates = {};
        indices.forEach(index => {
            updates[index] = state;
        });
        setBarStates(prev => ({ ...prev, ...updates }));
    }, []);

    // Reset specific bars, or all bars if no indices given
    const resetBarStates = useCallback((indices = null) => {
        if (indices) {
            const updates = {};
            indices.forEach(index => {
                updates[index] = BAR_STATES.DEFAULT;
            });
            setBarStates(prev => ({ ...prev, ...updates }));
        } else {
            const resetStates = {};
            displayArray.forEach((_, index) => {
                resetStates[index] = BAR_STATES.DEFAULT;
            });
            setBarStates(resetStates);
        }
    }, [displayArray]);

    // Mark selected bars as SORTED
    const markAsSorted = useCallback((indices) => {
        const updates = {};
        indices.forEach(index => {
            updates[index] = BAR_STATES.SORTED;
        });
        setBarStates(prev => ({ ...prev, ...updates }));
    }, []);

    // Swap the values of two bars in displayArray and mark them as SWAPPING
    const swapBars = useCallback((index1, index2) => {
        setBarStates(prev => ({
            ...prev,
            [index1]: BAR_STATES.SWAPPING,
            [index2]: BAR_STATES.SWAPPING
        }));

        setDisplayArray(prev => {
            const newArray = [...prev];
            [newArray[index1], newArray[index2]] = [newArray[index2], newArray[index1]];
            return newArray;
        });
    }, []);

    // Pause/Resume functionality
    const pauseAnimation = useCallback(() => {
        setIsPaused(true);
    }, []);

    const resumeAnimation = useCallback(() => {
        setIsPaused(false);
        if (pauseResolve.current) {
            pauseResolve.current();
            pauseResolve.current = null;
        }
    }, []);

    const stepForward = useCallback(() => {
        if (pauseResolve.current) {
            pauseResolve.current();
            pauseResolve.current = null;
        }
    }, []);

    const waitForResume = useCallback(() => {
        return new Promise((resolve) => {
            pauseResolve.current = resolve;
        });
    }, []);

    const checkPaused = useCallback(() => {
        return isPaused;
    }, [isPaused]);

    // Handle clicks on bars (only when idle)
    const handleBarClick = useCallback((index) => {
        if (animationState === ANIMATION_STATES.IDLE) {
            // Optionally handle bar click (for future features)
        }
    }, [animationState, displayArray]);

    // Is a sorting animation currently active?
    const isSorting = animationState === ANIMATION_STATES.PLAYING;

    // Methods to expose to sorting algorithms (via parent callback)
    const animationMethods = {
        highlightBars,
        resetBarStates,
        markAsSorted,
        swapBars,
        setDisplayArray,
        setBarStates,
        // Pause/Step methods
        pauseAnimation,
        resumeAnimation,
        stepForward,
        waitForResume,
        isPaused: checkPaused
    };

    // Provide animation methods to parent on mount/update
    useEffect(() => {
        if (onAnimationComplete) {
            onAnimationComplete(animationMethods);
        }
    }, [onAnimationComplete, animationMethods]);

    return (
        <div className={`array-container ${className} w-full h-full`}>
            {/* Responsive container, transparent background since it's inside a card */}
            <div
                ref={containerRef}
                className="w-full h-full flex-1 flex items-end justify-center overflow-hidden"
                style={{
                    minHeight: `${VISUAL_CONFIG.CONTAINER.HEIGHT}px`
                }}
            >
                {/* Array render */}
                <div className="flex-1 flex items-end justify-center gap-0 h-full w-full">
                    {displayArray.length > 0 ? (
                        displayArray.map((value, index) => (
                            <ArrayBar
                                key={`${index}-${value}`}
                                value={value}
                                index={index}
                                arraySize={Math.max(...displayArray)}
                                containerWidth={containerWidth}
                                state={barStates[index] || BAR_STATES.DEFAULT}
                                isSorting={isSorting}
                                onClick={handleBarClick}
                            />
                        ))
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default ArrayContainer;
