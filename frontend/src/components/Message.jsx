import React, { useState } from 'react';
import { Check } from 'lucide-react';

const Message = ({message}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    window.location.reload();
  };

  return (
    <>
      {isVisible && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg shadow-lg p-6 w-80'>
            <div className='flex justify-between items-center'>
              <h2 className='text-lg font-semibold'>Message</h2>
              <button
                onClick={handleClose}
                className='text-gray-400 hover:text-gray-600 focus:outline-none'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
            <div className='flex items-center mt-4'>
              <Check className='w-6 h-6 text-green-500 mr-2' />
              <p className='text-sm'>{message}</p>
            </div>
            <div className='flex justify-end mt-6'>
              <button
                onClick={handleClose}
                className='text-white bg-green-500 border border-green-500 rounded-lg px-4 py-2 hover:bg-green-600'>
                Ok
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
