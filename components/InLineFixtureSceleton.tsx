import React from 'react';

const InLineFixtureSceleton: React.FC<{}> = ({}) => {
  return (
    <tr className='border-b-2 border-gray-100 dark:border-gray-800 animate-pulse'>
      <td className='w-4 p-4 hidden lg:table-cell select-none'></td>
      <td className='px-3 hidden sm:table-cell select-none '>
        <div className='align-middle w-full flex justify-center'>
          <div className='bg-gray-700 h-4 w-full max-w-[10rem] rounded-md'></div>
        </div>
      </td>
      <td className='px-3 space-y-3 hidden md:table-cell select-none'>
        <div className='flex text-justify items-center'>
          <div className='bg-gray-700 h-4 w-full rounded-md max-w-[10rem]'></div>
        </div>
        <div className='flex text-justify items-center'>
          <div className='bg-gray-700 h-4 w-full rounded-md max-w-[8rem]'></div>
        </div>
      </td>
      <td className='px-0 md:px-3 w-80 select-none md:h-36 h-28 p-2'>
        <div className='h-full w-full bg-gray-800 rounded-md p-2'>
          <div className='flex flex-col justify-between h-full'>
            <div className='flex justify-center gap-14'>
              <div className='bg-gray-700 h-2 md:h-4 w-16 md:w-32 rounded-md'></div>
              <div className='bg-gray-700 h-2 md:h-4 w-16 md:w-32 rounded-md'></div>
            </div>
            <div className='h-full'></div>
            <div className='flex flex-col h-full gap-3'>
              <div className='flex justify-between gap-10'>
                <div className='bg-gray-700 h-2 md:h-4 w-24 md:w-40 rounded-md'></div>
                <div className='bg-gray-700 h-2 md:h-4 w-24 md:w-40 rounded-md'></div>
              </div>
              <div className='flex justify-between gap-10'>
                <div className='bg-gray-700 h-2 md:h-4 w-24 md:w-40 rounded-md'></div>
                <div className='bg-gray-700 h-2 md:h-4 w-24 md:w-40 rounded-md'></div>
              </div>
              <div className='bg-gray-700 h-4 md:h-5 w-full rounded-md'></div>
            </div>
          </div>
        </div>
      </td>
      <td className='px-2 hidden lg:table-cell select-none'>
        <div className='flex justify-center align-middle text-center text-xs font-mono'>
          <div className='bg-gray-700 h-6 w-36 rounded-md'></div>
        </div>
      </td>
      <td className='px-3 sm:px-5 select-none'>
        <div className='flex justify-center align-middle text-center'>
          <div className='relative bg-gray-700 flex w-10 h-8 md:w-16 md:h-14 lg:w-20 lg:h-14 rounded-md justify-center text-center items-center border border-gray-200 dark:border-gray-800 dark:text-gray-800 font-mono'></div>
        </div>
      </td>
    </tr>
  );
};

export default InLineFixtureSceleton;
