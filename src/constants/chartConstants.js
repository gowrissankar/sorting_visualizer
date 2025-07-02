// Chart.js specific constants for performance visualization

export const CHART_CONFIG = {
    CONTAINER: {
        HEIGHT: 400,
        WIDTH: '100%'
    },
    Y_AXIS: {
        MIN_SCALE: 500,
        MAX_SCALE: 8000,
        DEFAULT_SCALE: 6000,
        SCALE_STEP: 500
    }
};

export const CHART_COLORS = {
    // Algorithm colors (different color per algorithm)
    ALGORITHMS: {
        bubble_sort: '#ff6b6b',      // Red
        selection_sort: '#e2b714',   // Yellow
        insertion_sort: '#9b59b6',   // Purple
        merge_sort: '#3498db',       // Blue
        quick_sort: '#43aa8b'        // Green/Teal
    },
    CURRENT_ALGORITHM: '#4ecdc4',    // Teal (your theme)
    USER_RUN: '#FFFFFF',             // White border
    BACKGROUND: '#2c2e34',
    TEXT_PRIMARY: '#d1d0c5',
    TEXT_SECONDARY: '#646669',
    GRID: '#323741'
};

export const CHART_STYLES = {
    ALGORITHM_LINE: {
        TENSION: 0.4,
        POINT_RADIUS: 4,
        POINT_HOVER_RADIUS: 4,
        BORDER_WIDTH: 2
    },
    USER_RUN_POINT: {
        POINT_RADIUS: 8,
        POINT_HOVER_RADIUS: 10,
        POINT_BORDER_WIDTH: 3,
        SHOW_LINE: false
    }
};

export const ALGORITHM_NAMES = {
    bubble_sort: 'Bubble Sort',
    selection_sort: 'Selection Sort',
    insertion_sort: 'Insertion Sort',
    merge_sort: 'Merge Sort',
    quick_sort: 'Quick Sort'
};
