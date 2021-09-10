import Image from 'next/image';

export default function Loading() {
    return (
        <div className='fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center bg-white'>
            <Image
                src='/logo.webp'
                width={64}
                height={64}
                objectFit='contain'
                alt='Loading...'
                className='animate-pulse'
            />
        </div>
    );
}
