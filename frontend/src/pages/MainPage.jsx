import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar'
import Footer from '../components/Footer';

const MainPage = () => {
const text1 = "Empowering Football Enthusiasts to Connect, Play, and Thrive";
const text2 = "Rent Football Fields";
const text3 ="Connect with Players";
const text4= "List Your Field";

const pVariants ={
  hidden:{
    opacity:0,
  },
  visible:{
    opacity:1,
    transition:{
      staggerChildren: 0.05,
    }
  }
};

const spanVariants ={
  hidden:{
    opacity:0,
  },
  visible:{
    opacity:1,
  }
}

const imageVariants = {
  hidden: {
    opacity: 0,
    x: -100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.5, // Délai avant que l'image ne commence à s'animer
    },
  },
};

return (
  <>
    <NavBar isHomePage={true} />
    <div className=''>
      <div className=' flex flex-col md:flex-row items-center justify-center bg-primary-50 px-[10%] py-16'>
        <div className='flex flex-col mt-10  px-5 items-center justify-center md:w-1/2 sm:mb-2 text-white'>
          <motion.h1 variants={pVariants} initial="hidden" animate="visible" className='bold-52 '>
            {text1.split("").map((char, index) => (
            <motion.span variants={spanVariants} key={index}>{char}</motion.span>
            ))}
          </motion.h1>
          <p className='mt-5 text-xl text-center md:text-left text-black'>
            <span className='text-white text-2xl'> TAKWIRTI</span>, where football meets convenience. Rent a field,
            form a team,<br />
            or list your field for rent with ease. Our platform simplifies the rental <br />
            process and fosters connections between players. Join us and elevate your football experience today!
          </p>
          <Link to="/signupparti" className='rounded-xl bg-white text-xl text-primary-50 w-full md:w-1/3 p-3 mt-5'>Get Started as a client</Link>
        </div>
        <motion.img src="/Section 1 image.jpg" alt="img1" className='rounded-full ml-4 w-full md:w-auto'
          variants={imageVariants} initial="hidden" animate="visible" />
      </div>

      <div className='flex items-center justify-center mx-[10%] py-16'>
        <img src="/Section 2 image.png" alt="img1" className='rounded-full ml-4 ' />

        <div className='flex flex-col mt-10 px-5'>
          <motion.h1 variants={pVariants} initial="hidden" animate="visible" className='bold-52 '>
            {text2.split("").map((char,index) =>(
            <motion.span variants={spanVariants} key={index}>{char}</motion.span>
            ))}</motion.h1>
          <p className='mt-5 text-xl'>
            Are you in search of the perfect football field for your next match? Look no further! <span
              className='text-primary-50 text-2xl'> TAKWIRTI</span> offers a seamless rental experience. Browse through our
            selection of fields, check availability, and book your slot in just a few clicks.
          </p>
        </div>
      </div>

      <div className='flex items-center justify-center bg-primary-50 px-[10%] py-16'>

        <div className='flex flex-col '>
          <motion.h1 variants={pVariants} initial="hidden" animate="visible" className='bold-52 text-white'>
            {text3.split("").map((char,index) =>(
            <motion.span variants={spanVariants} key={index}>{char}</motion.span>
            ))}</motion.h1>
          <p className='mt-5 text-xl'>
            <span className='text-white text-2xl'> TAKWIRTI</span> ,is more than just a rental platform; it's a
            thriving community of football enthusiasts. Connect with other players, form teams, and organize matches
            effortlessly. Our platform facilitates interactions between players, making it easier than ever to stay
            connected with your fellow football lovers.
          </p>

        </div>
        <img src="/Section 3 image.jpg" alt="img1" className='rounded-full ml-4' width={500} height={500} />
      </div>

      <div className='flex items-center justify-center px-[10%] py-16'>
        <img src="/Section 4 image.jpg" alt="img1" className='rounded-full ml-4  mb-9' width={600} height={500} />

        <div className='flex flex-col mt-10 px-5 items-center justify-center'>
          <motion.h1 variants={pVariants} initial="hidden" animate="visible" className='bold-52 '>
            {text4.split("").map((char,index) =>(
            <motion.span variants={spanVariants} key={index}>{char}</motion.span>
            ))}</motion.h1>
          <p className='mt-5 text-xl'>
            Own a football field? Turn it into a profitable venture by listing it on <span
              className='text-primary-50 text-2xl'> TAKWIRTI</span>. Our platform allows you to easily list your field for
            rent, manage bookings, and access optimized tools to streamline your rental process. Join us today and start
            maximizing your field's potential.
          </p>
          <Link to="/signuprespo" className='rounded-xl bg-primary-50 text-xl text-white w-full md:w-1/3 p-3 mt-5'>Get Started as an owner</Link>

        </div>
      </div>




    </div>
    <Footer />
  </>
)
}

export default MainPage