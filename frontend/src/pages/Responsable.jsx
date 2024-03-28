import React from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Parentcalendar from '../components/parentcalendar'
import Stats from '../components/stats';

const links = [
    {label: 'Accueil', path: '/'} ,
    {label: 'Page 1', path: '/page1'} ,
    {label: 'Page 2', path: '/page2' },
   // Add more links as needed
  ];

  const terrain = [
    {nom: 'Terrain1'} ,
    {nom: 'Terrain2'} ,
    {nom: 'Terrain3' },
   // Add more links as needed
  ];

  const todo = [
    {nom: 'il faut faire ceci'} ,
    {nom: 'avis favorable sur le terrain2'} ,
    {nom: 'ce n est pas beau' },
   // Add more links as needed
  ];

const responsable = () => {
  return (
    <>
     <NavBar links={links}/>
     
     <div className='flex flex-row'>
     <SideBar links={links}/>
       
       <div className='flex flex-row'>
                <div className='flex flex-col'>

                        <div className='border b-2 p-5 m-2 bg-white shadow-md rounded-md w-[250px] h-[250px]'> 
                        <h1 className='text-2xl border-b-2 border-b-black mb-2 '>Terrains</h1>
                        <div className='flex flex-col'>{terrain.map((label,index) => (
                            <a href='/' key={index} className='m-2 text-xl hover:text-green-500 '>
                                {label.nom}
                            </a>
                        ))}</div>
                        </div>

                        <div className='border b-2 p-5 m-2 bg-white shadow-md rounded-md w-[250px] h-[250px]'> 
                        <h1 className='text-2xl border-b-2 border-b-black mb-2 '>To-Do/Feedback </h1>
                        <div>{todo.map((label,index) => (
                            <h2 key={index} className='m-2 text-xl hover:text-green-500 line-clamp-1'>
                                {label.nom}
                            </h2>
                        ))}</div>
                        </div>
                        
                        </div>
                        <div className='flex flex-col '>
                        <div className=' w-[950px] items-center justify-center relative right-[20px] bottom-[90px]'><Parentcalendar/></div>
                        {/*stats sous forme de graphique*/}
                        <div className='flex flex-col relative right-[50px] bottom-[50px]'><Stats/></div>
                        </div>
                        

                                        
       </div>
       
       
     </div>
     
    </>
  )
}

export default responsable