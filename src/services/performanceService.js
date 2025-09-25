//service layer to handle all db functiosn 

import { supabase } from './supabaseClient.js'

//provides all the db services through fucntions 

export class PerformanceService {

    //saving into db 
    static async savePerformanceData(algorithm, arraySize, comparisons) {
        //printing in console 
        console.log(`Saving performance: ${algorithm} (${arraySize}) - ${comparisons} comparisons`);
        
        //destructuring error out 
        const { error } = await supabase.rpc('upsert_performance', {
            p_algorithm: algorithm,
            p_size: arraySize,
            p_comparisons: comparisons
        });

        if (error) throw error;
        
        console.log(`Performance data saved successfully!`);
        return { success: true };
    }

    // Get all performance data for visualization
    static async getAllPerformanceData() {
        const { data, error } = await supabase
            .from('algorithm_performance')
            .select('algorithm, size, total_comparisons, sample_count')
            .order('algorithm')
            .order('size');

        if (error) throw error;

        // Calculate averages for display
        const processedData = data.map(record => ({
            ...record,
            average_comparisons: Math.round(record.total_comparisons / record.sample_count),
        }));

        console.log('Performance data retrieved:', processedData);
        return processedData;
    }

    // Get data of that algo 
    static async getAlgorithmPerformance(algorithm) {
        const { data, error } = await supabase
            .from('algorithm_performance')
            .select('*')
            .eq('algorithm', algorithm)
            .order('size');  //return in sorted order 

        if (error) throw error;
        return data;
    }
}
