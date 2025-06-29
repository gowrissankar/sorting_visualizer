
//to set up all the constants to be refered from other fiels 
//caps for good practice 

export const ANIMATION_SPEEDS =
{
    SLOW: 300,
    MEDIUM: 150,
    FAST: 50,
    VERY_FAST: 10
};

export const ARRAY_CONFIG =
{
    MIN_SIZE: 5 ,
    MAX_SIZE: 100 ,
    DEFAULT_SIZE : 50 ,
    MIN_VALUE : 5 ,
    MAX_VALUE : 500 
};

export const ALGORITHMS = 
{
    BUBBLE_SORT :  'bubble' ,
    SELECTION_SORT : 'selection' ,
    INSERTION_SORT : 'insertion' 
};

export const ANIMATION_STATES =
{
    IDLE : 'idle' ,
    PLAYING : 'playing' ,
    PAUSED : 'paused' , 
    COMPLETED : 'completed'
};

export const ARRAY_GENERATION_TYPES =
{
    RANDOM : 'random' ,
    SEQUENTIAL : 'sequential' 
};







export const BAR_STATES =
{
    DEFAULT: 'default',
    HOVER: 'hover',
    COMPARING: 'comparing',
    SWAPPING: 'swapping',
    SORTED: 'sorted',
}

//to unify all bars 
export const VISUAL_CONFIG = {
    BAR: {
        MIN_WIDTH: 6,
        MAX_WIDTH: 25,
        GAP: 1,
        MIN_HEIGHT: 20,
        MAX_HEIGHT: 400,
        HOVER_LIFT: 8,
        BORDER_RADIUS: 4,
    },

    CONTAINER: {
        PADDING: 20,
    }
};