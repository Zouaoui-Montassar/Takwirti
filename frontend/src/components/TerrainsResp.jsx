import React, { useState } from 'react';
import NavBar from './NavBar copy';
import SideBar, { SidebarItem } from './SideBar';
import TerrainList from './TerrainList';


import { School ,Settings,LogOut} from 'lucide-react';

const links = [
    {label: 'Accueil', path: '/'} ,
    {label: 'Page 1', path: '/page1'} ,
    {label: 'Page 2', path: '/page2' },
   // Add more links as needed
];

function TerrainsResp() {
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
          <TerrainList param={"responsable"} id={"9876543210fedcba"} />
        </div>
        </>
    );
}
export default TerrainsResp;