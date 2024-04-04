import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import SideBar, { SidebarItem } from '../components/SideBar';
import { School, Settings } from 'lucide-react';
import axios from 'axios';
import ParentCalender2 from './ParentCalender2';

const links = [
  { label: 'Accueil', path: '/' },
  { label: 'Page 1', path: '/page1' },
  { label: 'Page 2', path: '/page2' },
];


  const ResponsableContent = ({ data }) => {
    console.log(data.calendrier); // Check if calendrier is present in data
    if (!data.calendrier) {
      return <div>Calendrier data not available</div>; // Return some placeholder content or handle the case when calendrier is not present
    }
  
    console.log(data.calendrier.open);
    console.log(data.calendrier.close);
    console.log(data.calendrier.duree);
    console.log(data.calendrier.date);
    console.log(data.calendrier.time);

  
    return (
      <div className='items-center justify-center  w-full'>
        <h1 className='bold-36 my-2'> calender terrain : {data.nom}</h1> 
        <ParentCalender2 openTime={data.calendrier.open} closeTime={data.calendrier.close} time={data.calendrier.duree} date={data.calendrier.date} rh={data.calendrier.time}  />
      </div>
    );
  };

const Responsable2 = () => {
  const { user } = useAuthContext();
  const { terrainId } = useParams();
  console.log(terrainId); 
  const [terrainInfo, setTerrainInfo] = useState({});

  useEffect(() => {
    const fetchTerrainInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/ter/terrain/getInfo/${terrainId}`);
        console.log(terrainId)
        const data = response.data.terrain;
        setTerrainInfo(data); // Update terrainInfo state with fetched data
        console.log(response.data);
      } catch (error) {
        console.error('Failed to fetch terrain list:', error);
        // Handle error gracefully, e.g., display a message to the user
      }
    };

    fetchTerrainInfo();
  }, [terrainId]); // Add terrainId to dependency array to re-fetch data when it changes

  return (
    <>
      <NavBar links={links} />
      <div className='flex flex-row'>
        <SideBar>
          <SidebarItem icon={<School />} text="profile responsable" link={'responsable'} />
          <SidebarItem icon={<Settings />} text="list terrain" link={`terrain/responsable/${user.userObj._id}`} />
          <SidebarItem icon={<Settings />} text="reservation list" link={'reservation/list'} />
        </SideBar>

        <ResponsableContent data={terrainInfo} /> {/* Pass terrainInfo as data */}
      </div>
    </>
  );
};

export default Responsable2;