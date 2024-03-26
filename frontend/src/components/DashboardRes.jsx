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
    <div className="dashboard-res flex flex-wrap justify-between">
  <div className="w-full md:w-auto md:flex-grow md:flex-shrink-0 md:flex-basis-0">
    <NavBar links={links1} />
    <SideBar links={links} />
  </div>
  <div className="w-full md:w-auto md:flex-grow-0 md:flex-shrink-0 md:flex-basis-auto flex flex-wrap justify-around">
    <div className="w-full md:w-1/2 lg:w-2/3 py-4">
      <Calendar />
    </div>
    <div className="">
      <Stats />
    </div>
  </div>
</div>

  )
}

export default DashboardRes