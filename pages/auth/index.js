import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Loading from '../../components/Loading';
import { useState, useEffect } from 'react';
import { LoginIcon } from '@heroicons/react/outline';
import useCreateUser from '../../hooks/useSignUp';
import useLogin from '../../hooks/useLogin';
import useProfile from '../../hooks/useProfile';
import { useRouter } from 'next/router';

export default function login() {
    const router = useRouter();
    console.log('Rerender:', router.pathname);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const [message, setMessage] = useState({
        text: '',
        color: '',
    });

    const { data: profile, isSuccess, isLoading } = useProfile();

    if (isSuccess && profile) {
        router.replace('/');
    }

    const createUserMutation = useCreateUser({
        email,
        password,
    });

    const loginMutation = useLogin({
        email,
        password,
    });

    useEffect(() => {
        if (createUserMutation.isLoading) {
            setLoading(true);
        }

        if (createUserMutation.isSuccess) {
            setLoading(false);
            setSignUp(false);
            setMessage({
                text: 'Please confirm your email address!',
                color: 'text-blue-500',
            });
        }

        if (createUserMutation.isError) {
            setLoading(false);
            setSignUp(true);
            setMessage({
                text: createUserMutation.error.message,
                color: 'text-red-500',
            });
        }

        console.log('SignUp status:', createUserMutation.status);
    }, [createUserMutation.status]);

    useEffect(() => {
        if (loginMutation.isLoading) {
            setLoading(true);
        }

        if (loginMutation.isSuccess) {
            setLoading(false);
            router.replace('/');
        }

        if (loginMutation.isError) {
            setLoading(false);
            setMessage({
                text: loginMutation.error.message,
                color: 'text-red-500',
            });
        }

        console.log('Login status:', loginMutation.status);
    }, [loginMutation.status]);

    const inputClass =
        'w-full h-12 px-4 rounded-lg bg-gray-100 focus:outline-none';

    if (loading || isLoading) return <Loading />;
    else
        return (
            <>
                <Head>
                    <title>Login - Assistants Portal</title>
                </Head>
                <main className='flex flex-col justify-center items-center h-screen bg-white'>
                    <div className='mt-auto mb-4'>
                        <Image
                            src='/logo.webp'
                            width={56}
                            height={56}
                            objectFit='contain'
                            alt='IMV Logo'
                        />
                    </div>
                    <h1 className='mb-8 text-2xl font-bold'>
                        Assistants & Alumni Portal
                    </h1>

                    <div className='flex flex-col items-center w-80 mb-16 gap-y-4'>
                        <p
                            className={`text-sm font-semibold ${message.color} text-center`}>
                            {message.text}
                        </p>
                        <input
                            onChange={e => setEmail(e.target.value)}
                            defaultValue={email}
                            type='email'
                            placeholder='Email'
                            className={inputClass}
                            id='email'
                        />
                        <input
                            onChange={e => setPassword(e.target.value)}
                            defaultValue={password}
                            type='password'
                            placeholder='Password'
                            className={inputClass}
                            id='password'
                        />
                        {signUp ? (
                            <>
                                <button
                                    onClick={() => createUserMutation.mutate()}
                                    className='flex justify-center items-center space-x-2 w-full h-12 rounded-lg bg-pink-500 text-white'>
                                    <p className='uppercase text-sm font-semibold tracking-wide'>
                                        Sign Up
                                    </p>
                                    <LoginIcon className='w-4 h-4' />
                                </button>
                                <p className='text-sm mt-4'>
                                    Already have an account?{' '}
                                    <span
                                        onClick={() => setSignUp(false)}
                                        className='font-semibold text-blue-500 hover:underline cursor-pointer'>
                                        Login
                                    </span>
                                </p>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => loginMutation.mutate()}
                                    className='flex justify-center items-center space-x-2 w-full h-12 rounded-lg bg-blue-500 text-white'>
                                    <p className='uppercase text-sm font-semibold tracking-wide'>
                                        Login
                                    </p>
                                    <LoginIcon className='w-4 h-4' />
                                </button>
                                <p className='text-sm mt-4'>
                                    Don't have account?{' '}
                                    <span
                                        onClick={() => setSignUp(true)}
                                        className='font-semibold text-pink-500 hover:underline cursor-pointer'>
                                        Sign up
                                    </span>
                                </p>
                                <Link href='/auth/request-reset'>
                                    <a className='text-sm text-blue-500 hover:underline'>
                                        Forgot your password?
                                    </a>
                                </Link>
                            </>
                        )}
                    </div>
                    <p className='mt-auto mb-2'>
                        ©{new Date().getFullYear()} IMV Laboratory | Bandung,
                        Indonesia 🇮🇩
                    </p>
                </main>
            </>
        );
}
