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
import { useState, useEffect } from 'react';

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
    const [mainPath, setMainPath] = useState('/');

    // check if path has subpath, then extract only the main path
    useEffect(() => {
        let path = router.pathname;
        let pathSplits = path.split('/');
        if (pathSplits.length > 2) {
            setMainPath(`/${pathSplits[1]}`);
        } else {
            setMainPath(path);
        }
    }, []);

    return (
        <div className='fixed bottom-0 md:sticky md:top-0 md:left-0 z-10 flex-shrink-0 flex md:flex-col justify-center md:justify-start items-center md:items-baseline p-4 md:p-8 w-screen md:w-80 h-20 md:h-screen text-gray-800 md:text-white bg-white md:bg-gray-900'>
            <div className='hidden md:flex items-center space-x-4 mb-16'>
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
            <ul className='flex flex-row md:flex-col justify-between md:justify-start md:gap-3 md:-mx-2 px-1 md:px-0 w-full md:w-auto'>
                {menuItems.map((menu, idx) => {
                    let color =
                        menu.path === mainPath
                            ? 'bg-blue-100 md:bg-blue-500 text-blue-500 md:text-white hover:bg-blue-100 md:hover:bg-blue-500 hover:text-blue-500 md:hover:text-white'
                            : 'bg-white md:bg-gray-900 text-gray-400 hover:bg-gray-100 md:hover:bg-gray-800 hover:text-gray-800 md:hover:text-white';

                    return (
                        <li
                            onClick={() => router.push(menu.path)}
                            key={idx}
                            className={`flex justify-center md:justify-start items-center gap-x-8 p-3 md:p-4 rounded-xl ${color} cursor-pointer`}>
                            {menu.icon}
                            <p className='hidden md:block'>{menu.title}</p>
                        </li>
                    );
                })}
            </ul>
            <footer className='mt-auto hidden md:block'>
                <p>©2021 IMV Laboratory 🇮🇩</p>
            </footer>
        </div>
    );
}
