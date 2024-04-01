import React from 'react';
import { BsTelephone } from "react-icons/bs";
import { useState } from 'react';

const FriendsCard = ({ data, onRemoveFriend }) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRemoveFriend = () => {
    setIsConfirmationOpen(true);
  };

  const confirmRemoveFriend = () => {
    onRemoveFriend(data._id); 
    setIsConfirmationOpen(false);

}
  return (
    <div>
      <div className='w-[500px] mb-2 rounded-2xl p-2 shadow-2xl shadow-slate-400 m-5 border border-5 border-gray-400'>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-row items-center'>
            <img src={data.image} alt='Friend' className='w-[100px] h-[100px] rounded-full ' />
            <div className='m-2'>
              <h3 className='text-bold text-xl'>{data.nom} {data.prenom}</h3>
              <div className='flex flex-row items-center justify-center mt-2'>
                <BsTelephone />
                <span className="text-sm font-bold text-blueGray-400 ml-2">{data.tel}</span>
              </div>
            </div>
          </div>
          <div>
            <button onClick={handleRemoveFriend} className='text-xl text-white border border-5 border-red-500 bg-red-500 h-[50px] w-[90px] rounded-xl shadow-md shadow-slate-500 mt-5'>Remove</button>
            {isConfirmationOpen && (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-5 rounded-lg shadow-lg text-center">
                  <p>Are you sure you want to remove {data.nom} {data.prenom} from your friends list?</p>
                  <div className="mt-4">
                    <button onClick={confirmRemoveFriend} className="bg-red-500 text-white px-4 py-2 mr-2 rounded-md">Yes</button>
                    <button onClick={() => setIsConfirmationOpen(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">No</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsCard;
