import { PencilAltIcon } from '@heroicons/react/solid';
import Switch from 'react-switch';
import { useToggleOpenRegistration } from '../../hooks/useWebinars';

export default function ListItem({ idx, webinar, setForm }) {
    const toggleOpenRegistrationMutation = useToggleOpenRegistration(
        webinar.id,
        !webinar.open_registration
    );

    const handleSwitch = () => {
        toggleOpenRegistrationMutation.mutate();
    };

    return (
        <div className='flex gap-2 md:gap-4 items-center px-4 md:px-8 h-16 md:h-20 bg-white rounded-xl shadow-md'>
            <p className='font-semibold'>{idx + 1}.</p>
            <p className='flex-1 font-semibold truncate'>{webinar.title}</p>
            <button
                onClick={() => {
                    setForm({
                        show: true,
                        editMode: true,
                        data: webinar,
                        title: 'Edit webinar',
                    });
                }}
                className='flex gap-2 items-center mr-4 px-2 md:px-4 py-2 bg-white text-orange-500 rounded-md shadow-lg font-semibold'>
                <PencilAltIcon className='w-4 h-4' />
                <p className='hidden md:block'>Edit</p>
            </button>
            <Switch
                checked={webinar.open_registration}
                onChange={handleSwitch}
            />
        </div>
    );
}
