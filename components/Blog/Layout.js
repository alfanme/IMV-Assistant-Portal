import Tab from './Tab';

export default function Layout({ children }) {
    return (
        <>
            <Tab />
            {children}
        </>
    );
}
