import Layout from '../../components/Layout';
import BlogLayout from '../../components/Blog/Layout';
import { useAllBlog } from '../../hooks/useBlog';
import BlogCard from '../../components/Blog/Card';
import Loading from '../../components/Loading';

export default function index() {
    const { data: allBlogData, isLoading } = useAllBlog();

    if (isLoading) return <Loading />;
    return (
        <Layout>
            <BlogLayout>
                <div className='flex flex-col gap-8'>
                    {allBlogData?.map((data, idx) => (
                        <BlogCard key={idx} blogData={data} />
                    ))}
                </div>
            </BlogLayout>
        </Layout>
    );
}
