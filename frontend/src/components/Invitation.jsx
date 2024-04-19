import React from 'react';
import axios from 'axios';
import { BsTelephone } from 'react-icons/bs';
import { ImCancelCircle } from 'react-icons/im';
import { GrValidate } from 'react-icons/gr';
import { useAuthContext } from '../hooks/useAuthContext';

const Invitation = ({ data }) => {
    const { user } = useAuthContext();

    const handleAccept = async () => {
        const response = await fetch('http://localhost:4000/api/users/confirm_friend_request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: user.userObj._id, friendId : data._id })
      });
      
      const responseData = await response.json();
        console.log(responseData.message);
        alert(responseData.message);
        window.location.reload();
    };

    const handleDecline = async () => {
        const response = await fetch('http://localhost:4000/api/users/reject_friend_request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: user.userObj._id, friendId : data._id })
      });
      
      const responseData = await response.json();
        console.log(responseData.message);
        alert(responseData.message);
        window.location.reload();
    };

    return (
      <div className='w-[550px] h-[160px] border border-6 border-black shadow-2xl  shadow-slate-400 rounded-2xl m-5 relative bg-slate-100'>
          <div className='flex flex-row'>
              <img src={data.image} alt="taswira" width={90} height={90} className='m-7 rounded-full' />
              <div className='items-center justify-center mt-11 ml-[20px]'>
                  <h1 className='text-xl font-bold text-blueGray-400'>{data.nom} {data.prenom}</h1>
                  <div className='flex flex-row items-center justify-center mt-2'>
                      <BsTelephone />
                      <span className='text-sm font-bold text-blueGray-400 ml-2'>{data.tel}</span>
                  </div>
              </div>
              <ImCancelCircle
    className='absolute top-1/2 right-20 transform -translate-y-1/2 bg-red-400 text-white rounded-full w-12 h-12 cursor-pointer'
    onClick={handleDecline}
/>
<GrValidate
    className='absolute top-1/2 right-5 transform -translate-y-1/2 bg-green-400 text-white rounded-full w-12 h-12 cursor-pointer'
    onClick={handleAccept}
/>

          </div>
      </div>
  );
};

export default Invitation;
