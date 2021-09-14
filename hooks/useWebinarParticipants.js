import { useQuery } from 'react-query';
import { supabase } from '../utils/supabaseClient';

const getWebinarParticipants = async () => {
    const { data, error } = await supabase
        .from('webinar_participants')
        .select();

    if (error) throw new Error(error.message);

    return data;
};

export default function useWebinarParticipants() {
    return useQuery('webinar_participants', () => getWebinarParticipants());
}
