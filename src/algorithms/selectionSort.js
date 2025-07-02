// src/algorithms/selectionSort.js
import { BAR_STATES } from '../constants/index.js';
import { sleep } from '../utils/helpers.js';
//import { PerformanceService } from '../services/performanceService.js';

/**
 * Selection Sort with visual animations
 * @param {Array} array - Array to sort
 * @param {Object} animationMethods - Methods from ArrayContainer
 * @param {number} speed - Animation speed in milliseconds
 * @returns {Object} - Sorting metrics
 */
export const selectionSort = async (array, animationMethods, speed = 50) => {
    const sortedArray = [...array];
    let comparisons = 0;
    const n = sortedArray.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        // Highlight current position being filled
        animationMethods.highlightBars([i], BAR_STATES.COMPARING);
        await sleep(speed);
        
        // Find minimum element in remaining unsorted array
        for (let j = i + 1; j < n; j++) {
            // Highlight current element being checked
            animationMethods.highlightBars([j, minIndex], BAR_STATES.COMPARING);
            await sleep(speed);
            
            comparisons++;
            
            if (sortedArray[j] < sortedArray[minIndex]) {
                // Reset previous minimum
                if (minIndex !== i) {
                    animationMethods.resetBarStates([minIndex]);
                }
                minIndex = j;
                // Keep new minimum highlighted
                animationMethods.highlightBars([minIndex], BAR_STATES.HOVER);
            } else {
                // Reset non-minimum element
                animationMethods.resetBarStates([j]);
            }
        }
        
        // Swap if minimum is not at current position
        if (minIndex !== i) {
            // Show swapping animation
            animationMethods.highlightBars([i, minIndex], BAR_STATES.SWAPPING);
            await sleep(speed);
            
            // Perform swap
            animationMethods.swapBars(i, minIndex);
            [sortedArray[i], sortedArray[minIndex]] = [sortedArray[minIndex], sortedArray[i]];
            await sleep(speed);
        }
        
        // Mark current position as sorted
        animationMethods.markAsSorted([i]);
        await sleep(speed / 2);
    }
    
    // Mark last element as sorted
    animationMethods.markAsSorted([n - 1]);
    
/*     // 🔥 DATABASE INTEGRATION - Save performance data
    try {
        await PerformanceService.savePerformanceData(
            'selection_sort',
            array.length,
            comparisons
        );
    } catch (error) {
        console.error('Failed to save Selection Sort performance:', error);
        // Continue gracefully - don't break the sorting experience
    } */
    
    return {
        sortedArray,
        comparisons,
        algorithm: 'Selection Sort'
    };
};
