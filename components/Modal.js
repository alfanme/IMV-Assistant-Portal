export default function Modal({
    isShown = false,
    title = 'Modal Title',
    message = 'Modal message is here.',
    primaryColor = 'bg-red-500',
    onClickYes = () => {},
    onClickNo = () => {},
}) {
    return (
        <>
            {isShown && (
                <div className='fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50'>
                    <div className='bg-white p-4 rounded-xl w-80'>
                        <h2 className='mb-4'>{title}</h2>
                        <p>{message}</p>
                        <div className='flex gap-4 mt-8'>
                            <button
                                onClick={onClickNo}
                                className='flex-1 h-10 rounded-lg text-xs font-semibold tracking-wide bg-gray-100'>
                                No
                            </button>
                            <button
                                onClick={onClickYes}
                                className={`flex-1 h-10 rounded-lg text-xs font-semibold tracking-wide shadow-xl ${primaryColor} text-white`}>
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
