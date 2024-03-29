import React from 'react';
import { BiMessageSquareEdit } from "react-icons/bi";

const Card = ({ view, data }) => {
  return (
    <div className={`${view === 'list' ? 'border b-2 bg-gray-200 w-[900px] h-[200px] shadow-xl rounded-md my-4 mx-8' : 'border b-2 bg-gray-200 w-[250px] h-[350px] shadow-xl rounded-md mx-4 my-2  '}  `}>
      <div className={`${view === 'list' ? 'flex flex-row justify-between items-center  ' : 'flex flex-col absolute '}`}>
        <img src={data.img} alt='terrain' className={`${view === 'list' ? 'h-[200px] w-[200px] p-2 rounded-3xl' : 'h-[145px] w-[250px] rounded-2xl p-2 '}`}/>
        <div className={`${view === 'list' ? 'items-center ml-2 mt-3 relative right-[230px]' : 'justify-center items-start relative bottom-[15px] right-[30px]'}`}>
          <p className={`${view === 'list' ? 'text-bold text-2xl mb-2' :'text-bold text-2xl ml-5 mb-2' }`}>{data.nom}</p>
          <div className={`${view === 'list' ? 'items-center justify-center' : 'ml-6'}`}>
            <p className='text-bold text-xl'>position: {data.position}</p>
            <p className='text-bold text-xl'>phone: {data.phone}</p>
            <p className='text-bold text-xl'>Prix: {data.prix}</p>
            <p className='text-bold text-xl'>note:</p>
          </div>
        </div>
        <BiMessageSquareEdit className={`${view === 'list' ? ' w-[50px] h-[50px]' : 'relative bottom-[220px] left-[210px] w-[25px] h-[25px] hover:shadow-md hover:w-[29px] hover:h-[29px]'}`} />
      </div>
    </div>
  );
};

export default Card;

