import { useQuery } from 'react-query';
import { supabase } from '../utils/supabaseClient';

const getWebinarParticipants = async page => {
    const fromRow = page * 10;
    const toRow = fromRow + 9;

    const { data: webinars } = await supabase
        .from('webinars')
        .select('id, open_registration')
        .eq('open_registration', true);

    const { data, error } = await supabase
        .from('webinar_participants')
        .select(`*, webinar (title)`)
        .in(
            'webinar',
            webinars.map(webinar => webinar.id)
        )
        .order('id', { ascending: false })
        .range(fromRow, toRow);

    if (error) throw new Error(error.message);

    return data;
};

export default function useWebinarParticipants(page) {
    return useQuery('webinar_participants', () => getWebinarParticipants(page));
}
