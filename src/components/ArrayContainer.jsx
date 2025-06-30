// src/components/ArrayContainer.jsx

/* 
    - purpose 
        - dynamic width management 
        bar style management 
        updates the array when soem method like swap used 
        renders bars 
        methods for the sorting functions to manage the animations 
*/



import React, { useState, useRef, useEffect, useCallback } from 'react';
import ArrayBar from './ArrayBar';
import { BAR_STATES, VISUAL_CONFIG, ANIMATION_STATES, ANIMATION_SPEEDS } from '../constants';

const ArrayContainer = ({ 
    array = [], 
    animationState = ANIMATION_STATES.IDLE,
    animationSpeed = ANIMATION_SPEEDS.MEDIUM,
    onAnimationComplete,
    className = ""
}) => {











    //--------
    //container stuff 

    // Reference to the container for responsive 
    const containerRef = useRef(null);

    // State to track current width of the container
    const [containerWidth, setContainerWidth] = useState(VISUAL_CONFIG.CONTAINER.WIDTH);

    // Update container width on resize
    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                //funct to modify 
                setContainerWidth(containerRef.current.offsetWidth);
            }
        };

        updateWidth(); // Initial update

        //listener to update on any change 
        window.addEventListener('resize', updateWidth);

        //remove to prevent mem leaks 
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    //----------------

    // Local display array used for visual changes like swapping
    const [displayArray, setDisplayArray] = useState(array);

    // Sync internal display array when the incoming array prop changes
    useEffect(() => {
        setDisplayArray(array);
    }, [array]);

    //---------
    
    // Bar states: each index has a visual state (e.g., DEFAULT, COMPARING)
    const [barStates, setBarStates] = useState({});

    // Reset bar states when the main array changes
    useEffect(() => {
        const initialStates = {};
        array.forEach((_, index) => {
            initialStates[index] = BAR_STATES.DEFAULT; // Set all bars to default
        });
        setBarStates(initialStates);
    }, [array]);


    //methods for sorting logic animation 

    // Highlight multiple bars with a given state (e.g., COMPARING)
    const highlightBars = useCallback((indices, state = BAR_STATES.COMPARING) => {
        const updates = {};

        //update everything in the indices 
        indices.forEach(index => {
            updates[index] = state;
        });

        //overwrite 
        setBarStates(prev => ({ ...prev, ...updates }));
    }, []); //dont recreate on re render 


    // Reset specific bars, or all bars if no indices given
    const resetBarStates = useCallback((indices = null) => {

        if (indices) {
            const updates = {};
            indices.forEach(index => {
                updates[index] = BAR_STATES.DEFAULT;
            });
            setBarStates(prev => ({ ...prev, ...updates }));
        }
        else {
            // Reset all bars
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
        // Temporarily mark bars as swapping
        setBarStates(prev => ({
            ...prev,
            [index1]: BAR_STATES.SWAPPING,
            [index2]: BAR_STATES.SWAPPING
        }));

        // Swap the values visually
        setDisplayArray(prev => {
            const newArray = [...prev]; // shallow copy
            [newArray[index1], newArray[index2]] = [newArray[index2], newArray[index1]];
            return newArray;
        });
    }, []);

    // Handle clicks on bars (only when idle)
    const handleBarClick = useCallback((index) => {
        if (animationState === ANIMATION_STATES.IDLE) {
            console.log(`Bar clicked: Index ${index}, Value ${displayArray[index]}`);
        }
    }, [animationState, displayArray]);

//----------

    // Is a sorting animation currently active?
    const isSorting = animationState === ANIMATION_STATES.PLAYING;

    // Methods to expose to sorting algorithms (via parent callback)
    const animationMethods = {
        highlightBars,
        resetBarStates,
        markAsSorted,
        swapBars,
        setDisplayArray,
        setBarStates
    };

    // Provide animation methods to parent on mount/update
    useEffect(() => {
        if (onAnimationComplete) {
            onAnimationComplete(animationMethods);
        }
    }, [onAnimationComplete, animationMethods]);




    return (
        <div className={`array-container ${className}`}>
            {/* Container with responsive width tracking */}
            <div 
                ref={containerRef}
                className="w-full min-w-0 p-4 pt-12 bg-visualizer-bg-dark rounded overflow-hidden"
                style={{
                    height: `${VISUAL_CONFIG.CONTAINER.HEIGHT + VISUAL_CONFIG.CONTAINER.PADDING * 2}px`,
                    minHeight: `${VISUAL_CONFIG.CONTAINER.HEIGHT + VISUAL_CONFIG.CONTAINER.PADDING * 2}px`
                }}
            >
                {/* Array render */}
                <div className="flex items-end justify-center gap-0 h-full">
                    {displayArray.length > 0 ? (
                        // Loop array 
                        displayArray.map((value, index) => (
                            <ArrayBar
                                key={`${index}-${value}`} // Key : indx , val pairs
                                value={value}
                                index={index}
                                arraySize={Math.max(...displayArray)} // Largest value for height scaling
                                containerWidth={containerWidth}
                                state={barStates[index] || BAR_STATES.DEFAULT}
                                isSorting={isSorting}
                                onClick={handleBarClick}
                            />
                        ))
                    ) : (
                        // Empty state when array is empty
                        <div className="flex items-center justify-center h-full">
                            <p className="text-visualizer-text-secondary text-lg">
                                Generate an array to start visualizing
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Array info */}
            {displayArray.length > 0 && (
                <div className="text-visualizer-text-secondary text-xs mt-2 text-center">
                    <p>
                        Array Size: {displayArray.length} • 
                        Max Value: {Math.max(...displayArray)} • 
                        Container Width: {containerWidth}px
                        {isSorting && (
                            <span className="text-visualizer-text-accent ml-2">
                                • Sorting in progress...
                            </span>
                        )}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ArrayContainer;
