import { ARRAY_CONFIG,ARRAY_GENERATION_TYPES     } from "../constants/index.js";


export const generateArray =
(
    //default vals 
    size = ARRAY_CONFIG.DEFAULT_SIZE ,
    type = ARRAY_GENERATION_TYPES.SEQUENTIAL
) => 
{

    //random : randomly choose vals from range 
    if (type === ARRAY_GENERATION_TYPES.RANDOM) 
    {
        return Array.from ( {length: size} , () => {
            return Math.floor ( Math.random () * size ) + 1 
            //gens a num in valid range 
        } )
    }

    //sequential 
    const seqarray = Array.from ( {length: size} , (_,i)=> i+1 ) ;
    //generate undef array of all vals 

    //fisher yates shuffel 
    for ( let i = seqarray.length -1 ; i>0 ; i-- ) 
    {
        //swap with a prev indx 
        const j = Math.floor ( Math.random() * (i+1) ) ;
        [ seqarray[i] , seqarray[j] ] = [ seqarray[j] , seqarray[i] ] ;
    }

    return seqarray ;
}


/* sets the delay for animation purpose , promsie resolves after the delay */
export const sleep = (ms) => {
    return new Promise ( resolve => setTimeout(resolve,ms)) 
}

//swaps two elements in an array 
//copy so immutable (const) 
export const swapElements = (array , i , j ) => 
{
    const newarray = [...array] ;
    [ newarray[i] , newarray[j] ] = [newarray[j] , newarray[i] ] ;
    return newarray ;
}

export const calculateBarHeight = ( value , maxvalue , containereight = 400) =>
{
    return Math.floor( (value/maxvalue) * containereight ) ;
} ;