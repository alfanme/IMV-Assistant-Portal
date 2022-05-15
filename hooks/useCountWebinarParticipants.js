import { useQuery } from 'react-query';
import { supabase } from '../utils/supabaseClient';

const countWebinarParticipants = async () => {
    const { data: webinars } = await supabase
        .from('webinars')
        .select('id, title, open_registration')
        .eq('open_registration', true);

    const {
        data,
        count: participants,
        error: countError,
    } = await supabase
        .from('webinar_participants')
        .select('status, organization, attendance, webinar', {
            count: 'exact',
        })
        .in(
            'webinar',
            webinars.map(webinar => webinar.id)
        );

    if (countError) throw new Error(countError.message);

    const students = data.filter(d => d.status === 'Mahasiswa').length;
    const attendance = data.filter(d => d.attendance === true)?.length;
    const hmtt = data.filter(
        d =>
            d.organization.toLowerCase().includes('hmtt') ||
            d.organization.toLowerCase().includes('telekomunikasi')
    )?.length;
    const maxPage = participants != 0 ? Math.ceil(participants / 10) - 1 : 0;

    return { participants, students, attendance, hmtt, maxPage, webinars };
};

export default function useCountWebinarParticipants() {
    return useQuery('count_webinar_participants', () =>
        countWebinarParticipants()
    );
}
