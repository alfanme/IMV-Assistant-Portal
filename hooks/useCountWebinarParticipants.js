import { useQuery } from 'react-query';
import { supabase } from '../utils/supabaseClient';

const countWebinarParticipants = async () => {
    const {
        data,
        count: participants,
        error: countError,
    } = await supabase
        .from('webinar_participants')
        .select('status, organization, attendance', { count: 'exact' });

    if (countError) throw new Error(countError.message);

    const students = data.filter(d => d.status === 'Mahasiswa').length;
    const attendance = data.filter(d => d.attendance === true)?.length;
    const hmtt = data.filter(
        d =>
            d.organization.toLowerCase().includes('hmtt') ||
            d.organization.toLowerCase().includes('telekomunikasi')
    )?.length;
    const maxPage = Math.ceil(participants / 10) - 1;

    return { participants, students, attendance, hmtt, maxPage };
};

export default function useCountWebinarParticipants() {
    return useQuery('count_webinar_participants', () =>
        countWebinarParticipants()
    );
}
