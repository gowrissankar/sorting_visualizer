import { bubbleSort } from '../src/algorithms/bubbleSort.js';
import { selectionSort } from '../src/algorithms/selectionSort.js';
import { insertionSort } from '../src/algorithms/insertionSort.js';
import { mergeSort } from '../src/algorithms/mergeSort.js';
import { quickSort } from '../src/algorithms/quickSort.js';
import fs from 'fs';

// Minimal stub for animation methods
const mockAnimationMethods = {
    highlightBars: () => {},
    resetBarStates: () => {},
    markAsSorted: () => {},
    swapBars: () => {},
    setDisplayArray: () => {},
    setBarStates: () => {}
};

function generateRandomArray(size) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 1000) + 1);
}

const algorithms = {
    bubble_sort: bubbleSort,
    selection_sort: selectionSort,
    insertion_sort: insertionSort,
    merge_sort: mergeSort,
    quick_sort: quickSort
};

async function main() {
    const rows = [
        'algorithm,size,total_comparisons,sample_count'
    ];

    for (let run = 1; run <= 5; run++) {
        for (let size = 10; size <= 100; size++) {
            const testArray = generateRandomArray(size);
            for (const [algorithmKey, algorithmFunc] of Object.entries(algorithms)) {
                try {
                    console.log(`Run ${run}, Size ${size}, Algorithm ${algorithmKey}...`);
                    const arrayCopy = [...testArray];
                    const result = await algorithmFunc(arrayCopy, mockAnimationMethods, 1);
                    if (!result || typeof result.comparisons === 'undefined') {
                        console.error(`❌ No result for ${algorithmKey} size ${size} run ${run}`);
                    }
                    rows.push(`${algorithmKey},${size},${result.comparisons},1`);
                } catch (err) {
                    console.error(`❌ Error with ${algorithmKey} on size ${size}:`, err);
                }
            }
        }
    }

    try {
        fs.writeFileSync('performance_data.csv', rows.join('\n'));
        console.log('✅ CSV generated: performance_data.csv');
    } catch (err) {
        console.error('❌ Error writing CSV file:', err);
    }
}

main().catch((err) => {
    console.error('❌ Uncaught error in main():', err);
});
