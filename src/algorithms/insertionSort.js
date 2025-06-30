// src/algorithms/insertionSort.js
import { BAR_STATES } from '../constants';
import { sleep } from '../utils/helpers';

/**
 * Insertion Sort with visual animations
 * @param {Array} array - Array to sort
 * @param {Object} animationMethods - Methods from ArrayContainer
 * @param {number} speed - Animation speed in milliseconds
 * @returns {Object} - Sorting metrics
 */
export const insertionSort = async (array, animationMethods, speed = 50) => {
    const sortedArray = [...array];
    let comparisons = 0;
    const n = sortedArray.length;
    
    // Mark first element as sorted
    animationMethods.markAsSorted([0]);
    await sleep(speed);
    
    for (let i = 1; i < n; i++) {
        let key = sortedArray[i];
        let j = i - 1;
        
        // Highlight element to be inserted
        animationMethods.highlightBars([i], BAR_STATES.COMPARING);
        await sleep(speed);
        
        // Move elements that are greater than key one position ahead
        while (j >= 0) {
            // Highlight comparison
            animationMethods.highlightBars([j, i], BAR_STATES.COMPARING);
            await sleep(speed);
            
            comparisons++;
            
            if (sortedArray[j] > key) {
                // Show shifting animation
                animationMethods.highlightBars([j, j + 1], BAR_STATES.SWAPPING);
                await sleep(speed);
                
                // Shift element
                sortedArray[j + 1] = sortedArray[j];
                animationMethods.swapBars(j, j + 1);
                await sleep(speed);
                
                j--;
            } else {
                break;
            }
            
            // Reset comparison highlighting
            animationMethods.resetBarStates([j + 1]);
        }
        
        // Insert key at correct position
        sortedArray[j + 1] = key;
        
        // Mark newly sorted section
        const sortedIndices = [];
        for (let k = 0; k <= i; k++) {
            sortedIndices.push(k);
        }
        animationMethods.markAsSorted(sortedIndices);
        await sleep(speed / 2);
    }
    
    return {
        sortedArray,
        comparisons,
        algorithm: 'Insertion Sort'
    };
};
