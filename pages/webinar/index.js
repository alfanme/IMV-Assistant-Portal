import Layout from '../../components/Layout';
import {
    RefreshIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    DocumentDownloadIcon,
} from '@heroicons/react/solid';
import useWebinarParticipants from '../../hooks/useWebinarParticipants';
import useCountWebinarParticipants from '../../hooks/useCountWebinarParticipants';
import useDownloadCSV from '../../hooks/useDownloadCSV';
import Loading from '../../components/Loading';
import { useState, useEffect } from 'react';
import Tab from '../../components/Webinar/Tab';

export default function webinar() {
    const [page, setPage] = useState(0);

    const {
        data: count,
        isLoading: countLoading,
        refetch: refetchCount,
    } = useCountWebinarParticipants();

    const {
        data: participants,
        isLoading: participantsLoading,
        refetch: refectParticipants,
    } = useWebinarParticipants(page);

    const refetch = () => {
        refetchCount();
        refectParticipants();
    };

    const prevPage = () => {
        if (page > 0) {
            setPage(prev => prev - 1);
        }
    };

    const nextPage = () => {
        setPage(prev => prev + 1);
    };

    useEffect(() => {
        refetch();
    }, [page]);

    const { data: csvData, isLoading: csvLoading } = useDownloadCSV(
        'webinar_participants'
    );

    const handleDownloadCSV = () => {
        const element = document.createElement('a');
        const dataBlob = new Blob([csvData], {
            type: 'text/csv',
        });
        element.href = URL.createObjectURL(dataBlob);
        element.download = 'webinar_participants.csv';
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    };

    const formatDate = timestamp => {
        const date = new Date(timestamp);
        return date.toDateString();
    };

    if (participantsLoading || countLoading || csvLoading) return <Loading />;

    return (
        <Layout>
            <Tab />
            <div className='flex justify-between items-center mb-8'>
                <h1 className='text-2xl font-semibold'>Webinar Participants</h1>
                <button
                    onClick={() => refetch()}
                    className='flex justify-center items-center gap-2 px-3 h-10 rounded-lg font-semibold text-sm uppercase text-blue-500 bg-blue-100'>
                    <RefreshIcon className='w-6 h-6' />
                    <p>Refresh</p>
                </button>
            </div>

            <div className='flex flex-wrap gap-4 mb-8'>
                <div className='bg-blue-500 flex-1 p-4 rounded-lg'>
                    <p className='text-lg font-semibold text-white'>
                        Total: {count.participants} participants
                    </p>
                </div>
                <div className='bg-pink-500 flex-1 p-4 rounded-lg'>
                    <p className='text-lg font-semibold text-white'>
                        Students: {count.students} participants
                    </p>
                </div>
                <div className='bg-yellow-500 flex-1 p-4 rounded-lg'>
                    <p className='text-lg font-semibold text-white'>
                        Attended: {count.attendance} participants
                    </p>
                </div>
                <div className='bg-gray-800 flex-1 p-4 rounded-lg'>
                    <p className='text-lg font-semibold text-white'>
                        HMTT: {count.hmtt} participants
                    </p>
                </div>
            </div>

            <p className='text-sm text-gray-500'>Sorted by latest data in:</p>
            <ul className='list-disc ml-8'>
                {count.webinars.length !== 0 &&
                    count.webinars.map((webinar, idx) => (
                        <li
                            key={webinar.id}
                            className='font-semibold text-pink-500'>
                            {webinar.title}
                        </li>
                    ))}
            </ul>

            <div className='overflow-x-scroll mt-4'>
                <table className='table-auto text-center w-full text-sm'>
                    <thead className='whitespace-nowrap'>
                        <tr className='h-8 bg-gray-100 rounded-lg'>
                            <th className='px-4'>No.</th>
                            <th className='px-4'>Registered on</th>
                            <th className='px-4'>Webinar</th>
                            <th className='px-4'>Full Name</th>
                            <th className='px-4'>Email</th>
                            <th className='px-4'>Phone</th>
                            <th className='px-4'>Status</th>
                            <th className='px-4'>Organization</th>
                            <th className='px-4'>Attendance</th>
                        </tr>
                    </thead>

                    <tbody className='whitespace-nowrap'>
                        {participants?.map((participant, idx) => (
                            <tr
                                className={`h-8 ${
                                    idx % 2 !== 0 && 'bg-gray-100'
                                } rounded-lg`}
                                key={participant.id}>
                                <td>{`${page * 10 + idx + 1}.`}</td>
                                <td>{formatDate(participant.created_at)}</td>
                                <td>{participant.webinar.title}</td>
                                <td>{participant.fullname}</td>
                                <td>{participant.email}</td>
                                <td>{participant.phone}</td>
                                <td>{participant.status}</td>
                                <td>{participant.organization}</td>
                                <td>{participant.attendance.toString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='flex items-center justify-between mt-8'>
                <button
                    onClick={handleDownloadCSV}
                    className='flex items-center justify-center gap-2 h-10 pl-2 pr-4 text-sm font-semibold rounded-lg bg-green-500 text-white focus:outline-none'>
                    <DocumentDownloadIcon className='w-6 h-6' />
                    <p>Download as .csv</p>
                </button>
                <div className='flex items-center'>
                    <button
                        onClick={prevPage}
                        disabled={page === 0}
                        className='flex items-center justify-center w-8 h-10 rounded-l-lg bg-gray-100 text-gray-900 disabled:text-gray-300 focus:outline-none'>
                        <ChevronLeftIcon className='w-6 h-6' />
                    </button>
                    <p className='flex justify-center items-center h-10 px-4 text-sm font-semibold bg-gray-100 text-gray-900'>
                        {page + 1} of {count.maxPage + 1}
                    </p>
                    <button
                        onClick={nextPage}
                        disabled={page === count.maxPage}
                        className='flex items-center justify-center w-8 h-10 rounded-r-lg bg-gray-100 text-gray-900 disabled:text-gray-300 focus:outline-none'>
                        <ChevronRightIcon className='w-6 h-6' />
                    </button>
                </div>
            </div>
        </Layout>
    );
}
