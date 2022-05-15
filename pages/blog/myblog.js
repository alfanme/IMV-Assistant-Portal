import Layout from '../../components/Layout';
import { useMyBlog } from '../../hooks/useBlog';
import Loading from '../../components/Loading';
import BlogCard from '../../components/Blog/Card';

export default function myblog() {
    const { data: myBlogData, isLoading } = useMyBlog();

    if (isLoading) return <Loading />;

    return (
        <Layout>
            <h2 className='md:hidden ml-4 mb-4 text-blue-500'>My Blog</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                {myBlogData?.map((data, idx) => (
                    <BlogCard key={idx} blogData={data} />
                ))}
            </div>
        </Layout>
    );
}
