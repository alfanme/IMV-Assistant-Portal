import { CalendarIcon } from '@heroicons/react/solid';

export default function DateInfo({ timestamp }) {
    const formatedDate = () => {
        const date = new Date(timestamp);
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <div className='flex gap-1 items-center'>
            <CalendarIcon className='w-4 h-4 text-pink-500' />
            <p className='text-xs text-pink-500'>{formatedDate()}</p>
        </div>
    );
}
