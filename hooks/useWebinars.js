import { useQuery, useMutation, useQueryClient } from 'react-query';
import { supabase } from '../utils/supabaseClient';

const getWebinars = async () => {
    const { data, error } = await supabase
        .from('webinars')
        .select()
        .order('id', { ascending: false });

    if (error) throw new Error(error.message);
    return data;
};

export function useWebinars() {
    return useQuery('webinars', () => getWebinars());
}

const toggleOpenRegistration = async (id, openRegistration) => {
    const { error } = await supabase
        .from('webinars')
        .update({ open_registration: openRegistration })
        .match({ id: id });

    if (error) throw new Error(error.message);
};

export function useToggleOpenRegistration(id, openRegistration) {
    const queryClient = useQueryClient();
    return useMutation(() => toggleOpenRegistration(id, openRegistration), {
        onSuccess: () => {
            queryClient.prefetchQuery('webinars', () => getWebinars());
        },
    });
}

const updateWebinar = async (id, title, heldOn) => {
    const { error } = await supabase
        .from('webinars')
        .update({ title: title, held_on: heldOn })
        .match({ id: id });

    if (error) throw new Error(error.message);
};

export function useUpdateWebinar(id, title, heldOn) {
    const queryClient = useQueryClient();
    return useMutation(() => updateWebinar(id, title, heldOn), {
        onSuccess: () => {
            queryClient.prefetchQuery('webinars', () => getWebinars());
        },
    });
}

const addWebinar = async (title, heldOn) => {
    const { error } = await supabase
        .from('webinars')
        .insert({ title: title, held_on: heldOn, open_registration: false });

    if (error) throw new Error(error.message);
};

export function useAddWebinar(title, heldOn) {
    const queryClient = useQueryClient();
    return useMutation(() => addWebinar(title, heldOn), {
        onSuccess: () => {
            queryClient.prefetchQuery('webinars', () => getWebinars());
        },
    });
}
