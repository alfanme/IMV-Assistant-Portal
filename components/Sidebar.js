import Image from 'next/image';
import {
    HomeIcon,
    UserIcon,
    PencilAltIcon,
    VideoCameraIcon,
    LightningBoltIcon,
    BeakerIcon,
} from '@heroicons/react/solid';
import { useRouter } from 'next/router';

const iconStyle = 'w-6 h-6';

const menuItems = [
    {
        title: 'Home',
        path: '/',
        icon: <HomeIcon className={iconStyle} />,
    },
    {
        title: 'Profile',
        path: '/profile',
        icon: <UserIcon className={iconStyle} />,
    },
    {
        title: 'Blog',
        path: '/blog',
        icon: <PencilAltIcon className={iconStyle} />,
    },
    {
        title: 'Webinar',
        path: '/webinar',
        icon: <VideoCameraIcon className={iconStyle} />,
    },
    {
        title: 'Training',
        path: '/training',
        icon: <LightningBoltIcon className={iconStyle} />,
    },
    {
        title: 'Reasearch & Publication',
        path: '/research',
        icon: <BeakerIcon className={iconStyle} />,
    },
];

export default function SideBar() {
    const router = useRouter();

    return (
        <div className='sticky top-0 left-0 flex-shrink-0 flex flex-col px-8 py-8 w-80 h-screen text-white'>
            <div className='flex items-center space-x-4 mb-16'>
                <Image
                    src='/logo.webp'
                    width={42}
                    height={42}
                    objectFit='contain'
                    alt='IMV Logo'
                />
                <div>
                    <h1 className='text-lg font-semibold'>IMV Laboratory</h1>
                    <p className='text-xs'>Assistants & Alumni Portal</p>
                </div>
            </div>
            <ul className='space-y-3 -mx-2'>
                {menuItems.map((menu, idx) => {
                    let color =
                        menu.path === router.pathname
                            ? 'bg-blue-500 text-white hover:bg-blue-500 hover:text-white'
                            : 'bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white';
                    return (
                        <li
                            onClick={() => router.push(menu.path)}
                            key={idx}
                            className={`flex items-center space-x-8 px-4 py-4 rounded-xl ${color} cursor-pointer`}>
                            {menu.icon}
                            <p>{menu.title}</p>
                        </li>
                    );
                })}
            </ul>
            <footer className='mt-auto'>
                <p>©2021 IMV Laboratory 🇮🇩</p>
            </footer>
        </div>
    );
}
