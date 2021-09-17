import { useQuery } from 'react-query';
import { supabase } from '../utils/supabaseClient';

const downloadTableAsCSV = async table => {
    const { data, error } = await supabase.from(table).select().csv();
    if (error) throw new Error(error.message);

    return data;
};

export default function useDownloadCSV(table) {
    return useQuery('csv_payload', () => downloadTableAsCSV(table));
}
