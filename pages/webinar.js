import Layout from '../components/Layout';
import { RefreshIcon } from '@heroicons/react/solid';
import useWebinarParticipants from '../hooks/useWebinarParticipants';
import Loading from '../components/Loading';

export default function webinar() {
    const { data: participants, isLoading, refetch } = useWebinarParticipants();

    const formatDate = timestamp => {
        const date = new Date(timestamp);
        return date.toDateString();
    };

    if (isLoading) return <Loading />;

    return (
        <Layout>
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
                        Total: {participants?.length} participants
                    </p>
                </div>
                <div className='bg-pink-500 flex-1 p-4 rounded-lg'>
                    <p className='text-lg font-semibold text-white'>
                        Students:{' '}
                        {
                            participants?.filter(
                                participant =>
                                    participant.status === 'Mahasiswa'
                            ).length
                        }{' '}
                        participants
                    </p>
                </div>
                <div className='bg-yellow-500 flex-1 p-4 rounded-lg'>
                    <p className='text-lg font-semibold text-white'>
                        Attended:{' '}
                        {
                            participants?.filter(
                                participant => participant.attendance === true
                            ).length
                        }{' '}
                        participants
                    </p>
                </div>
            </div>

            <div className='overflow-x-scroll'>
                <table className='table-auto text-center w-full text-sm'>
                    <thead>
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
                    </thead>

                    <tbody>
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
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}
