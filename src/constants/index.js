// src/constants/index.js
export const ANIMATION_SPEEDS = {
    SLOW: 100,
    MEDIUM: 50,
    FAST: 20,
    VERY_FAST: 5,
    INSTANT: 1 
};

export const ARRAY_CONFIG = {
    MIN_SIZE: 10,
    MAX_SIZE: 100,
    DEFAULT_SIZE: 20,
    getValueRange: (size) => ({ min: 1, max: size })
};

export const ALGORITHMS = {
    BUBBLE_SORT: 'bubble_sort',
    SELECTION_SORT: 'selection_sort',
    INSERTION_SORT: 'insertion_sort',
    MERGE_SORT: 'merge_sort',
    QUICK_SORT: 'quick_sort'
};

export const ALGORITHM_LIST = [
    ALGORITHMS.BUBBLE_SORT,
    ALGORITHMS.SELECTION_SORT,
    ALGORITHMS.INSERTION_SORT,
    ALGORITHMS.MERGE_SORT,
    ALGORITHMS.QUICK_SORT
];

export const ANIMATION_STATES = {
    IDLE: 'idle',
    PLAYING: 'playing',
    PAUSED: 'paused', 
    COMPLETED: 'completed'
};

export const ARRAY_GENERATION_TYPES = {
    RANDOM: 'random',
    SEQUENTIAL: 'sequential'
};

export const BAR_STATES = {
    DEFAULT: 'default',
    HOVER: 'hover',
    COMPARING: 'comparing',
    SWAPPING: 'swapping',
    SORTED: 'sorted',
};

export const VISUAL_CONFIG = {
    BAR: {
        MIN_WIDTH: 3,
        MAX_WIDTH: 25,
        GAP: 1,
        MIN_HEIGHT: 2,
        MAX_HEIGHT: 400,
        HOVER_LIFT: 8,
        BORDER_RADIUS: 4,
    },
    CONTAINER: {
        PADDING: 20,
        WIDTH: 800,
        HEIGHT: 400,
    },
};
