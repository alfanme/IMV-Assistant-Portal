import { useState, useContext, createContext } from 'react';

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState({});

    const getProfile = async uid => {
        const res = await fetch(`api/profile/${uid}`);
        const data = await res.json();
        setProfile(data);
    };

    const emptyProfile = () => {
        setProfile({});
    };

    const value = {
        profile,
        setProfile,
        getProfile,
        emptyProfile,
    };

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    );
};
