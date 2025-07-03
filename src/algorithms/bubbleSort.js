// src/algorithms/bubbleSort.js
import { BAR_STATES } from '../constants/index.js';  
import { sleep } from '../utils/helpers.js';
import { PerformanceService } from '../services/performanceService.js';

export const bubbleSort = async (array, animationMethods, getSpeed, abortRef) => {
    const sortedArray = [...array]; 
    let comparisons = 0;
    const n = sortedArray.length;

    for (let i = 0; i < n - 1; i++) {
        // Check if sorting was aborted
        if (abortRef && abortRef.current) {
            return { sortedArray, comparisons, algorithm: 'Bubble Sort' };
        }

        let swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            // Check if sorting was aborted
            if (abortRef && abortRef.current) {
                return { sortedArray, comparisons, algorithm: 'Bubble Sort' };
            }

            // Highlight compared bars 
            animationMethods.highlightBars([j, j + 1], BAR_STATES.COMPARING);
            await sleep(getSpeed());

            comparisons++;

            if (sortedArray[j] > sortedArray[j + 1]) {
                // Swap animation
                animationMethods.highlightBars([j, j + 1], BAR_STATES.SWAPPING);
                await sleep(getSpeed());

                // Perform swap
                animationMethods.swapBars(j, j + 1);
                [sortedArray[j], sortedArray[j + 1]] = [sortedArray[j + 1], sortedArray[j]];
                await sleep(getSpeed());

                swapped = true;
            }

            // Reset bars to default state
            animationMethods.resetBarStates([j, j + 1]);
        }

        // Mark as sorted
        animationMethods.markAsSorted([n - 1 - i]);
        await sleep(getSpeed() / 2);

        if (!swapped) break;
    }

    // Mark all as sorted
    for (let k = 0; k < n; k++) {
        animationMethods.markAsSorted([k]);
        await sleep(getSpeed() / 2);
    }

    // Database save
    try {
        await PerformanceService.savePerformanceData(
            'bubble_sort',
            array.length,
            comparisons
        );
    } catch (error) {
        console.error('Failed to save Bubble Sort performance:', error);
    }

    return {
        sortedArray,
        comparisons,
        algorithm: 'Bubble Sort'
    };
};
