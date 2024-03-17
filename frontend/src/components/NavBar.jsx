

import React from 'react';

const NavBar = () => {
  return (
    <nav className='bg-green-500 flex justify-between items-center max-container px-4 py-3 text-white'>
      <div className='flex flex-row '>
      <img src="./logo_nobg_white.png" alt="logo" width={74} height={50} />
      <h1 className='text-2xl font-bold pt-4'> Takwirti |</h1> 
      </div>
      
      <div className='flex flex-row space-x-10'>
      <a href="/" className='cursor-pointer text-xl border-white hover:border-b border-b-5'>Home</a>
      <a href="/" className='cursor-pointer text-xl border-white hover:border-b border-b-5'>About</a>
      <a href="/" className='cursor-pointer text-xl border-white hover:border-b border-b-5'>Conatct</a>
      </div>

      <div className='flex space-x-7 items-center justify-center'>
        
        <a href='/' className=' text-white hover:rounded-xl hover:bg-white hover:text-green-500 hover:w-auto hover:p-2'>Login</a>
        <button className='bg-white text-green-500 px-4 py-2 rounded-full'>Sign up</button>
      </div>
    </nav>
  );
};

export default NavBar;



