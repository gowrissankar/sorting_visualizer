
//to set up all the constants to be refered from other fiels 
//caps for good practice 

export const ANIMATION_SPEEDS =
{
    SLOW: 100,
    MEDIUM: 50,
    FAST: 20,
    VERY_FAST: 5,
    INSTANT : 1 
};

export const ARRAY_CONFIG =
{
    MIN_SIZE: 10 ,
    MAX_SIZE: 100 ,
    DEFAULT_SIZE : 20 ,
    //value is limited to [ 1,.. ,size ]

    getValueRange: (size) => ({ min: 1, max: size })

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
        MIN_WIDTH: 3,
        MAX_WIDTH: 25,
        GAP: 1,
        MIN_HEIGHT: 2, //height of elem with val 1 
        MAX_HEIGHT: 400,
        HOVER_LIFT: 8,
        BORDER_RADIUS: 4,
    },

    CONTAINER: 
    {
        PADDING: 20,
        WIDTH : 800 ,
        HEIGHT : 400 ,
    } ,

};