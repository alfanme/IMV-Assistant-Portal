import Layout from '../../../components/Layout';
import { useReadBlog } from '../../../hooks/useBlog';
import Loading from '../../../components/Loading';
import { ArrowNarrowLeftIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertFromRaw } from 'draft-js';
import DateInfo from '../../../components/Blog/DateInfo';
import Image from 'next/image';

const Editor = dynamic(
    () => import('react-draft-wysiwyg').then(mod => mod.Editor),
    { ssr: false }
);

export default function post({ slug }) {
    const { data: readBlogData, isLoading } = useReadBlog({ slug });
    const router = useRouter();

    if (isLoading) return <Loading />;

    return (
        <Layout>
            <button
                onClick={() => router.back()}
                className='flex items-center gap-2 -ml-2 mb-4 p-2 w-20 hover:text-blue-500'>
                <ArrowNarrowLeftIcon className='w-4 h-4' />
                <p className='font-semibold'>Back</p>
            </button>
            <h1 className='mb-4'>{readBlogData?.title}</h1>

            <DateInfo timestamp={readBlogData.created_at} />

            <div className='flex items-center gap-2 mt-4'>
                <Image
                    src={readBlogData.author.photoURL}
                    width='32'
                    height='32'
                    layout='fixed'
                    className='rounded-full'
                />
                <div className=''>
                    <p className='text-xs font-semibold'>
                        {readBlogData.author.fullname}
                    </p>
                    <p className='text-xs text-gray-500'>
                        {readBlogData.author.imv_role}
                    </p>
                </div>
            </div>

            <Editor
                wrapperClassName='mt-4'
                toolbarClassName='hide-toolbar'
                editorState={EditorState.createWithContent(
                    convertFromRaw(JSON.parse(readBlogData.body))
                )}
                readOnly={true}
            />
        </Layout>
    );
}

export const getServerSideProps = async context => {
    const { slug } = context.query;
    if (!slug) {
        slug = null;
    }

    return { props: { slug } };
};
