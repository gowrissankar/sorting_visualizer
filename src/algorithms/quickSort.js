// /src/algorithms/quickSort.js
import { BAR_STATES } from '../constants/index.js';
import { sleep } from '../utils/helpers.js';
import { PerformanceService } from '../services/performanceService.js';

export const quickSort = async (array, animationMethods, getSpeed, abortRef) => {
    let comparisons = 0;
    const arr = [...array];

    async function quickSortHelper(low, high) {
        if (abortRef && abortRef.current) return;
        if (low < high) {
            const pi = await partition(low, high);
            await quickSortHelper(low, pi - 1);
            await quickSortHelper(pi + 1, high);
        }
    }

    async function partition(low, high) {
        if (abortRef && abortRef.current) return low;

        const pivot = arr[high];
        animationMethods.highlightBars([high], BAR_STATES.HOVER);
        let i = low - 1;
        
        for (let j = low; j < high; j++) {
            if (abortRef && abortRef.current) return i + 1;

            comparisons++;
            animationMethods.highlightBars([j], BAR_STATES.COMPARING);
            await sleep(getSpeed());

            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                animationMethods.swapBars(i, j);
                await sleep(getSpeed());
            }
            animationMethods.resetBarStates([j]);
        }
        
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        animationMethods.swapBars(i + 1, high);
        animationMethods.resetBarStates([high]);
        await sleep(getSpeed());

        animationMethods.markAsSorted([i + 1]);
        return i + 1;
    }

    await quickSortHelper(0, arr.length - 1);

    for (let k = 0; k < arr.length; k++) {
        if (abortRef && abortRef.current) break;
        animationMethods.markAsSorted([k]);
        await sleep(getSpeed() / 3);
    }

    // Database save
    try {
        await PerformanceService.savePerformanceData('quick_sort', arr.length, comparisons);
    } catch (error) {
        console.error('Failed to save Quick Sort performance:', error);
    }

    return { sortedArray: arr, comparisons, algorithm: 'Quick Sort' };
};
