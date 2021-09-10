import 'tailwindcss/tailwind.css';
import { supabase } from '../utils/supabaseClient';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ProfileProvider } from '../store/profileContext';

function MyApp({ Component, pageProps }) {
    const router = useRouter();

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                handleAuthChange(event, session);
                if (event === 'SIGNED_IN') {
                    router.replace('/');
                }
                if (event === 'SIGNED_OUT') {
                    router.replace('/auth');
                }
                console.log(router.pathname, event, session);
            }
        );
        checkUser();
        return () => authListener.unsubscribe();
    }, []);

    async function checkUser() {
        const user = await supabase.auth.user();
        if (user) {
            router.replace('/');
        } else {
            router.replace('/auth');
        }
    }

    async function handleAuthChange(event, session) {
        await fetch('/api/auth', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            credentials: 'same-origin',
            body: JSON.stringify({ event, session }),
        });
    }

    return (
        <ProfileProvider>
            <Component {...pageProps} />
        </ProfileProvider>
    );
}

export default MyApp;
