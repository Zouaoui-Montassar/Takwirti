import React from 'react';
import NavBar from './NavBar copy';
import { LockOpen , CircleX , Calendar  } from 'lucide-react';
import Stars from './Stars';
import { Link } from 'react-router-dom';

const links = [
    {label: 'Accueil', path: '/'} ,
    {label: 'Page 1', path: '/page1'} ,
    {label: 'Page 2', path: '/page2' },
   // Add more links as needed
];

const Detail = () => {
    return (
        <>
            <NavBar copy links={links} /> 
            <div className='flex flex-col md:flex-row justify-center items-center'>
                <img src="/Section 1 image.jpg" alt="image" width={700} className='mt-3 ml-3 rounded-3xl h-auto md:w-1/2' />
                <div className='w-full md:w-1/2 flex flex-col items-center p-4'>
                    <h1 className='bold-52 m-3'>terrain hamadi agerbi rades</h1>
                    <p className='text-bold text-xl text-center'>Ce terrain est un terrain de football de foot à 11 conçu pour des matchs.</p>
                    <p className='border border-green-400 bg-green-400 w-1/6 text-white text-xl p-2 rounded-3xl mt-3 text-center'>120 dt</p>
                    <div className='flex items-center mt-3'>
                        <img src="/location.svg" alt="location" className='inline-block w-6 h-6 mr-2' />
                        <p className='text-bold text-xl inline-block'>Rades, 9rib barcha lel autoroute</p>
                    </div>
                    <div className='flex items-center mt-3'>
                        <LockOpen className='text-green-500 w-6 h-6 mr-2' />
                        <p className='text-xl text-bold'>Ouvre à partir de 9h</p>
                    </div>
                    <div className='flex items-center mt-3'>
                        <CircleX className='text-red-500 w-6 h-6 mr-2' />
                        <p className='text-xl text-bold'>Ferme à 23h</p>
                    </div>
                    <div className='mt-3'>
                        <Stars />
                    </div>
                    <Link to={`/addreservation`} className='border border-green-400 bg-green-400 w-full md:w-1/6 p-2 rounded-md mt-3 flex items-center justify-center text-white'>
                        <p className='text-bold text-xl mr-1'>Réserver</p>
                        <Calendar className='w-6 h-6' />
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Detail;
