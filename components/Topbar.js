import Image from 'next/image';
import { LogoutIcon } from '@heroicons/react/outline';
import { supabase } from '../utils/supabaseClient';
import { useProfile } from '../store/profileContext';
import { useRouter } from 'next/router';

export default function Topbar() {
    const router = useRouter();
    const { profile } = useProfile();

    console.log(profile);

    const RoleBadge = () => {
        let pathname = router.pathname;
        let rolename = '';

        if (profile.imv_role && profile.webinar_role && profile.training_role) {
            if (pathname === '/webinar') rolename = profile.webinar_role;
            else if (pathname === '/training') rolename = profile.training_role;
            else rolename = profile.imv_role;
        } else {
            rolename = 'No Role';
        }

        return (
            <div className='px-4 py-2 rounded-lg text-blue-500 bg-blue-100'>
                <p className='text-xs md:text-md font-semibold md:text-md'>
                    {rolename}
                </p>
            </div>
        );
    };

    return (
        <div className='sticky top-0 left-0 p-4 md:p-8 flex justify-end z-10 bg-white'>
            <div className='flex justify-between items-center w-full'>
                <RoleBadge />
                <div className='flex items-center gap-x-4'>
                    <div className='text-right'>
                        <p className='text-sm md:text-lg font-semibold'>
                            {profile.fullname
                                ? profile.fullname
                                : profile.email}
                        </p>
                        <div
                            onClick={() => supabase.auth.signOut()}
                            className='flex justify-end items-center space-x-1 text-gray-500 cursor-pointer'>
                            <LogoutIcon className='w-4 h-4' />
                            <p className='text-xs'>Sign out</p>
                        </div>
                    </div>
                    <Image
                        src={
                            profile.photoURL
                                ? profile.photoURL
                                : '/userDefaultPhoto.png'
                        }
                        width={50}
                        height={50}
                        objectFit='cover'
                        alt='Profile Photo'
                        className='rounded-full'
                    />
                </div>
            </div>
        </div>
    );
}
