import React, { useState } from 'react';

const ConfirmBoxMessage = ({ message, onConfirm, onCancel }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleConfirm = () => {
    onConfirm();
    setIsVisible(false);
  };

  const handleCancel = () => {
    onCancel();
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg shadow-lg p-6 w-80'>
            <h2 className='text-lg font-semibold'>{message}</h2>
            <div className='flex justify-end mt-6'>
              <button
                onClick={handleConfirm}
                className='text-white bg-green-500 border border-green-500 rounded-lg px-4 py-2 hover:bg-green-600 mr-4'
              >
                Confirm
              </button>
              <button
                onClick={handleCancel}
                className='text-white bg-red-500 border border-red-500 rounded-lg px-4 py-2 hover:bg-red-600'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmBoxMessage;
