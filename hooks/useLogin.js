import { useMutation } from 'react-query';
import { supabase } from '../utils/supabaseClient';

const login = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signIn({
        email,
        password,
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export default function useLogin({ email, password }) {
    return useMutation(() => login({ email, password }));
}
