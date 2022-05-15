import Layout from '../../components/Layout';
import dynamic from 'next/dynamic';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { useState, useEffect } from 'react';
import { usePostBlog, useUpdateBlog } from '../../hooks/usePostBlog';
import { useRouter } from 'next/router';

const Editor = dynamic(
    () => import('react-draft-wysiwyg').then(mod => mod.Editor),
    { ssr: false }
);

export default function write() {
    const router = useRouter();
    const { existingTitle, existingBody, blogId } = router.query;

    // states
    const [blogTitle, setBlogTitle] = useState(() =>
        existingTitle ? existingTitle : ''
    );
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    useEffect(() => {
        if (existingBody) {
            setEditorState(
                EditorState.createWithContent(
                    convertFromRaw(JSON.parse(existingBody))
                )
            );
        }
    }, [existingBody]);

    // mutation hook
    const postBlogMutation = usePostBlog({
        title: blogTitle,
        body: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
    });

    const updateBlogMutation = useUpdateBlog({
        title: blogTitle,
        body: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
        blogId,
    });

    // mutation hook side effects
    useEffect(() => {
        if (postBlogMutation.isSuccess) {
            alert('Blog posted!');
        }

        if (postBlogMutation.isError) {
            alert(postBlogMutation.error.message);
        }
    }, [postBlogMutation.status]);

    return (
        <Layout>
            <h2 className='md:hidden ml-4 mb-4 text-blue-500'>Write Blog</h2>
            <div className='flex flex-col justify-center p-4 border-4 border-gray-100 rounded-lg'>
                <input
                    defaultValue={blogTitle}
                    onChange={e => setBlogTitle(e.target.value)}
                    className='h-12 px-4 rounded-md text-lg bg-gray-100 mb-4'
                    type='text'
                    placeholder='Blog Title'
                />
                <Editor
                    editorClassName='px-2 mt-4'
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                    toolbar={{
                        inline: {
                            options: [
                                'bold',
                                'italic',
                                'underline',
                                'strikethrough',
                                'monospace',
                            ],
                        },
                        fontSize: { className: 'hidden' },
                        fontFamily: { className: 'hidden' },
                        blockType: {
                            inDropdown: false,
                            options: [
                                'Normal',
                                'H1',
                                'H2',
                                'Blockquote',
                                'Code',
                            ],
                        },
                    }}
                />
            </div>
            <button
                onClick={() => {
                    if (existingBody) updateBlogMutation.mutate();
                    else postBlogMutation.mutate();
                    router.push('/blog');
                }}
                className='mt-4 h-12 rounded-lg text-white bg-blue-500'>
                Save
            </button>
        </Layout>
    );
}
