import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import { LockOpen , CircleX , Calendar } from 'lucide-react';
import Stars from './Stars';
import { Link, useParams } from 'react-router-dom';

const links = [
    {label: 'Accueil', path: '/'} ,
    {label: 'Page 1', path: '/page1'} ,
    {label: 'Page 2', path: '/page2' },
   // Add more links as needed
];

const Detail = () => {
    const [terrainInfo, setTerrainInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const params = useParams();
    const terrainId = params.id
    useEffect(() => {
        const fetchTerrainInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/ter/terrain/getInfo/${terrainId}`);
                setTerrainInfo(response.data.terrain);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchTerrainInfo();

        // Cleanup function to cancel any ongoing requests if the component unmounts
        return () => {
            // Cleanup logic here (if needed)
        };
    }, [terrainId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!terrainInfo) {
        return <div>Terrain not found.</div>;
    }
    
    return (
        <>
            <NavBar links={links} className=""/> 
            <div className='flex flex-col md:flex-row justify-center items-center mt-[10%]'>
                <img src="/Section 1 image.jpg" alt="image" width={700} className='mt-3 ml-3 rounded-3xl h-auto md:w-1/2' />
                <div className='w-full md:w-1/2 flex flex-col items-center p-4'>
                    <h1 className='bold-52 m-3'>{terrainInfo.nom}</h1>
                    <p className='text-bold text-xl text-center'>
                        {terrainInfo.nom} est un terrain a louer consituer a {terrainInfo.position}.<br/>
                        la duree de match est {terrainInfo.calendrier.duree} minutes.<br/>
                        jour de repos : {terrainInfo.calendrier.date}
                        </p>
                    <p className='border border-green-400 bg-green-400 w-1/6 text-white text-xl p-2 rounded-3xl mt-3 text-center'>{terrainInfo.prix} dt</p>
                    <div className='flex items-center mt-3'>
                        <img src="/location.svg" alt="location" className='inline-block w-6 h-6 mr-2' />
                        <p className='text-bold text-xl inline-block'>{terrainInfo.position}</p>
                    </div>
                    <div className='flex items-center mt-3'>
                        <LockOpen className='text-green-500 w-6 h-6 mr-2' />
                        <p className='text-xl text-bold'>Ouvre à partir de {terrainInfo.calendrier.open}h</p>
                    </div>
                    <div className='flex items-center mt-3'>
                        <CircleX className='text-red-500 w-6 h-6 mr-2' />
                        <p className='text-xl text-bold'>Ferme à {terrainInfo.calendrier.close}h</p>
                    </div>
                    <div className='mt-3'>
                        <Stars />
                    </div>
                    <Link to={`/reservation/add/6602626e608a35e2bf409f56/${terrainInfo._id}`} className='border border-green-400 bg-green-400 w-full md:w-1/6 p-2 rounded-md mt-3 flex items-center justify-center text-white'>
                        <p className='text-bold text-xl mr-1'>Réserver</p>
                        <Calendar className='w-6 h-6' />
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Detail;
