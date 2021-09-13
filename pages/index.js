import Head from 'next/head';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Image from 'next/image';
import { PencilIcon } from '@heroicons/react/solid';

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const hashString = window.location.hash;

        if (hashString) {
            const hashSplits = hashString.split('&');
            const hashObj = {
                accessToken: hashSplits[0].split('=')[1],
                type: hashSplits[4].split('=')[1],
            };

            if (hashObj.type === 'recovery') {
                router.push({
                    pathname: '/auth/request-reset',
                    query: hashObj,
                });
            }
        }
    }, []);

    return (
        <Layout>
            <h1 className='text-2xl font-semibold'>Welcome home!</h1>
            <div className='flex flex-col-reverse md:flex-row items-center justify-evenly'>
                <Image
                    src='/home_illustration.png'
                    width={500}
                    height={500}
                    objectFit='contain'
                />

                <div className='w-full md:w-1/2'>
                    <h1 className='text-3xl font-bold mt-8 md:mt-0 mb-8'>
                        Hi there! 👋🏻
                    </h1>
                    <p className='text-lg'>
                        Now with{' '}
                        <span className='font-semibold text-blue-500'>
                            IMV Assistants & Alumni Portal
                        </span>
                        , you can manage your profile, write a blog, organize
                        upcoming events, and many more!
                    </p>
                    <p className='text-lg mt-8'>
                        Let's starts by completing your profile info!
                    </p>
                    <button
                        onClick={() => router.push('/profile')}
                        className='flex justify-center items-center gap-4 mt-8 px-6 h-12 rounded-lg uppercase font-semibold text-sm text-white bg-blue-500 focus:outline-none hover:bg-blue-700'>
                        <p>Edit your profile</p>
                        <PencilIcon className='w-6 h-6' />
                    </button>
                </div>
            </div>
        </Layout>
    );
}
