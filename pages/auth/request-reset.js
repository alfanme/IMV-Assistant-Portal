import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { KeyIcon, MailIcon } from '@heroicons/react/solid';
import { supabase } from '../../utils/supabaseClient';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function requestReset() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [userAccessToken, setUserAccessToken] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const { accessToken } = router.query;
        setUserAccessToken(accessToken);
    }, []);

    const handleRequestReset = () => {
        const { error } = supabase.auth.api.resetPasswordForEmail(email);
        if (error) setErrorMessage(error.message);
        alert('Please your email for password reset link!');
    };

    const handleUpdatePassword = async () => {
        if (newPassword === confirmNewPassword) {
            const { data, error } = await supabase.auth.api.updateUser(
                userAccessToken,
                {
                    password: newPassword,
                }
            );
            if (error) setErrorMessage(error.message);
            if (data) {
                alert('Password is successfully changed!');
                router.replace('/auth');
            }
        } else {
            setErrorMessage('You typed different passwords');
        }
    };

    const inputClass =
        'w-full h-12 px-4 rounded-lg bg-gray-100 focus:outline-none';

    return (
        <>
            <Head>
                <title>Reset Password - Assistant Portal</title>
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
                    <p className='text-sm font-semibold text-red-500'>
                        {errorMessage}
                    </p>

                    {userAccessToken ? (
                        <>
                            <input
                                onChange={e => setNewPassword(e.target.value)}
                                defaultValue={newPassword}
                                type='password'
                                placeholder='New password'
                                className={inputClass}
                                id='new-password'
                            />
                            <input
                                onChange={e =>
                                    setConfirmNewPassword(e.target.value)
                                }
                                defaultValue={confirmNewPassword}
                                type='password'
                                placeholder='Confirm New Password'
                                className={inputClass}
                                id='confirm-password'
                            />
                            <button
                                onClick={handleUpdatePassword}
                                className='flex justify-center items-center space-x-2 w-full h-12 rounded-lg bg-blue-500 text-white'>
                                <p className='uppercase text-sm font-semibold tracking-wide'>
                                    Reset Password
                                </p>
                                <KeyIcon className='w-4 h-4' />
                            </button>
                        </>
                    ) : (
                        <>
                            <input
                                onChange={e => setEmail(e.target.value)}
                                defaultValue={email}
                                type='email'
                                placeholder='Email'
                                className={inputClass}
                                id='email'
                            />
                            <button
                                onClick={handleRequestReset}
                                className='flex justify-center items-center space-x-2 w-full h-12 rounded-lg bg-blue-500 text-white'>
                                <p className='uppercase text-sm font-semibold tracking-wide'>
                                    Send Reset Link
                                </p>
                                <MailIcon className='w-4 h-4' />
                            </button>
                            <Link href='/auth'>
                                <a className='mt-2 text-sm text-blue-500 hover:underline'>
                                    Back to login page
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
