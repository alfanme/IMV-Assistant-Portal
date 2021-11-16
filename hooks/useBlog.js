import { useQuery } from 'react-query';
import { supabase } from '../utils/supabaseClient';

const getAllBlog = async () => {
    const { data, error } = await supabase
        .from('blog_post')
        .select(
            `
            id,
            created_at,
            title,
            body,
            slug,
            author:profiles (
                user_id,
                fullname,
                imv_role,
                photoURL
            )
        `
        )
        .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    if (!data) throw new Error('Blog post not found!');

    return data;
};

export function useAllBlog() {
    return useQuery('allBlog', () => getAllBlog());
}

const getMyBlog = async ({ authorId }) => {
    const { data, error } = await supabase
        .from('blog_post')
        .select(
            `
            id,
        created_at,
        title,
        body,
        slug,
        author:profiles (
            user_id,
            fullname,
            imv_role,
            photoURL
        )
        `
        )
        .eq('author_id', authorId)
        .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    if (!data) throw new Error('Blog post not found!');

    return data;
};

export function useMyBlog() {
    const userId = supabase.auth.user()?.id;
    return useQuery('myBlog', () => getMyBlog({ authorId: userId }));
}

const getReadBlog = async ({ slug }) => {
    const { data, error } = await supabase
        .from('blog_post')
        .select(
            `
            id,
        created_at,
        title,
        body,
        slug,
        author:profiles (
            user_id,
            fullname,
            imv_role,
            photoURL
        )
        `
        )
        .eq('slug', slug)
        .single();

    if (error) throw new Error(error.message);
    if (!data) throw new Error('Blog post not found!');

    return data;
};

export function useReadBlog({ slug }) {
    return useQuery('readBlog', () => getReadBlog({ slug }));
}
