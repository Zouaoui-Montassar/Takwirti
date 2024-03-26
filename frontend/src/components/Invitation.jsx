import React from 'react'
import { BsTelephone } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";
import { GrValidate } from "react-icons/gr";
const Invitation = () => {
  return (
    <div className='w-[550px] h-[160px] border border-6 border-black shadow-2xl  shadow-slate-400 rounded-2xl m-5 relative bg-slate-100'>
       <div className='flex flex-row'>
            <img src="/taswira.jpg" alt="taswira" width={90} height={90} className='m-7 rounded-full' />
            <div className='items-center justify-center mt-11 ml-[20px]'>
                <h1 className='text-xl font-bold text-blueGray-400'> hamdi el 3ou9</h1>
                <div className='flex flex-row items-center justify-center mt-2'>
                         <BsTelephone /> 
                         <span className="text-sm font-bold text-blueGray-400 ml-2">+216 22 333 444</span>                      
                </div>
            </div>
            <ImCancelCircle className='absolute top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2 bg-red-400 text-white rounded-full w-12 h-12 cursor-pointer' />
            <GrValidate className='relative top-[55px] left-[150px] bg-green-400 text-white rounded-full w-12 h-12 cursor-pointer' />
       </div>
    </div>
  )
}

export default Invitation;
