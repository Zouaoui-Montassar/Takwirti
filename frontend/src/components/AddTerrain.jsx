import React from 'react'
import { Fragment, useState } from 'react'
import NavBar from './NavBar'
import SideBar from './SideBar'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import Dailog from './Dailog'

const people = [
  { name: 'Tunis' },
  { name: 'nabeul' },
  { name: 'sousse' },
  { name: 'gafsa' },
  
]

const links = [
    {label: 'Accueil', path: '/'} ,
    {label: 'Page 1', path: '/page1'} ,
    {label: 'Page 2', path: '/page2' },
   // Add more links as needed
  ];

const AddTerrain = () => {
  const [selected, setSelected] = useState(people);
  const[show,setShow] = useState(false);

  const showDailog = () => {
    if(show){
      setShow(false)
  }else{
    setShow(true)
  }
}


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
        <input className='border b-2  m-2 bg-white shadow-md   w-200 p-2 rounded-md' type='text' placeholder='nom du terrain'/>
        </div>

        <div className='flex flex-col w-[40%]'>
        <h3 className='text-bold text-xl relative right-11'>prix terrain</h3>
        <input className='border b-2  m-2 bg-white shadow-md   w-200 p-2 rounded-md' type='text' placeholder='prix terrain'/>
        </div>
        
        </div>

        <div className=' m-6 flex flex-col'>
        <h3 className='text-bold text-xl relative right-11'>numéro de contact</h3>
        <input className='border b-2 m-2 bg-white shadow-md  p-2 rounded-md w-full' type='tel' placeholder='contact'/>
        </div>

        <div className=' m-6 flex flex-col'>
        <h3 className='text-bold text-xl relative right-11'>Addresse</h3>
        <input className='border b-2  m-2 bg-white shadow-md   p-2 rounded-md w-full' type='text' placeholder='Adresse'/>
        </div>

        <div className='  w-full h-[300px]   flex flex-row items-center justify-center '>
            <div className='flex flex-col w-[40%] m-5'>
               <h3 className='text-bold text-xl relative right-1'>Ville</h3>
              <div className='bg-white ' >
                  <Listbox value={selected} onChange={setSelected}>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">{selected.name}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                          {people.map((person, personIdx) => (
                            <Listbox.Option
                              key={personIdx}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active ? 'bg-green-500 text-white' : 'text-gray-900'
                                }`
                              }
                              value={person}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? 'font-medium' : 'font-normal'
                                    }`}
                                  >
                                    {person.name}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                          <Listbox.Option
                              
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active ? 'bg-green-500 text-white' : 'text-gray-900'
                                }`
                               
                              }
                              key={1}
                              onclick={showDailog}
                            >ajouter une ville</Listbox.Option>
                            {show && <Dailog/> }
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>
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
        <input className='border b-2  m-2 bg-white shadow-md p-2 rounded-md w-full' type='text' placeholder='Temps par match'/>
        </div>

        <div className='w-full h-[300px] items-center justify-center flex flex-row '>

        <div className='flex flex-col m-5 w-[40%]'>
        <h3 className='text-bold text-xl relative right-7'>Temps ouverture</h3>
        <input className='border b-2  m-2 bg-white shadow-md  w-200 p-2 rounded-md' type='text' placeholder='temps ouverture'/>
        </div>

        <div className='flex flex-col w-[40%]'>
        <h3 className='text-bold text-xl relative right-11'>temps fermeture</h3>
        <input className='border b-2  m-2 bg-white shadow-md w-200 p-2 rounded-md' type='text' placeholder='temps fermeture'/>
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
