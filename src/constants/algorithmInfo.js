// /src/constants/algorithmInfo.js
import { ALGORITHMS } from './index.js';

export const ALGORITHM_CONTENT = {
  [ALGORITHMS.BUBBLE_SORT]: {
    basicIdea: "Repeatedly compares adjacent elements and swaps them if they're in wrong order. Larger elements 'bubble up' to the end.",
    timeComplexity: "O(n²) - compares every pair of elements",
    animationGuide: "Watch the largest elements 'bubble up' to the end with each pass. Notice how fewer comparisons are needed in each subsequent round as the end becomes sorted.",
    pseudocode: `for i in range(n):
    swapped = False
    for j in range(0, n-i-1):
        if arr[j] > arr[j+1]:
            swap(arr[j], arr[j+1])
            swapped = True
    if not swapped:
        break`,
    bestWorstAvg: {
      best: "O(n) - already sorted",
      average: "O(n²) - random order",
      worst: "O(n²) - reverse sorted"
    },
    graphBehavior: "Quadratic growth in comparisons",
    graphInsights: "Bubble vs Selection show similar O(n²) curves. Bubble sort may show slight variability due to input sensitivity.",
    learnMore: "https://www.geeksforgeeks.org/bubble-sort/"
  },

  [ALGORITHMS.SELECTION_SORT]: {
    basicIdea: "Finds the minimum element and places it at the beginning. Repeats for remaining unsorted portion.",
    timeComplexity: "O(n²) - always scans remaining elements",
    animationGuide: "Observe how the algorithm finds the smallest element and places it at the beginning. The sorted portion grows from left to right, one element at a time.",
    pseudocode: `for i in range(n):
    min_idx = i
    for j in range(i+1, n):
        if arr[j] < arr[min_idx]:
            min_idx = j
    swap(arr[i], arr[min_idx])`,
    bestWorstAvg: {
      best: "O(n²) - always same comparisons",
      average: "O(n²) - consistent behavior",
      worst: "O(n²) - no early termination"
    },
    graphBehavior: "Consistent quadratic curve regardless of input",
    graphInsights: "Exceptionally smooth curve - always does exactly n(n-1)/2 comparisons regardless of input order.",
    learnMore: "https://www.geeksforgeeks.org/selection-sort/"
  },

  [ALGORITHMS.INSERTION_SORT]: {
    basicIdea: "Builds sorted array one element at a time by inserting each element into its correct position. Works like sorting playing cards in your hands.",
    timeComplexity: "O(n²) - shifts elements for insertion",
    animationGuide: "See how each element gets inserted into its correct position within the already sorted portion. Elements shift right to make room for the insertion.",
    pseudocode: `for i in range(1, n):
    key = arr[i]
    j = i - 1
    while j >= 0 and arr[j] > key:
        arr[j+1] = arr[j]
        j -= 1
    arr[j+1] = key`,
    bestWorstAvg: {
      best: "O(n) - already sorted",
      average: "O(n²) - random order",
      worst: "O(n²) - reverse sorted"
    },
    graphBehavior: "Performs well on nearly sorted data",
    graphInsights: "Falls between O(n²) and O(n log n) algorithms. Outperforms bubble/selection on nearly sorted data.",
    learnMore: "https://www.geeksforgeeks.org/insertion-sort/"
  },

  [ALGORITHMS.MERGE_SORT]: {
    basicIdea: "Divides array into halves, recursively sorts them, then merges sorted halves back together. Uses divide and conquer strategy for guaranteed efficiency.",
    timeComplexity: "O(n log n) - divide and conquer approach",
    animationGuide: "Watch the divide and conquer approach - sections get sorted independently, then merge together. Notice how sorted subarrays combine into larger sorted arrays.",
    pseudocode: `function mergeSort(arr):
    if length(arr) <= 1:
        return arr
    mid = length(arr) / 2
    left = mergeSort(arr[0:mid])
    right = mergeSort(arr[mid:])
    return merge(left, right)`,
    bestWorstAvg: {
      best: "O(n log n) - consistent performance",
      average: "O(n log n) - always divides evenly",
      worst: "O(n log n) - guaranteed efficiency"
    },
    graphBehavior: "Logarithmic growth, very predictable",
    graphInsights: "Consistent O(n log n) efficiency creates predictable, low-curve growth regardless of input order.",
    learnMore: "https://www.geeksforgeeks.org/merge-sort/"
  },

  [ALGORITHMS.QUICK_SORT]: {
    basicIdea: "Picks a pivot element and partitions array around it. Recursively sorts partitions for efficient divide and conquer sorting.",
    timeComplexity: "O(n log n) average - depends on pivot choice",
    animationGuide: "Focus on the pivot element - see how all smaller elements move to its left and larger elements to its right. Each partition gets sorted recursively.",
    pseudocode: `function quickSort(arr, low, high):
    if low < high:
        pivot = partition(arr, low, high)
        quickSort(arr, low, pivot-1)
        quickSort(arr, pivot+1, high)`,
    bestWorstAvg: {
      best: "O(n log n) - good pivot choices",
      average: "O(n log n) - random pivots",
      worst: "O(n²) - poor pivot choices"
    },
    graphBehavior: "Usually logarithmic, can degrade to quadratic",
    graphInsights: "Usually shows O(n log n) curves with low comparison counts. Performance varies based on pivot selection.",
    learnMore: "https://www.geeksforgeeks.org/quick-sort/"
  }
};

export const ALGORITHM_NAMES = {
  [ALGORITHMS.BUBBLE_SORT]: 'Bubble Sort',
  [ALGORITHMS.SELECTION_SORT]: 'Selection Sort',
  [ALGORITHMS.INSERTION_SORT]: 'Insertion Sort',
  [ALGORITHMS.MERGE_SORT]: 'Merge Sort',
  [ALGORITHMS.QUICK_SORT]: 'Quick Sort'
};
