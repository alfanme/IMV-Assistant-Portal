import Layout from '../components/Layout';
import { supabase } from '../utils/supabaseClient';
import { useState, useEffect } from 'react';
import { RefreshIcon } from '@heroicons/react/solid';

export default function webinar() {
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        getParticipants();
    }, []);

    const getParticipants = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('webinar_participants')
                .select();
            if (error) alert(error);
            if (data) setParticipants(data);
        } catch (error) {
            alert(arror);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = timestamp => {
        const date = new Date(timestamp);
        return date.toDateString();
    };

    return (
        <Layout>
            <div className='flex justify-between items-center mb-8'>
                <h1 className='text-2xl font-semibold'>Webinar Participants</h1>
                <button
                    onClick={getParticipants}
                    className='flex justify-center items-center gap-2 px-3 h-10 rounded-lg font-semibold text-sm uppercase text-blue-500 bg-blue-100'>
                    <RefreshIcon className='w-6 h-6' />
                    <p>Refresh</p>
                </button>
            </div>

            <div className='overflow-x-scroll'>
                <table className='table-auto text-center w-full text-sm'>
                    <tr className='h-8 bg-gray-100 rounded-lg'>
                        <th className='px-4'>No.</th>
                        <th className='px-4'>Registered on</th>
                        <th className='px-4'>Full Name</th>
                        <th className='px-4'>Email</th>
                        <th className='px-4'>Phone</th>
                        <th className='px-4'>Status</th>
                        <th className='px-4'>Organization</th>
                        <th className='px-4'>Attendance</th>
                    </tr>

                    {participants.map((participant, idx) => (
                        <tr
                            className={`h-8 ${
                                idx % 2 !== 0 && 'bg-gray-100'
                            } rounded-lg`}
                            key={participant.id}>
                            <td>{`${idx + 1}.`}</td>
                            <td>{formatDate(participant.created_at)}</td>
                            <td>{participant.fullname}</td>
                            <td>{participant.email}</td>
                            <td>{participant.phone}</td>
                            <td>{participant.status}</td>
                            <td>{participant.organization}</td>
                            <td>{participant.attendance.toString()}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </Layout>
    );
}
