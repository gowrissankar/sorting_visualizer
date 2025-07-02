// scripts/populate-db.js



// didnt work moved to make a csv file and upload to db 














import { createClient } from '@supabase/supabase-js';
import { bubbleSort } from '../src/algorithms/bubbleSort.js';
import { selectionSort } from '../src/algorithms/selectionSort.js';
import { insertionSort } from '../src/algorithms/insertionSort.js';
import { mergeSort } from '../src/algorithms/mergeSort.js';
import { quickSort } from '../src/algorithms/quickSort.js';
import 'dotenv/config';


// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey, {
    db: { schema: 'public' },
    auth: { persistSession: false }
});

// Stubbed animation methods required by algorithm interface
const mockAnimationMethods = {
    highlightBars: () => {},
    resetBarStates: () => {},
    markAsSorted: () => {},
    swapBars: () => {},
    setDisplayArray: () => {},
    setBarStates: () => {}
};

// Generate random integer array of given size
function generateRandomArray(size) {
    const array = new Array(size);
    for (let i = 0; i < size; i++) {
        array[i] = Math.floor(Math.random() * 1000) + 1;
    }
    return array;
}

// Sorting algorithm implementations
const algorithms = {
    bubble_sort: bubbleSort,
    selection_sort: selectionSort,
    insertion_sort: insertionSort,
    merge_sort: mergeSort,
    quick_sort: quickSort
};

// Save a batch of algorithm results to Supabase
async function batchSaveResults(results) {
    const operations = results.map(result =>
        supabase.rpc('upsert_performance', {
            p_algorithm: result.algorithm,
            p_size: result.size,
            p_comparisons: result.comparisons
        })
    );
    try {
        await Promise.all(operations);
        return { success: true };
    } catch (error) {
        return { success: false, error };
    }
}

// Populate the database with algorithm performance data
async function populateDatabase() {
    console.log('Starting database population...');

    const startTime = Date.now();
    let totalOperations = 0;

    for (let size = 10; size <= 100; size++) {
        console.log(`Processing size = ${size}`);

        const testArray = generateRandomArray(size);
        const sizeResults = [];

        for (const [algorithmKey, algorithmFunc] of Object.entries(algorithms)) {
            try {
                const arrayCopy = [...testArray];
                const result = await algorithmFunc(arrayCopy, mockAnimationMethods, 1);
                sizeResults.push({
                    algorithm: algorithmKey,
                    size: size,
                    comparisons: result.comparisons
                });
                totalOperations++;
            } catch (error) {
                // Error is logged silently to keep console output clean
            }
        }

        if (sizeResults.length > 0) {
            await batchSaveResults(sizeResults);
        }
    }

    const totalTime = Date.now() - startTime;

    console.log('Database population complete.');
    console.log(`Total operations: ${totalOperations}`);
    console.log(`Total execution time: ${(totalTime / 1000).toFixed(2)}s`);
    console.log(`Average time per operation: ${(totalTime / totalOperations).toFixed(2)}ms`);
    console.log(`Data points generated: ${totalOperations}`);
}

// Execute script
populateDatabase()
    .then(() => process.exit(0))
    .catch(error => {
        console.error('Script failed:', error.message);
        process.exit(1);
    });
