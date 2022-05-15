import {
    NewspaperIcon,
    StarIcon,
    PencilIcon,
    FireIcon,
    CogIcon,
} from '@heroicons/react/solid';

export const tabMenus = {
    blog: [
        {
            title: 'Latest Blog',
            path: '/blog',
            icon: NewspaperIcon,
        },
        {
            title: 'My Blog',
            path: '/blog/myblog',
            icon: StarIcon,
        },
        {
            title: 'Write a Blog',
            path: '/blog/write',
            icon: PencilIcon,
        },
    ],
    webinar: [
        {
            title: 'On Going',
            path: '/webinar',
            icon: FireIcon,
        },
        {
            title: 'Setting',
            path: '/webinar/setting',
            icon: CogIcon,
        },
    ],
};
