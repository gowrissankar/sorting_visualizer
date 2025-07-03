// src/algorithms/insertionSort.js
import { BAR_STATES } from '../constants/index.js';
import { sleep } from '../utils/helpers.js';
import { PerformanceService } from '../services/performanceService.js';

export const insertionSort = async (array, animationMethods, getSpeed, abortRef) => {
    const sortedArray = [...array];
    let comparisons = 0;
    const n = sortedArray.length;
    
    // Mark first element as sorted
    animationMethods.markAsSorted([0]);
    await sleep(getSpeed());
    
    for (let i = 1; i < n; i++) {
        // Check if sorting was aborted
        if (abortRef && abortRef.current) {
            return { sortedArray, comparisons, algorithm: 'Insertion Sort' };
        }

        let key = sortedArray[i];
        let j = i - 1;
        
        // Highlight element to be inserted
        animationMethods.highlightBars([i], BAR_STATES.COMPARING);
        await sleep(getSpeed());
        
        // Move elements that are greater than key one position ahead
        while (j >= 0) {
            // Check if sorting was aborted
            if (abortRef && abortRef.current) {
                return { sortedArray, comparisons, algorithm: 'Insertion Sort' };
            }

            // Highlight comparison
            animationMethods.highlightBars([j, i], BAR_STATES.COMPARING);
            await sleep(getSpeed());
            
            comparisons++;
            
            if (sortedArray[j] > key) {
                // Show shifting animation
                animationMethods.highlightBars([j, j + 1], BAR_STATES.SWAPPING);
                await sleep(getSpeed());
                
                // Shift element
                sortedArray[j + 1] = sortedArray[j];
                animationMethods.swapBars(j, j + 1);
                await sleep(getSpeed());
                
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
        await sleep(getSpeed() / 2);
    }
    
    // Database save
    try {
        await PerformanceService.savePerformanceData(
            'insertion_sort',
            array.length,
            comparisons
        );
    } catch (error) {
        console.error('Failed to save Insertion Sort performance:', error);
    }
    
    return {
        sortedArray,
        comparisons,
        algorithm: 'Insertion Sort'
    };
};
