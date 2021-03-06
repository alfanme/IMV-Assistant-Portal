import Layout from '../../components/Layout';
import { useAllBlog } from '../../hooks/useBlog';
import BlogCard from '../../components/Blog/Card';
import Loading from '../../components/Loading';

export default function index() {
    const { data: allBlogData, isLoading } = useAllBlog();

    if (isLoading) return <Loading />;
    return (
        <Layout>
            <h2 className='md:hidden ml-4 mb-4 text-blue-500'>Latest Blog</h2>
            <div className='gap-8 md:columns-2'>
                {allBlogData?.map((data, idx) => (
                    <BlogCard key={data.id} blogData={data} />
                ))}
            </div>
        </Layout>
    );
}
