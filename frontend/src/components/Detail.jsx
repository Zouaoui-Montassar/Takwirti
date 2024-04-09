import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import { LockOpen , CircleX , Calendar } from 'lucide-react';
import Stars from './Stars';
import { Link, useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { School, Settings, LogOut } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import SearchBox from './SearchBox';
import Sidebar, { SidebarItem } from './SideBar';

const Detail = () => {
    const [terrainInfo, setTerrainInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const params = useParams();
    const terrainId = params.id
    const { user } = useAuthContext();
    const idUser = user.userObj._id;
    const [searchTerm, setSearchTerm] = useState('');
    const [width, setWidth] = useState();
    const handleWidth = (width) => {
      setWidth(width);
    }
    useEffect(() => {
      handleWidth(width);
    },[width]);
    const [w, setW] = useState();
    const handleW = (width) => {
      if (width === 284){
      setW(400);}
      else {setW(width);}
    }
    useEffect(() => {
      handleW(width);
    },[width]);
    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
      };
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
            <NavBar /> 
            <div className='flex flex-row'>
            <Sidebar sendWidth={handleWidth} >
              <SidebarItem icon={<FontAwesomeIcon icon={faSearch}/>} text={<SearchBox onSearch={handleSearch}/>} test={true}  />
              <SidebarItem icon={<Settings />} text="Home" link={'particulier'} />
              <SidebarItem icon={<School />} text="Profile "  link={'profile'} />
              <SidebarItem icon={<Settings />} text="Notifications" link={'notifications'} />
              <SidebarItem icon={<Settings />} text="Reservations" link={'reservation/listP'} />
              <SidebarItem icon={<Settings />} text="Friends" link={'friendslist'} />
           </Sidebar>
            <div className={` ml-[${w}px] mt-[60px] w-[70%] flex flex-row justify-center items-center`}>
                <img src={terrainInfo.img} alt="image" width={200} className='mt-3 ml-3 rounded-3xl h-auto md:w-1/2 ' />
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
                    <Link to={`/reservation/add/${idUser}/${terrainInfo._id}`} className='border border-green-400 bg-green-400 w-full md:w-1/6 p-2 rounded-md mt-3 flex items-center justify-center text-white'>
                        <p className='text-bold text-xl mr-1'>Réserver</p>
                        <Calendar className='w-6 h-6' />
                    </Link>
                </div>
            </div>
            </div>
        </>
    );
};

export default Detail;
