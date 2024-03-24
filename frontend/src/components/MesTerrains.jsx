import React, { useState } from 'react';
import NavBar from './NavBar copy';
import SideBar, { SidebarItem } from './SideBar';
import { BsList } from "react-icons/bs";
import { BiSolidDashboard } from "react-icons/bi";
import SearchBox from './SearchBox';
import Card from './Card';

import { School ,Settings,LogOut} from 'lucide-react';



const data = [
    { id: 1, name: 'Item 1', image:'/Section 1 image.jpg' },
    { id: 2, name: 'Item 2', image:'/Section 2 image.png' },
    { id: 3, name: 'Item 3', image:'/Section 3 image.jpg' },
    { id: 4, name: 'Item 4', image:'/Section 3 image.jpg' },
    { id: 5, name: 'Item 5', image:'/Section 3 image.jpg' },
    // Add more items as needed
];

const links = [
    {label: 'Accueil', path: '/'} ,
    {label: 'Page 1', path: '/page1'} ,
    {label: 'Page 2', path: '/page2' },
   // Add more links as needed
];

function MesTerrains() {
    const [view, setView] = useState('list'); // 'list' or 'board'

    return (
        <>
        <NavBar copy links={links}/>

        <div className='flex flex-row space-x-5'>
          <SideBar>
               {/* Contenu de la barre latérale */}
                <SidebarItem icon={<School />} text="Accueil" active={true} />
                <SidebarItem icon={<Settings />} text="Profil" />
                <SidebarItem icon={<LogOut />} text="se déconnecter" />
          </SideBar>
            <div className='flex flex-col w-full'> {/* Utilisation de w-full pour prendre toute la largeur */}
                <div className='flex flex-col md:flex-row items-center md:items-start space-y-5 md:space-y-0 md:space-x-5'> {/* Utilisation de classes pour les différents breakpoints */}
                    <div className='flex items-center space-x-2 mt-2'> {/* Utilisation de space-x-2 pour l'espacement horizontal */}
                        <div className='bg-gray-200 flex flex-row border b-2 shadow-md p-2 h-[50px]'>
                            <button className="mr-4" onClick={() => setView('list')}>List View</button> 
                            <BsList className='relative top-[9px]' />
                        </div>
                        <div className='bg-gray-200 flex flex-row border b-2 shadow-md p-2 h-[50px]'>
                            <button className="mr-4" onClick={() => setView('board')}>Board View</button> 
                            <BiSolidDashboard className='relative top-[9px]'/>
                        </div>
                        <SearchBox/>
                    </div>
                    
                </div>
                <div className='flex flex-wrap'> 
                    {data.map(item => (
                        <div key={item.id} className={`${view === 'list' ? 'flex flex-col ':'w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4'}`}> 
                            <div className='p-4'>
                                <Card view={view} data={item}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
}
export default MesTerrains;