import Layout from '../components/Layout';
import { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import { ChevronDownIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import useProfile from '../hooks/useProfile';
import useUpdateProfile from '../hooks/useUpdateProfile';
import { imvRoles, webinarRoles, trainingRoles } from '../shared/data';

export default function profile() {
    const {
        data: profileInitialData,
        isLoading,
        isSuccess,
        status,
        refetch: refetchProfile,
    } = useProfile();

    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [userPhoto, setUserPhoto] = useState();

    useEffect(() => {
        if (isSuccess) {
            setProfile(profileInitialData);
            setUserPhoto(profileInitialData.photoURL);
        }
    }, [status]);

    const updateProfileMutation = useUpdateProfile(profile, imageFile);

    useEffect(() => {
        if (updateProfileMutation.isLoading) {
            setLoading(true);
        }

        if (updateProfileMutation.isSuccess) {
            refetchProfile();
            setLoading(false);
        }

        if (updateProfileMutation.isError) {
            alert(updateProfileMutation.error.message);
        }
    }, [updateProfileMutation.status]);

    const handleUpdateProfile = () => {
        if (
            JSON.stringify(profile) !== JSON.stringify(profileInitialData) ||
            imageFile
        ) {
            updateProfileMutation.mutate();
        }
    };

    const inputClass =
        'mt-2 mb-4 w-full h-12 px-4 rounded-lg bg-gray-100 focus:outline-none';

    const [years, setYears] = useState([]);

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const established = 2010;

        let periods = [];

        for (let year = currentYear; year >= established; year--) {
            const period = `${year}-${year + 1}`;
            periods.push(period);
        }

        setYears(periods);
    }, []);

    if (loading || isLoading) return <Loading />;

    return (
        <Layout>
            <h1 className='text-2xl font-semibold mb-8'>Account Details</h1>
            <div className='flex flex-col'>
                <label htmlFor='user-photo'>Profile Picture</label>
                <div className='flex gap-x-4 items-center mt-2 mb-4'>
                    {userPhoto ? (
                        <Image
                            src={
                                imageFile
                                    ? URL.createObjectURL(imageFile)
                                    : userPhoto
                            }
                            onError={() =>
                                setUserPhoto('/userDefaultPhoto.png')
                            }
                            width={100}
                            height={100}
                            objectFit='cover'
                            className='rounded-full'
                        />
                    ) : (
                        <Image
                            src={
                                imageFile
                                    ? URL.createObjectURL(imageFile)
                                    : '/userDefaultPhoto.png'
                            }
                            width={100}
                            height={100}
                            objectFit='cover'
                            className='rounded-full'
                        />
                    )}
                    <input
                        type='file'
                        id='user-photo'
                        accept='image/*'
                        className={`mb-0 mt-0 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-500 hover:file:bg-blue-50`}
                        onChange={e => setImageFile(e.target.files[0])}
                    />
                </div>
                <label htmlFor='fullname'>Full name</label>
                <input
                    type='text'
                    onChange={e =>
                        setProfile({ ...profile, fullname: e.target.value })
                    }
                    defaultValue={profile?.fullname}
                    className={inputClass}
                    id='fullname'
                />
                <label htmlFor='email'>Email</label>
                <input
                    type='text'
                    onChange={e =>
                        setProfile({ ...profile, email: e.target.value })
                    }
                    defaultValue={profile?.email}
                    placeholder='Email'
                    className={inputClass}
                    id='email'
                />
                <label htmlFor='bio'>Bio</label>
                <input
                    type='text'
                    onChange={e =>
                        setProfile({ ...profile, bio: e.target.value })
                    }
                    defaultValue={profile?.bio}
                    className={inputClass}
                    id='bio'
                />
                <label htmlFor='professional-summary'>
                    Professional summary
                </label>
                <textarea
                    type='text'
                    onChange={e =>
                        setProfile({
                            ...profile,
                            professional_summary: e.target.value,
                        })
                    }
                    defaultValue={profile?.professional_summary}
                    className={`${inputClass} py-2 h-36 resize-none`}
                    id='professional-summary'
                />
                <label htmlFor='year'>Year</label>
                <div className='relative'>
                    <select
                        id='year'
                        value={profile?.year ? profile?.year : ''}
                        onChange={e =>
                            setProfile({
                                ...profile,
                                year: e.target.value,
                            })
                        }
                        className={`${inputClass} appearance-none cursor-pointer`}>
                        <option value=''>Select year</option>
                        {years.map((year, idx) => (
                            <option value={year} key={idx}>
                                {year}
                            </option>
                        ))}
                    </select>
                    <ChevronDownIcon className='absolute top-5 right-4 w-6 h-6 pointer-events-none' />
                </div>
                <label htmlFor='imv-role'>Select IMV role</label>
                <div className='relative'>
                    <select
                        id='imv-role'
                        value={profile?.imv_role ? profile?.imv_role : ''}
                        onChange={e =>
                            setProfile({
                                ...profile,
                                imv_role: e.target.value,
                            })
                        }
                        className={`${inputClass} appearance-none cursor-pointer`}>
                        {imvRoles.map((role, idx) => (
                            <option value={role.value} key={idx}>
                                {role.title}
                            </option>
                        ))}
                    </select>
                    <ChevronDownIcon className='absolute top-5 right-4 w-6 h-6 pointer-events-none' />
                </div>
                <label htmlFor='webinar-role'>Select Webinar role</label>
                <div className='relative'>
                    <select
                        id='webinar-role'
                        value={
                            profile?.webinar_role ? profile?.webinar_role : ''
                        }
                        onChange={e =>
                            setProfile({
                                ...profile,
                                webinar_role: e.target.value,
                            })
                        }
                        className={`${inputClass} appearance-none cursor-pointer`}>
                        {webinarRoles.map((role, idx) => (
                            <option value={role.value} key={idx}>
                                {role.title}
                            </option>
                        ))}
                    </select>
                    <ChevronDownIcon className='absolute top-5 right-4 w-6 h-6 pointer-events-none' />
                </div>
                <label htmlFor='training-role'>Select Training role</label>
                <div className='relative'>
                    <select
                        id='training-role'
                        value={
                            profile?.training_role ? profile?.training_role : ''
                        }
                        onChange={e =>
                            setProfile({
                                ...profile,
                                training_role: e.target.value,
                            })
                        }
                        className={`${inputClass} appearance-none cursor-pointer`}>
                        {trainingRoles.map((role, idx) => (
                            <option value={role.value} key={idx}>
                                {role.title}
                            </option>
                        ))}
                    </select>
                    <ChevronDownIcon className='absolute top-5 right-4 w-6 h-6 pointer-events-none' />
                </div>
                <label htmlFor='is-alumni'>Are you an alumni?</label>
                <div className='relative'>
                    <select
                        id='is-alumni'
                        onChange={e =>
                            setProfile({
                                ...profile,
                                is_alumni: e.target.value,
                            })
                        }
                        className={`${inputClass} appearance-none cursor-pointer`}>
                        <option value={false}>No</option>
                        <option value={true}>Yes</option>
                    </select>
                    <ChevronDownIcon className='absolute top-5 right-4 w-6 h-6 pointer-events-none' />
                </div>
                <button
                    onClick={handleUpdateProfile}
                    className='flex justify-center items-center space-x-2 w-full h-12 rounded-lg bg-blue-500 text-white'>
                    Update Profile
                </button>
            </div>
        </Layout>
    );
}
