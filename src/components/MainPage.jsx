import React from 'react'

const MainPage = () => {
  return (
    <div>
      <div className='m-7 flex  items-center justify-center '>
        
        <div className='flex flex-col mt-10 px-5'> 
        <h1 className='bold-52 '>Empowering Football Enthusiasts <br /> to Connect, Play, and Thrive</h1>
        <p className='mt-5 text-xl'>
           <span className='text-green-500 text-2xl'> TAKWIRTI</span> , where football meets convenience. Rent a field, form a team,<br/>
             or list your field for rent with ease. Our platform simplifies the rental <br/>
             process and fosters connections between players. Join us and elevate your football experience today!
       </p>
         <button className='rounded-xl bg-green-500 text-xl text-white w-1/6 p-3 m-5'>Get Started</button>
        </div>
        <img src="/Section 1 image.jpg" alt="img1"  className='rounded-full ml-4 '/>
      </div>

      <div className='m-7 flex pt-5 items-center justify-center h-screen'>
        <img src="/Section 2 image.png" alt="img1"  className='rounded-full ml-4 '/>
        
        <div className='flex flex-col mt-10 px-5'> 
        <h1 className='bold-52 '>Rent Football Fields</h1>
        <p className='mt-5 text-xl'>
        Are you in search of the perfect football field for your next match? Look no further! <span className='text-green-500 text-2xl'> TAKWIRTI</span> offers a seamless rental experience. Browse through our selection of fields, check availability, and book your slot in just a few clicks. 

        </p>
        

        </div>
      </div>

      <div className='m-7 flex pt-5 items-center justify-center h-screen'>
        
        <div className='flex flex-col mt-10 px-5'> 
        <h1 className='bold-52 '>Connect with Players</h1>
        <p className='mt-5 text-xl'>
           <span className='text-green-500 text-2xl'> TAKWIRTI</span> ,is more than just a rental platform; it's a thriving community of football enthusiasts. Connect with other players, form teams, and organize matches effortlessly. Our platform facilitates interactions between players, making it easier than ever to stay connected with your fellow football lovers.
       </p>
       
        </div>
        <img src="/Section 3 image.jpg" alt="img1"  className='rounded-full ml-4' width={800} height={500}/>
      </div>

      <div className='m-7 flex pt-5 items-center justify-center h-screen'>
        <img src="/Section 4 image.jpg" alt="img1"  className='rounded-full ml-4 ' width={800} height={500}/>
        
        <div className='flex flex-col mt-10 px-5'> 
        <h1 className='bold-52 '>List Your Field</h1>
        <p className='mt-5 text-xl'>
        Own a football field? Turn it into a profitable venture by listing it on <span className='text-green-500 text-2xl'> TAKWIRTI</span>. Our platform allows you to easily list your field for rent, manage bookings, and access optimized tools to streamline your rental process. Join us today and start maximizing your field's potential.

        </p>
        

        </div>
      </div>

      


    </div>
  )
}

export default MainPage
