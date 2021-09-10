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
        <div className='flex bg-gray-900'>
            <Sidebar />
            <div className='w-full h-screen bg-white rounded-l-[2em] overflow-y-scroll overflow-x-hidden'>
                <Topbar />
                <div className='px-8 pb-8'>{children}</div>
            </div>
        </div>
    );
}
