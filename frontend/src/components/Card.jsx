import React from 'react';
import { BiMessageSquareEdit } from "react-icons/bi";

const Card = ({ view, data }) => {
  return (
    <div className={`${view === 'list' ? 'border b-2 bg-gray-200 w-[900px] h-[200px] shadow-xl rounded-md my-4 mx-8' : 'border b-2 bg-gray-200 w-[250px] h-[250px] shadow-xl rounded-md my-4  '}  `}>
      <div className={`${view === 'list' ? 'flex flex-row ' : 'flex flex-col absolute '}`}>
        <img src={data.img} alt='terrain' className={`${view === 'list' ? 'h-[200px] w-[200px] p-2 rounded-3xl' : 'h-[145px] w-[250px] rounded-2xl p-2 '}`}/>
        <div className={`${view === 'list' ? 'items-center ml-2 mt-3' : 'justify-center items-start relative bottom-[15px] right-[30px]'}`}>
          <p className='text-bold text-lg py-4'>{data.nom}</p>
          <p className='text-bold text-lg'>position : {data.position}<br></br><div className='flex'><p className='mr-8'>numero : {data.phone}</p><p>prix : {data.prix}</p> </div> note : </p>
        </div>
        <BiMessageSquareEdit className={`${view === 'list' ? 'relative top-[80px] left-[40%] w-[50px] h-[50px]' : 'relative bottom-[220px] left-[210px] w-[25px] h-[25px] hover:shadow-md hover:w-[29px] hover:h-[29px]'}`} />
      </div>
    </div>
  );
};

export default Card;

