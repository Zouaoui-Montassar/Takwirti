import React from 'react';

const MessageBox = ({ message, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg text-center">
        <p>{message}</p>
        <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md">OK</button>
      </div>
    </div>
  );
};

export default MessageBox;
