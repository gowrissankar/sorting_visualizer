// /src/utils/helpers.js
import { ARRAY_CONFIG, ARRAY_GENERATION_TYPES } from "../constants/index.js";

export const generateArray = (
    size = ARRAY_CONFIG.DEFAULT_SIZE,
    type = ARRAY_GENERATION_TYPES.SEQUENTIAL
) => {
    // Random: randomly choose vals from range 
    if (type === ARRAY_GENERATION_TYPES.RANDOM) {
        return Array.from({ length: size }, () => {
            return Math.floor(Math.random() * size) + 1;
        });
    }

    // Sequential with Fisher-Yates shuffle (all values 1-N, shuffled positions)
    const seqarray = Array.from({ length: size }, (_, i) => i + 1);
    
    // Fisher yates shuffle 
    for (let i = seqarray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [seqarray[i], seqarray[j]] = [seqarray[j], seqarray[i]];
    }
    
    return seqarray;
};

// Sets the delay for animation purpose, promise resolves after the delay
export const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// Swaps two elements in an array immutably
export const swapElements = (array, i, j) => {
    const newArray = [...array];
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    return newArray;
};

export const calculateBarHeight = (value, maxValue, containerHeight = 400) => {
    return Math.floor((value / maxValue) * containerHeight);
};
