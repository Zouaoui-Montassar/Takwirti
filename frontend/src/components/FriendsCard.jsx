import React, { useState } from 'react';
import { BsTelephone } from "react-icons/bs";

const FriendsCard = ({ data, onAddFriend, onRemoveFriend, showAddButton }) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [messagestatus, setMessageStatus] = useState('');
  const handleAddFriendClick = async () => {
    const message = await onAddFriend(data._id); 
    console.log(message);
    setMessageStatus(message);
    setIsSuccess(true);

  };

  const handleRemoveFriendClick = () => {
    console.log("handleRemoveFriendClick");
    setIsConfirmationOpen(true);
  };

  const confirmRemoveFriend = () => {
    console.log("confirmRemoveFriend");
    onRemoveFriend(data._id); 
    setIsConfirmationOpen(false);
  };

  return (
    <div className="w-full flex justify-center">
      <div className=" w-[500px] bg-white rounded-lg shadow-md shadow-slate-400 p-4 flex flex-col justify-between my-4">
        <div className="flex items-center ">
          <img src={data.image} alt='Friend' className='w-[70px] h-[70px] rounded-full' />
          <div className='ml-4'>
            <h3 className='text-lg font-semibold'>{data.nom} {data.prenom}</h3>
            <div className='flex items-center mt-1'>
              <BsTelephone className='w-4 h-4 mr-1' />
              <span className="text-sm font-bold text-blueGray-400">{data.tel}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          {showAddButton && !isSuccess && (
            <button onClick={handleAddFriendClick} className='text-white bg-green-500 border border-green-500 rounded-lg px-3 py-1 shadow-md'>Add</button>
          )}
          {!showAddButton && (
            <button onClick={handleRemoveFriendClick} className='text-white bg-red-500 border border-red-500 rounded-lg px-3 py-1 shadow-md'>Remove</button>
          )}
        </div>
        {isSuccess && <p className="text-green-500 text-center py-2">{messagestatus}</p>}
        {isConfirmationOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
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
  );
};

export default FriendsCard;
