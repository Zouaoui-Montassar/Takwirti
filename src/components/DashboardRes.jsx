import React from 'react'
import SideBar from './SideBar'
import NavBar from './NavBar'
import { faHouse } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Calendar from './calendar';
import Stats from './stats';


const links = [
    { label: 'Accueil', path: '/dashboard', icon: <FontAwesomeIcon icon={faHouse} className='pr-4'/> },
    { label: 'Page 1', path: '/page1' },
    { label: 'Page 2', path: '/page2' },
    // Add more links as needed
];
const links1 = [
    { label: 'Accueil', path: '/dashboard', icon: <FontAwesomeIcon icon={faHouse} className='pr-4'/> },
];


const DashboardRes = () => {
  return (
    <div className="dashboard-res">
        <NavBar links={links1}/>
        <SideBar links={links}/>
        <Calendar/>
        <Stats/>
    </div>
  )
}

export default DashboardRes