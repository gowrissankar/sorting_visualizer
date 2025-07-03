// src/algorithms/mergeSort.js
import { BAR_STATES } from '../constants/index.js';
import { sleep } from '../utils/helpers.js';
import { PerformanceService } from '../services/performanceService.js';

export const mergeSort = async (array, animationMethods, getSpeed, abortRef) => {
    let comparisons = 0;
    const arr = [...array];

    async function mergeSortHelper(start, end) {
        if (abortRef && abortRef.current) return;
        if (start >= end) return;
        
        const mid = Math.floor((start + end) / 2);
        
        // Recursively sort both halves
        await mergeSortHelper(start, mid);
        await mergeSortHelper(mid + 1, end);
        
        // Merge the sorted halves
        await merge(start, mid, end);
    }

    async function merge(start, mid, end) {
        if (abortRef && abortRef.current) return;

        // Create temporary arrays for left and right subarrays
        const left = [];
        const right = [];
        
        // Copy data to temp arrays
        for (let i = start; i <= mid; i++) {
            left.push(arr[i]);
        }
        for (let i = mid + 1; i <= end; i++) {
            right.push(arr[i]);
        }
        
        let i = 0, j = 0, k = start;
        
        // Merge the temp arrays back into arr[start..end]
        while (i < left.length && j < right.length) {
            if (abortRef && abortRef.current) return;

            comparisons++;
            
            // Highlight the positions being compared
            animationMethods.highlightBars([k], BAR_STATES.COMPARING);
            await sleep(getSpeed());
            
            if (left[i] <= right[j]) {
                arr[k] = left[i];
                i++;
            } else {
                arr[k] = right[j];
                j++;
            }
            
            // Force visual update by updating the display array
            animationMethods.setDisplayArray([...arr]);
            await sleep(getSpeed() / 2);
            animationMethods.resetBarStates([k]);
            k++;
        }
        
        // Copy remaining elements of left[], if any
        while (i < left.length) {
            if (abortRef && abortRef.current) return;
            arr[k] = left[i];
            animationMethods.setDisplayArray([...arr]);
            await sleep(getSpeed() / 2);
            i++;
            k++;
        }
        
        // Copy remaining elements of right[], if any
        while (j < right.length) {
            if (abortRef && abortRef.current) return;
            arr[k] = right[j];
            animationMethods.setDisplayArray([...arr]);
            await sleep(getSpeed() / 2);
            j++;
            k++;
        }
        
        // Mark the merged section as sorted
        for (let idx = start; idx <= end; idx++) {
            if (abortRef && abortRef.current) return;
            animationMethods.markAsSorted([idx]);
            await sleep(getSpeed() / 4);
        }
    }

    await mergeSortHelper(0, arr.length - 1);

    // Mark all bars as sorted at the end
    for (let i = 0; i < arr.length; i++) {
        if (abortRef && abortRef.current) break;
        animationMethods.markAsSorted([i]);
        await sleep(getSpeed() / 4);
    }

    // Database save
    try {
        await PerformanceService.savePerformanceData('merge_sort', arr.length, comparisons);
    } catch (error) {
        console.error('Failed to save Merge Sort performance:', error);
    }

    return { sortedArray: arr, comparisons, algorithm: 'Merge Sort' };
};
