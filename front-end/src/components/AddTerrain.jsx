import React from 'react'

import NavBar from './NavBar'
import SideBar from './SideBar'




const links = [
    {label: 'Accueil', path: '/'} ,
    {label: 'Page 1', path: '/page1'} ,
    {label: 'Page 2', path: '/page2' },
   // Add more links as needed
  ];

const AddTerrain = () => {
  return (
    <>
      <NavBar/>
      <div className='flex flex-row'>
      <SideBar links={links}/>
      <div className='p-5  w-full h-full'>
      <h1 className='bold-52'>Add Terrain</h1>
      <form action="get">
      <div className='w-full h-[300px] items-center justify-center flex flex-row '>

        <div className='flex flex-col m-5 w-[40%]'>
        <h3 className='text-bold text-xl relative right-7'>nom du terrain</h3>
        <input className='border border-black  w-200 p-2 rounded-md' type='text' placeholder='nom du terrain'/>
        </div>

        <div className='flex flex-col w-[40%]'>
        <h3 className='text-bold text-xl relative right-11'>prix terrain</h3>
        <input className='border border-black  w-200 p-2 rounded-md' type='text' placeholder='prix terrain'/>
        </div>
        
        </div>

        <div className=' m-6 flex flex-col'>
        <h3 className='text-bold text-xl relative right-11'>numéro de contact</h3>
        <input className='border border-black   p-2 rounded-md w-full' type='tel' placeholder='contact'/>
        </div>

        <div className=' m-6 flex flex-col'>
        <h3 className='text-bold text-xl relative right-11'>Addresse</h3>
        <input className='border border-black   p-2 rounded-md w-full' type='text' placeholder='Adresse'/>
        </div>

        <div className='  w-full h-[300px]   flex flex-row items-center justify-center'>
            <div className='flex flex-col w-[40%] m-5'>
               <h3 className='text-bold text-xl relative right-1'>Ville</h3>
               <select className='w-full border border-black' name="select" id="/">
                 <option value="1">tunis</option>
                 <option value="2">nabeul</option>
               </select>
            </div>

            <div className='flex flex-col w-[40%] m-5'>
               <h3 className='text-bold text-xl relative right-1'>Statut</h3>
               <select className='w-full border border-black' name="select" id="/">
                 <option value="1">neuf</option>
                 <option value="2">ancien</option>
               </select>
            </div>
        </div>

        <div className=' m-6 flex flex-col'>
        <h3 className='text-bold text-xl relative right-11'>Temps par match</h3>
        <input className='border border-black   p-2 rounded-md w-full' type='text' placeholder='Temps par match'/>
        </div>

        <div className='w-full h-[300px] items-center justify-center flex flex-row '>

        <div className='flex flex-col m-5 w-[40%]'>
        <h3 className='text-bold text-xl relative right-7'>Temps ouverture</h3>
        <input className='border border-black  w-200 p-2 rounded-md' type='text' placeholder='temps ouverture'/>
        </div>

        <div className='flex flex-col w-[40%]'>
        <h3 className='text-bold text-xl relative right-11'>temps fermeture</h3>
        <input className='border border-black  w-200 p-2 rounded-md' type='text' placeholder='temps fermeture'/>
        </div>
        
        </div>
      </form>
      <div className='flex flex-row items-center justify-center space-x-2'>
        <button className='border border-green-500 text-green-500 p-2 rounded-md text-xl' >Annuler</button>
        <button className='p-2 border bg-green-500 text-white rounded-md text-xl'>Soumettre</button>
      </div>
       
      

      
      </div>
      
      </div>
      
    </>
  )
}

export default AddTerrain
