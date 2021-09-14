import { useMutation, useQueryClient } from 'react-query';
import { supabase } from '../utils/supabaseClient';

const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
        throw new Error(error);
    }
};

export default function useLogOut() {
    const queryClient = useQueryClient();
    return useMutation(() => logout(), {
        onSuccess: () => {
            queryClient.removeQueries();
        },
    });
}
