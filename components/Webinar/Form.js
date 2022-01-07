import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAddWebinar, useUpdateWebinar } from '../../hooks/useWebinars';

export default function Form({ formTitle, data, closeForm, editMode }) {
    const [title, setTitle] = useState(data?.title);
    const [heldOn, setHeldOn] = useState(
        data?.held_on ? new Date(data.held_on) : new Date()
    );

    const addWebinarMutation = useAddWebinar(title, heldOn);
    const updateWebinarMutation = useUpdateWebinar(data?.id, title, heldOn);

    const handleSubmit = () => {
        editMode ? updateWebinarMutation.mutate() : addWebinarMutation.mutate();
        closeForm();
    };

    return (
        <div className='fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50'>
            <div className='flex flex-col mx-4 p-4 rounded-xl w-full max-w-md bg-white'>
                <h2 className='mb-4'>{formTitle}</h2>
                <label htmlFor='title'>Title</label>
                <input
                    name='title'
                    defaultValue={data?.title}
                    onChange={event => setTitle(event.target.value)}
                    type='text'
                    className='mb-4 px-2 h-10 rounded-md bg-gray-100 focus:outline-none'
                />
                <label htmlFor='held_on'>Held on</label>
                <DatePicker
                    name='held_on'
                    className='mb-8 px-2 w-full h-10 rounded-md bg-gray-100 focus:outline-none'
                    selected={heldOn}
                    onChange={date => {
                        setHeldOn(date);
                    }}
                    showTimeSelect
                    dateFormat='Pp'
                />
                <div className='flex justify-between items-center gap-4'>
                    <button
                        onClick={closeForm}
                        className='px-4 h-10 rounded-md text-red-500 hover:bg-red-50'>
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className='flex-1 px-4 h-10 rounded-md bg-blue-500 text-white'>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}
