import { Skeleton } from 'antd';

const CurrencyFormSkeleton = () => {
    return (
        <div className='bg-white z-10 w-full max-w-5xl rounded-lg shadow-lg shadow-black/20 px-10 py-10 text-left absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <p className='block text-gray-700 text-md font-bold mb-4 text-center'> Loading assets data, please wait...</p>
            <Skeleton />
        </div>
    )
}

export default CurrencyFormSkeleton;