import { useRouter } from 'next/router';
import { NewspaperIcon, StarIcon, PencilIcon } from '@heroicons/react/solid';

const iconStyle = 'w-6 h-6 md:w-4 md:h-4';

const tabMenus = [
    {
        title: 'Latest Blog',
        path: '/blog',
        icon: <NewspaperIcon className={iconStyle} />,
    },
    {
        title: 'My Blog',
        path: '/blog/myblog',
        icon: <StarIcon className={iconStyle} />,
    },
    {
        title: 'Write a Blog',
        path: '/blog/write',
        icon: <PencilIcon className={iconStyle} />,
    },
];

export default function Tab() {
    const router = useRouter();

    return (
        <div className='mb-8'>
            <div className='flex gap-4 p-4 bg-gray-100 rounded-2xl'>
                {tabMenus.map((menu, idx) => {
                    let color =
                        menu.path === router.pathname
                            ? 'bg-white text-blue-500 shadow-xl'
                            : 'bg-gray-100 hover:bg-white hover:text-blue-500';

                    return (
                        <button
                            onClick={() => router.push(menu.path)}
                            key={idx}
                            className={`flex gap-2 justify-center items-center flex-1 h-10 text-sm tracking-wide font-semibold rounded-lg ${color}`}>
                            {menu.icon}
                            <p className='hidden md:block'>{menu.title}</p>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
