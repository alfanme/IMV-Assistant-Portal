import Image from 'next/image';
import { LogoutIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import useProfile from '../hooks/useProfile';
import useLogOut from '../hooks/useLogout';

export default function Topbar() {
    const router = useRouter();

    const { data: profile } = useProfile();
    const logoutMutation = useLogOut();

    if (logoutMutation.isSuccess) {
        router.replace('/auth');
    }

    const RoleBadge = () => {
        let pathname = router.pathname;
        let rolename = '';

        if (
            profile?.imv_role &&
            profile?.webinar_role &&
            profile?.training_role
        ) {
            if (pathname === '/webinar') rolename = profile?.webinar_role;
            else if (pathname === '/training')
                rolename = profile?.training_role;
            else rolename = profile?.imv_role;
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
        <div className='sticky top-0 left-0 px-4 py-2 md:px-8 md:py-4 flex justify-end z-10 bg-white'>
            <div className='flex justify-between items-center w-full'>
                <RoleBadge />
                <div className='flex items-center gap-x-4'>
                    <div className='text-right'>
                        <p className='text-sm md:text-lg font-semibold'>
                            {profile?.fullname
                                ? profile?.fullname
                                : profile?.email}
                        </p>
                        <div
                            onClick={() => logoutMutation.mutate()}
                            className='flex justify-end items-center space-x-1 text-gray-500 cursor-pointer'>
                            <LogoutIcon className='w-4 h-4' />
                            <p className='text-xs'>Sign out</p>
                        </div>
                    </div>
                    <Image
                        src={
                            profile?.photoURL
                                ? profile?.photoURL
                                : '/userDefaultPhoto.png'
                        }
                        width={42}
                        height={42}
                        objectFit='cover'
                        alt='Profile Photo'
                        className='rounded-full'
                    />
                </div>
            </div>
        </div>
    );
}
