import { useMutation } from 'react-query';
import { supabase } from '../utils/supabaseClient';

const createUser = async ({ email, password }) => {
    // Check whether email exists
    const { data: userWithEmail } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', email)
        .single();

    if (userWithEmail)
        throw new Error(`User account already exists: ${userWithEmail.email}`);

    const { user, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
    });

    if (signUpError) throw new Error(signUpError.message);

    return user;
};

export default function useCreateUser({ email, password }) {
    return useMutation(() => createUser({ email, password }), {
        onSuccess: async user => {
            const { data: insertData, error: insertError } = await supabase
                .from('profiles')
                .insert({
                    email,
                    user_id: user.id,
                });

            if (insertError) {
                throw insertError.message;
            }

            return insertData;
        },
    });
}
