import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Loading from '../../components/Loading';
import { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { LoginIcon } from '@heroicons/react/outline';

export default function login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignUp = async () => {
        try {
            setLoading(true);
            const { user, error } = await supabase.auth.signUp({
                email,
                password,
            });
            if (error) setErrorMessage(error.message);
            if (user) alert('Please confirm your email before login!');
        } catch (error) {
            setErrorMessage(error);
        } finally {
            setLoading(false);
            setSignUp(false);
        }
    };

    const handleLogin = async () => {
        try {
            setLoading(true);
            const { user, error } = await supabase.auth.signIn({
                email,
                password,
            });
            if (error?.message === 'Email not confirmed')
                alert('Please confirm your email before login!');
            if (error) setErrorMessage(error.message);
            if (user) {
                try {
                    const { data: profile, error: profileError } =
                        await supabase
                            .from('profiles')
                            .select('email')
                            .match({ email: user.email });

                    if (profileError) console.log(profileError);
                    await console.log('profile email', profile);
                    if (profile.length === 0) {
                        const { error } = await supabase
                            .from('profiles')
                            .insert(
                                {
                                    user_id: user.id,
                                    email: user.email,
                                },
                                { returning: 'minimal' }
                            );
                        if (error) setErrorMessage(error.message);
                    } else {
                        console.log('Profile sudah ada');
                    }
                } catch (error) {
                    setErrorMessage(error);
                }
            }
        } catch (error) {
            setErrorMessage(error);
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        'w-full h-12 px-4 rounded-lg bg-gray-100 focus:outline-none';

    if (loading) return <Loading />;
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
                        <p className='text-sm font-semibold text-red-500 text-center'>
                            {errorMessage}
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
                                    onClick={handleSignUp}
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
                                    onClick={handleLogin}
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
                        ©2021 IMV Laboratory | Bandung, Indonesia 🇮🇩
                    </p>
                </main>
            </>
        );
}
