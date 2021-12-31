import { useState } from 'react';
import Layout from '../../components/Layout';
import Tab from '../../components/Webinar/Tab';
import { PlusIcon } from '@heroicons/react/solid';
import { useWebinars } from '../../hooks/useWebinars';
import Loading from '../../components/Loading';
import Form from '../../components/Webinar/Form';
import ListItem from '../../components/Webinar/ListItem';

export default function setting() {
    const [form, setForm] = useState({
        show: false,
        editMode: false,
        data: null,
        title: null,
    });

    const closeForm = () => {
        setForm({
            show: false,
            editMode: false,
            data: null,
            title: null,
        });
    };

    const { data: webinars, isLoading, refetch } = useWebinars();

    if (isLoading) return <Loading />;
    return (
        <>
            <Layout>
                <Tab />
                <div className='flex justify-between items-center mb-8'>
                    <h1 className='text-2xl font-semibold'>Webinar Setting</h1>
                    <button
                        onClick={() => {
                            setForm({
                                show: true,
                                editMode: false,
                                data: null,
                                title: 'Add new webinar',
                            });
                        }}
                        className='flex justify-center items-center gap-2 px-3 h-10 rounded-lg font-semibold text-sm uppercase text-blue-500 bg-blue-100'>
                        <PlusIcon className='w-6 h-6' />
                        <p>Add</p>
                    </button>
                </div>
                <div className='flex flex-col gap-4'>
                    {webinars.map((webinar, idx) => (
                        <ListItem
                            key={webinar.id}
                            idx={idx}
                            webinar={webinar}
                            setForm={setForm}
                        />
                    ))}
                </div>
            </Layout>
            {form.show && (
                <Form
                    closeForm={closeForm}
                    formTitle={form.title}
                    data={form.data}
                    editMode={form.editMode}
                />
            )}
        </>
    );
}
