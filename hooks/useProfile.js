import { useQuery } from 'react-query';
import { supabase } from '../utils/supabaseClient';

const getProfile = async ({ userId }) => {
    const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('user_id', userId)
        .single();

    if (error) throw new Error(error.message);
    if (!data) throw new Error('User profile not found');

    return data;
};

export default function useProfile() {
    const user = supabase.auth.user();
    return useQuery('profile', () => getProfile({ userId: user?.id }));
}
