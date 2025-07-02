// src/algorithms/mergeSort.js
import { BAR_STATES } from '../constants/index.js';
import { sleep } from '../utils/helpers.js';
//import { PerformanceService } from '../services/performanceService.js';

export const mergeSort = async (array, animationMethods, speed = 50) => {
    let comparisons = 0;
    const arr = [...array];

    async function mergeSortHelper(start, end) {
        if (start >= end) return;
        
        const mid = Math.floor((start + end) / 2);
        
        // Recursively sort both halves
        await mergeSortHelper(start, mid);
        await mergeSortHelper(mid + 1, end);
        
        // Merge the sorted halves
        await merge(start, mid, end);
    }

    async function merge(start, mid, end) {
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
            comparisons++;
            
            // Highlight the positions being compared
            animationMethods.highlightBars([k], BAR_STATES.COMPARING);
            await sleep(speed);
            
            if (left[i] <= right[j]) {
                arr[k] = left[i];
                i++;
            } else {
                arr[k] = right[j];
                j++;
            }
            
            // **KEY FIX**: Force visual update by updating the display array
            animationMethods.setDisplayArray([...arr]);
            await sleep(speed / 2);
            animationMethods.resetBarStates([k]);
            k++;
        }
        
        // Copy remaining elements of left[], if any
        while (i < left.length) {
            arr[k] = left[i];
            animationMethods.setDisplayArray([...arr]);
            await sleep(speed / 2);
            i++;
            k++;
        }
        
        // Copy remaining elements of right[], if any
        while (j < right.length) {
            arr[k] = right[j];
            animationMethods.setDisplayArray([...arr]);
            await sleep(speed / 2);
            j++;
            k++;
        }
        
        // Mark the merged section as sorted
        for (let idx = start; idx <= end; idx++) {
            animationMethods.markAsSorted([idx]);
            await sleep(speed / 4);
        }
    }

    await mergeSortHelper(0, arr.length - 1);

    // Mark all bars as sorted at the end
    for (let i = 0; i < arr.length; i++) {
        animationMethods.markAsSorted([i]);
        await sleep(speed / 4);
    }
/* 
    try {
        await PerformanceService.savePerformanceData('merge_sort', arr.length, comparisons);
    } catch (error) {
        console.error('Failed to save Merge Sort performance:', error);
    } */

    return { sortedArray: arr, comparisons, algorithm: 'Merge Sort' };
};
