import React from 'react'

const Footer = () => {
  return (
    <div className='bg-primary-50 flex justify-between items-center max-container px-[10%] py-3 text-white'>
        <div className='flex flex-row items-center justify-center'>
            <h1 className='text-xl'>Copyright  &copy; 2024 Takwirti</h1>
            <img src="/logo_nobg_white.png" alt="logo" width={74} height={50} />
        </div>

        <h1 className='text-xl'>All rights reserved | Terms and Conditions | Privacy Policy</h1>

        </div>
      
    
  )
}

export default Footer
