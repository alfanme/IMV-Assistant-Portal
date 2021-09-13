import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useProfile } from '../store/profileContext';
import { supabase } from '../utils/supabaseClient';
import { useEffect } from 'react';

export default function Layout({ children }) {
    const { getProfile, emptyProfile } = useProfile();
    const user = supabase.auth.user();

    useEffect(() => {
        if (user) getProfile(user.id);
        else emptyProfile();
    }, [user]);

    return (
        <>
            <style></style>
            <div className='flex flex-col md:flex-row md:bg-gray-900'>
                <Sidebar />
                <div className='pb-24 md:pb-0 w-full h-screen bg-white rounded-b-2xl md:rounded-none md:rounded-l-[2em] md:overflow-y-scroll md:overflow-x-hidden'>
                    <Topbar />
                    <div className='p-4 pb-32 md:p-8'>{children}</div>
                </div>
            </div>
        </>
    );
}
