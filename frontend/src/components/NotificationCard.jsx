import React from 'react';
import { BsTelephone } from "react-icons/bs";
import { BsFillExclamationTriangleFill  } from 'react-icons/bs';

const NotificationCard = ({ data }) => {
  const createdAtDate = new Date(data.createdAt);

  // Format the date as a string
  const formattedDate = createdAtDate.toLocaleString();
  
  return (
    <div>
      <div className='w-[600px] mb-2 rounded-2xl p-2 shadow-2xl shadow-slate-400 m-5 border border-5 border-gray-400'>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-row items-center'>
            <img src={data.image} alt='Friend image' className='w-[100px] h-[100px] rounded-full ' />
            <div className='m-2'>
              <h3 className='text-bold text-xl'>Notification from {data.sender.nom} {data.sender.prenom}</h3>
              <p>Message : {data.message}</p>
              <p>Received on : {formattedDate}</p>
            </div>
          </div>
          
          <BsFillExclamationTriangleFill className='text-xl text-white border border-5 border-yellow-500 bg-yellow-500 h-[50px] w-[50px] rounded-xl shadow-md shadow-slate-500 mt-5' />
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
