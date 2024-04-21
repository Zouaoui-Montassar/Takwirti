import React, { useState } from 'react';
import { Check } from 'lucide-react';

const Message = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    window.location.reload();
  };

  return (
    <>
      {isVisible && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='w-[350px] h-[450px] bg-white shadow-full shadow-slate-500 border-2 border-slate-500 rounded-3xl'>
            <Check className='w-20 h-20 m-11 text-white bg-green-500 rounded-full ml-[130px]' />
            <p className='bold-36'>Update Profile with success !</p>
            <button
              onClick={handleClose}
              className='text-bold text-2xl border-2 border-green-500 bg-green-500 text-white w-1/4 rounded-full shadow-md shadow-slate-100 ml-[10px] mt-[90px]'>
              Ok
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
