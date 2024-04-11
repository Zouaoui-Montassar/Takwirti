import React from 'react';
import { BsFillExclamationTriangleFill } from 'react-icons/bs';

const NotificationCard = ({ data }) => {
  const createdAtDate = new Date(data.createdAt);
  const formattedDate = createdAtDate.toLocaleString();

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden my-4 w-full">
      <div className="p-4">
        <div className="flex items-center">
          <img src={data.sender.image} alt="Friend" className="w-12 h-12 rounded-full" />
          <div className="ml-4">
            <h3 className="text-lg font-semibold">{data.sender.nom} {data.sender.prenom}</h3>
            <p className="text-sm text-gray-500">Received on {formattedDate}</p>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-sm">{data.message}</p>
        </div>
      </div>
      <div className="bg-primary-50 px-4 py-2 flex justify-end items-center">
        <BsFillExclamationTriangleFill className="text-xl text-white mr-2" />
        <span className="text-white font-semibold">Notification</span>
      </div>
    </div>
  );
};

export default NotificationCard;
