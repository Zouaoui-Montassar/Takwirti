import React, { useState,useEffect } from 'react';
import NavBar from './NavBar';
import SideBar, { SidebarItem } from './SideBar';
import TerrainList from './TerrainList';
import { useAuthContext } from '../hooks/useAuthContext';

import { School ,Settings,LogOut} from 'lucide-react';


function TerrainsResp() {
    const [view, setView] = useState('list'); // 'list' or 'board'
    const { user } = useAuthContext();
    const id = user.userObj._id;
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
    return (
        <>
        <NavBar/>
        <div className='flex flex-row space-x-5'>
        <SideBar sendWidth={handleWidth}>
            <SidebarItem icon={<School />} text="profile responsable" link={'responsable'}/>
            <SidebarItem icon={<Settings />} text="list terrain" link={`terrain/responsable/${user.userObj._id}`} />
            <SidebarItem icon={<Settings />} text="reservation list" link={'reservation/listR'} />
        </SideBar>
        <div className={` relative left-[${w}px] top-[82px] w-[calc(100vw-${w}px)] items-center justify-center p-8`}>
          <TerrainList param={"responsable"} className="m-8" />
          </div>
        </div>
        </>
    );
}
export default TerrainsResp;