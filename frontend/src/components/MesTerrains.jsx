import React, { useState } from 'react';
import NavBar from './NavBar';
import SideBar from './SideBar';
import { BsList } from "react-icons/bs";
import { BiSolidDashboard } from "react-icons/bi";
import SearchBox from './SearchBox';
import Card from './Card';


const data = [
    { id: 1, name: 'Item 1',image:'/Section 1 image.jpg' },
    { id: 2, name: 'Item 2', image:'/Section 2 image.png ' },
    { id: 3, name: 'Item 3' , image :'/Section 3 image.jpg' },
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
        <NavBar/>

        <div className='flex flex-row space-x-5'>
            <SideBar links={links}/>
            <div className='flex flex-col'>
                <div className='flex flex-row'>
                        <div className='flex flex-row items-center '>
                            <div className='bg-gray-200 flex flex-row border b-2 shadow-md p-2 m-2 h-[50px]'>
                            <button className="mr-4" onClick={() => setView('list')}>List View</button> 
                            <BsList className='relative top-[9px]' />
                            </div>

                            <div className='bg-gray-200 flex flex-row border b-2 shadow-md p-2 m-2 h-[50px] mr-[150px]'>
                            <button className="mr-4" onClick={() => setView('board')}>Board View</button> 
                            <BiSolidDashboard className='relative top-[9px]'/>
                            </div>

                         <SearchBox/>
                        
                        

                        </div>

                </div>
                <div className=''>
                 {view === 'list' ? ( <ul className="list-disc pl-5 m-5"> {data.map(item => ( <li key={item.id} className="py-2 list-none"><Card view={view} data={item}/></li> ))} </ul> ) : ( <div className="flex flex-wrap"> {data.map(item => ( <div key={item.id} className="w-1/4 p-4"> <div className="border p-4"><Card view={view} data={item}/></div> </div> ))} </div> )} 
                </div>
            </div>
            
           
            

        </div>
        
        </>
    );
}
export default MesTerrains;