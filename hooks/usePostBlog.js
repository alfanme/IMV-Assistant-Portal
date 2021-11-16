import { useMutation } from 'react-query';
import { supabase } from '../utils/supabaseClient';
import slugger from 'slugger';

const postBlog = async ({ title, body }) => {
    const authorId = supabase.auth.user().id;
    const slug = slugger(title);

    const { data: blogPost, error: blogPostError } = await supabase
        .from('blog_post')
        .insert({
            title,
            body,
            author_id: authorId,
            slug,
        });

    if (blogPostError) throw new Error(blogPostError.message);
};

export function usePostBlog({ title, body }) {
    return useMutation(() => postBlog({ title, body }));
}

const updateBlog = async ({ title, body, blogId }) => {
    const slug = slugger(title);

    console.log('Blog ID: ', blogId);

    const { data: blogUpdates, error: blogUpdatesError } = await supabase
        .from('blog_post')
        .update({
            title,
            body,
            slug,
        })
        .match({ id: blogId });

    if (blogUpdatesError) throw new Error(blogUpdatesError.message);
    if (blogUpdates) alert('You blog was successfully updated!');
};

export function useUpdateBlog({ title, body, blogId }) {
    return useMutation(() => updateBlog({ title, body, blogId }));
}

const deleteBlog = async ({ blogId }) => {
    console.log(blogId);
    const { data, error } = await supabase
        .from('blog_post')
        .delete()
        .match({ id: blogId });

    if (error) throw new Error(error.message);
    if (data) alert('Blog was successfully deleted!');
};

export function useDeleteBlog({ blogId }) {
    return useMutation(() => deleteBlog({ blogId }));
}
