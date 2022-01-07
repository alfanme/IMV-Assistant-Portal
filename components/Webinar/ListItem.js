import { PencilAltIcon } from '@heroicons/react/solid';
import Switch from 'react-switch';
import { useToggleOpenRegistration } from '../../hooks/useWebinars';
import DateInfo from '../DateInfo';

export default function ListItem({ idx, webinar, setForm }) {
    const toggleOpenRegistrationMutation = useToggleOpenRegistration(
        webinar.id,
        !webinar.open_registration
    );

    const handleSwitch = () => {
        toggleOpenRegistrationMutation.mutate();
    };

    return (
        <div className='flex gap-4 items-center px-4 md:px-8 py-4 bg-white rounded-xl shadow-md'>
            <p className='font-semibold'>{idx + 1}.</p>
            <div className='flex-1'>
                <p className='font-semibold whitespace-normal mb-1'>
                    {webinar.title}
                </p>
                <DateInfo timestamp={webinar.held_on} />
            </div>
            <div className='flex flex-col-reverse md:flex-row items-center gap-4'>
                <button
                    onClick={() => {
                        setForm({
                            show: true,
                            editMode: true,
                            data: webinar,
                            title: 'Edit webinar',
                        });
                    }}
                    className='flex gap-2 items-center px-2 md:px-4 py-2 bg-white text-orange-500 rounded-md shadow-lg font-semibold'>
                    <PencilAltIcon className='w-4 h-4' />
                    <p className=''>Edit</p>
                </button>
                <Switch
                    checked={webinar.open_registration}
                    onChange={handleSwitch}
                />
            </div>
        </div>
    );
}
