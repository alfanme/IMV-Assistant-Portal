import Image from 'next/image';
import dynamic from 'next/dynamic';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertFromRaw } from 'draft-js';
import { useRouter } from 'next/router';
import DateInfo from '../DateInfo';
import { CogIcon, TrashIcon } from '@heroicons/react/solid';
import useProfile from '../../hooks/useProfile';
import Modal from '../../components/Modal';
import { useState, useEffect } from 'react';
import { useDeleteBlog } from '../../hooks/usePostBlog';

const Editor = dynamic(
    () => import('react-draft-wysiwyg').then(mod => mod.Editor),
    { ssr: false }
);

export default function Card({ blogData }) {
    const { id, created_at, title, body, slug, author } = blogData;
    const { data: userProfile } = useProfile();
    const router = useRouter();

    const [previewBody, setPreviewBody] = useState(JSON.parse(body));
    const [thumbnailIsExist, setThumbnailIsExist] = useState(false);
    useEffect(() => {
        const parsedBody = JSON.parse(body);
        let thumbnail;
        for (let row of parsedBody['blocks']) {
            if (row.type === 'atomic') {
                thumbnail = row;
                setThumbnailIsExist(true);
                break;
            }
        }

        parsedBody['blocks'] = [thumbnail];

        setPreviewBody(parsedBody);
    }, []);

    const readBlog = () => {
        router.push(`/blog/post/${slug}`);
    };

    const [showModal, setShowModal] = useState(false);
    const deleteBlogMutation = useDeleteBlog({ blogId: id });
    const editBlogHandler = () => {
        router.push({
            pathname: '/blog/write',
            query: { existingTitle: title, existingBody: body, blogId: id },
        });
    };

    return (
        <div className='relative mb-8 w-full break-inside-avoid-column'>
            <div
                onClick={readBlog}
                className='group p-6 rounded-xl cursor-pointer hover:shadow-xl hover:shadow-gray-200'>
                <h2 className='mb-2 group-hover:text-blue-500'>{title}</h2>
                <DateInfo timestamp={created_at} />
                {thumbnailIsExist && (
                    <Editor
                        editorClassName='my-4'
                        toolbarClassName='hide-toolbar'
                        editorState={EditorState.createWithContent(
                            convertFromRaw(previewBody)
                        )}
                        readOnly={true}
                    />
                )}

                <div className='flex items-center gap-2 mt-4'>
                    <Image
                        src={author.photoURL}
                        width='32'
                        height='32'
                        layout='fixed'
                        objectFit='cover'
                        className='rounded-full'
                    />
                    <div className=''>
                        <p className='text-xs font-semibold'>
                            {author.fullname}
                        </p>
                        <p className='text-xs text-gray-500'>
                            {author.imv_role}
                        </p>
                    </div>
                </div>
            </div>
            {userProfile?.user_id === author.user_id && (
                <div className='absolute bottom-6 right-6 flex items-center gap-4'>
                    <button
                        onClick={editBlogHandler}
                        className='flex items-center gap-1 px-2 md:px-4 py-2 text-xs font-medium text-yellow-500 shadow-lg hover:shadow-md rounded-lg'>
                        <CogIcon className='w-4 h-4' />
                    </button>
                    <button
                        onClick={() => setShowModal(true)}
                        className
                        className='flex items-center gap-1 px-2 md:px-4 py-2 text-xs font-medium text-red-500 shadow-lg hover:shadow-md rounded-lg'>
                        <TrashIcon className='w-4 h-4' />
                    </button>
                </div>
            )}
            <Modal
                isShown={showModal}
                title={'Delete Blog Post'}
                message={'Are you sure to delete this blog post?'}
                onClickNo={() => setShowModal(false)}
                onClickYes={() => {
                    deleteBlogMutation.mutate();
                    setShowModal(false);
                }}
            />
        </div>
    );
}
