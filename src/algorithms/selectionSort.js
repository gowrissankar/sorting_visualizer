// src/algorithms/selectionSort.js
import { BAR_STATES } from '../constants/index.js';
import { sleep } from '../utils/helpers.js';
import { PerformanceService } from '../services/performanceService.js';

export const selectionSort = async (array, animationMethods, getSpeed, abortRef) => {
    const sortedArray = [...array];
    let comparisons = 0;
    const n = sortedArray.length;
    
    for (let i = 0; i < n - 1; i++) {
        // Check if sorting was aborted
        if (abortRef && abortRef.current) {
            return { sortedArray, comparisons, algorithm: 'Selection Sort' };
        }

        let minIndex = i;
        
        // Highlight current position being filled
        animationMethods.highlightBars([i], BAR_STATES.COMPARING);
        await sleep(getSpeed());
        
        // Find minimum element in remaining unsorted array
        for (let j = i + 1; j < n; j++) {
            // Check if sorting was aborted
            if (abortRef && abortRef.current) {
                return { sortedArray, comparisons, algorithm: 'Selection Sort' };
            }

            // Highlight current element being checked
            animationMethods.highlightBars([j, minIndex], BAR_STATES.COMPARING);
            await sleep(getSpeed());
            
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
            await sleep(getSpeed());
            
            // Perform swap
            animationMethods.swapBars(i, minIndex);
            [sortedArray[i], sortedArray[minIndex]] = [sortedArray[minIndex], sortedArray[i]];
            await sleep(getSpeed());
        }
        
        // Mark current position as sorted
        animationMethods.markAsSorted([i]);
        await sleep(getSpeed() / 2);
    }
    
    // Mark last element as sorted
    animationMethods.markAsSorted([n - 1]);
    
    // Database save
    try {
        await PerformanceService.savePerformanceData(
            'selection_sort',
            array.length,
            comparisons
        );
    } catch (error) {
        console.error('Failed to save Selection Sort performance:', error);
    }
    
    return {
        sortedArray,
        comparisons,
        algorithm: 'Selection Sort'
    };
};
