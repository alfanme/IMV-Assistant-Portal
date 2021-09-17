import Sidebar from './Sidebar';
import Topbar from './Topbar';
import useProfile from '../hooks/useProfile';
import { useRouter } from 'next/router';
import Loading from './Loading';

export default function Layout({ children }) {
    const router = useRouter();
    const { isLoading, isError } = useProfile();

    if (isLoading) return <Loading />;

    if (isError) {
        router.replace('/auth');
        return <Loading />;
    }

    return (
        <div className='flex flex-col md:flex-row md:bg-gray-900'>
            <Sidebar />
            <div className='pb-24 md:pb-0 w-full h-screen bg-white rounded-b-2xl md:rounded-none md:rounded-l-[2em] md:overflow-y-scroll md:overflow-x-hidden'>
                <Topbar />
                <div className='flex flex-col p-4 pb-32 md:p-8'>{children}</div>
            </div>
        </div>
    );
}
