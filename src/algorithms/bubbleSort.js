// src/algorithms/bubbleSort.js
import { BAR_STATES } from '../constants';
import { sleep } from '../utils/helpers';




export const bubbleSort = async (array, animationMethods, speed = 150) => {
    
    //copy 
    const sortedArray = [...array]; 
    //performance metric 
    let comparisons = 0;
    const n = sortedArray.length;


    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        
        for (let j = 0; j < n - i - 1; j++) {

            // Highlight compared bars 
            animationMethods.highlightBars([j, j + 1], BAR_STATES.COMPARING);
            await sleep(speed);
            
            comparisons++;
            
            //swap cond 
            if (sortedArray[j] > sortedArray[j + 1]) {

                // swap animation
                animationMethods.highlightBars([j, j + 1], BAR_STATES.SWAPPING);
                await sleep(speed);
                
                // Perform swap
                animationMethods.swapBars(j, j + 1);
                [sortedArray[j], sortedArray[j + 1]] = [sortedArray[j + 1], sortedArray[j]];
                await sleep(speed);
                
                swapped = true;
            }
            
            // Reset bars to default state ,cancelling anims 
            animationMethods.resetBarStates([j, j + 1]);
        }
        
        //last elem in curr pass has been sorted 
        animationMethods.markAsSorted([n - 1 - i]);
        await sleep(speed / 2); //pause 
        
        // Early termination if no swaps occurred
        if (!swapped) break;
    }
    
    // Mark first element as sorted (it's the last one to be confirmed)
   for (let k = 0; k < n; k++) {
        animationMethods.markAsSorted([k]);
        await sleep(speed / 2);  // Optional: quick highlight to confirm
    }

    
    return {
        sortedArray,
        comparisons,
        algorithm: 'Bubble Sort'
    };
};
