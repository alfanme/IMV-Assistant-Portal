import { supabase } from '../../../utils/supabaseClient';

export default async function getProfile(req, res) {
    const { uid } = req.query;

    try {
        const { data, error } = await supabase
            .from('profiles')
            .select()
            .match({ user_id: uid });

        data && res.json(data[0]);
        error && res.json(error);
    } catch (error) {
        res.json(error);
    }
}
