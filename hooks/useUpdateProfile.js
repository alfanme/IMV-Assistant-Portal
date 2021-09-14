import { useMutation } from 'react-query';
import { supabase } from '../utils/supabaseClient';

const updateProfile = async (profile, imageFile) => {
    const user = supabase.auth.user();
    let newPhotoURL = '';

    if (imageFile) {
        let filename = '';

        if (profile.photoURL) {
            filename = profile.photoURL.split('/').reverse()[0];
        } else {
            filename = profile.user_id + '.jpg';
        }

        console.log('Update foto:', imageFile);
        console.log('Filename:', filename);
        const { data, error } = await supabase.storage
            .from('user-photos')
            .upload(`public/${filename}`, imageFile, {
                cacheControl: 0,
                upsert: true,
            });

        if (error) throw new Error(error.message);

        if (data) {
            console.log('Data update foto:', data);
            const { data: urlData, error: errorURLData } =
                await supabase.storage
                    .from('user-photos')
                    .getPublicUrl(`public/${filename}`);

            if (errorURLData) throw new Error(errorURLData.message);

            newPhotoURL = urlData.publicURL;
        }
    }

    if (profile) {
        console.log('Update data diri:', profile);
        const { error } = await supabase
            .from('profiles')
            .update({
                ...profile,
                photoURL: profile.photoURL ? profile.photoURL : newPhotoURL,
            })
            .match({ user_id: user.id });
        if (error) throw new Error(error.message);
    }
};

export default function useUpdateProfile(profile, imageFile) {
    return useMutation(() => updateProfile(profile, imageFile));
}
