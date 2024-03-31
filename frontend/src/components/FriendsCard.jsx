import React from 'react';
import { BsTelephone } from "react-icons/bs";

const FriendsCard = ({ data }) => {
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
          <button className='text-xl text-white border border-5 border-red-500 bg-red-500 h-[50px] w-[90px] rounded-xl shadow-md shadow-slate-500 mt-5'>Unfollow</button>
        </div>
      </div>
    </div>
  );
};

export default FriendsCard;
