import React from 'react'
import NavBar from './NavBar copy';
import Sidebar from './SideBar';
import Card from './Card';
import { Link } from 'react-router-dom';


const data = [
    { id: 1, name: 'Item 1', image:'/Section 1 image.jpg' },
    { id: 2, name: 'Item 2', image:'/Section 2 image.png' },
    { id: 3, name: 'Item 3', image:'/Section 3 image.jpg' },
    { id: 4, name: 'Item 4', image:'/Section 3 image.jpg' },
    { id: 5, name: 'Item 5', image:'/Section 3 image.jpg' },
    // Add more items as needed
];


const links = [
    { label: 'Accueil', path: '/' },
    { label: 'Page 1', path: '/page1' },
    { label: 'Page 2', path: '/page2' },
    // Add more links as needed
  ];
  
const PageUtilisateur = () => {
    const view = 'board';

  return (
    <>
        <NavBar copy links={links} />
        <div className='flex flex-row'>
           <Sidebar links={links} />
            <div className='m-3'>
                 <div className=''>
                    <h1 className='text-3xl font-bold my-2'>Top Fields</h1>
                    <div className='flex flex-wrap'> 
                      {data.map(item => (
                        <div key={item.id} className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4'> 
                            <Link to={`/detail/${item.id}`} key={item.id}>
                                 <Card view={view} data={item}  />
                             </Link>
                        </div>
                       ))}
                    </div>
                 </div>

                 <div className=''>
                    <h1 className='text-3xl font-bold my-2'>Cheapest fields</h1>
                    <div className='flex flex-wrap'> 
                      {data.map(item => (
                        <div key={item.id} className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4'> 
                            <Link to={`/detail/${item.id}`} key={item.id}>
                                 <Card view={view} data={item}  />
                             </Link>
                        </div>
                       ))}
                    </div>
                 </div>
            </div>
        </div>

    </>
  )
}

export default PageUtilisateur