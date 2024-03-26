import React from 'react';
import { Fragment, useState, useEffect } from 'react';
import NavBar from './NavBar copy';
import SideBar from './SideBar';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import Dailog from './Dailog';
import TimeList from './TimeList';

const ville = [
  { name: 'Tunis' },
  { name: 'nabeul' },
  { name: 'sousse' },
  { name: 'gafsa' },
];

const links = [
  { label: 'Accueil', path: '/' },
  { label: 'Page 1', path: '/page1' },
  { label: 'Page 2', path: '/page2' },
  // Add more links as needed
];

const AddTerrain = () => {
  const [selected, setSelected] = useState(ville);
  const [show, setShow] = useState(false);
  const [ouverture, setOuverture] = useState('08:00');
  const [fermeture, setFermeture] = useState('00:00');
  const [data, setData] = useState(90);


  useEffect(() => {
    setData(data);
  }, [data]);

  const handleDurationChange = (e) => {
    setData(parseInt(e.target.value));
    console.log(data);
  };

  const showDialog = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  return (
    <>
      <NavBar copy links={links} />
      <div className='flex flex-row'>
        <SideBar links={links} />
        <div className='p-5  w-full h-full'>
          <h1 className='bold-52'>Add Terrain</h1>
          <form action='get'>
            <div className='w-full h-[200px] items-center justify-center flex flex-row '>
              <div className='flex flex-col m-5 w-[40%]'>
                <h3 className='text-bold text-xl relative right-7'>nom du terrain</h3>
                <input
                  className='border b-2  m-2 bg-white shadow-md  w-200 p-2 rounded-md'
                  type='text'
                  placeholder='NOM DU TERRAIN'
                />
              </div>
              <div className='flex flex-col m-5 w-[40%]'>
                <h3 className='text-bold text-xl relative right-7'>
                  phone number
                </h3>
                <input
                  className='border b-2  m-2 bg-white shadow-md  w-200 p-2 rounded-md'
                  type='phone'
                  placeholder='12345678'
                />
              </div>
            </div>

            <div className='w-full h-[200px] flex flex-row items-center justify-center'>
              <div className='flex flex-col w-[40%] m-5'>
                <h3 className='text-bold text-xl relative right-7'>
                  adreess
                </h3>
                <input
                  className='border b-2  m-2 bg-white shadow-md  w-200 p-2 rounded-md'
                  type='text'
                  placeholder='adresse'
                />
              </div>
              <div className='flex flex-col w-[40%] m-5'>
                <h3 className='text-bold text-xl relative right-1'>
                  Ville
                </h3>
                <Listbox value={selected} onChange={setSelected}>
                  <div className='relative mt-1 bg-white'>
                    <Listbox.Button className='relative w-full h-full cursor-default rounded-md bg-transparent py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
                      <span className='block truncate'>{selected.name}</span>
                      <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                        <ChevronUpDownIcon
                          className='h-5 w-5 text-gray-400'
                          aria-hidden='true'
                        />
                      </span>
                    </Listbox.Button>
                    <Transition.Child
                      as={Fragment}
                      leave='transition ease-in duration-100'
                      leaveFrom='opacity-100'
                      leaveTo='opacity-0'
                    >
                      <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'>
                        {ville.map((ville1, ville1Idx) => (
                          <Listbox.Option
                            key={ville1Idx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active ? 'bg-green-500 text-white' : 'text-gray-900'
                              }`
                            }
                            value={ville1}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? 'font-medium' : 'font-normal'
                                  }`}
                                >
                                  {ville1.name}
                                </span>
                                {selected ? (
                                  <span
                                    className='absolute inset-y-0 left-0 flex items-center pl-3 text-white'
                                  >
                                    <CheckIcon
                                      className='h-5 w-5'
                                      aria-hidden='true'
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition.Child>
                  </div>
                </Listbox>
              </div>
            </div>
            <div className='w-full h-[200px] flex flex-row items-center justify-center '>
              <div className='flex flex-col m-5 w-[40%]'>
                <h3 className='text-bold text-xl relative right-11'>
                  Temps par match
                </h3>
                <select
                  className='border b-2  m-2 bg-white shadow-md  w-200 p-2 rounded-md'
                  value={data}
                  onChange={handleDurationChange}
                >
                  <option value={60}>60 minutes</option>
                  <option value={75}>75 minutes</option>
                  <option value={90}>90 minutes</option>
                  <option value={120}>120 minutes</option>
                </select>
              </div>
              <div className='flex flex-col m-5 w-[40%]'>
                <h3 className='text-bold text-xl relative right-11'>
                  prix du match
                </h3>
                <input
                  className='border b-2  m-2 bg-white shadow-md  w-200 p-2 rounded-md'
                  type='number'
                  defaultValue={120}
                />
              </div>
            </div>
          <div className='w-full h-[200px] items-center justify-center flex flex-row '>
            <div className='flex flex-col m-5 w-[40%]'>
                <h3 className='text-bold text-xl relative right-7'>
                  Temps ouverture
                </h3>
                <input
                  className='border b-2  m-2 bg-white shadow-md  w-200 p-2 rounded-md'
                  type='time'
                  step="60"
                  defaultValue={ouverture}
                  onChange={(e) => setOuverture(e.target.value)}
                />
              </div>
            <div className='flex flex-col m-5 w-[40%]'>
              <h3 className='text-bold text-xl relative right-11'>
                temps fermeture
              </h3>
              <input
                className='border b-2  m-2 bg-white shadow-md  w-200 p-2 rounded-md'
                type='time'
                step="60"
                defaultValue={fermeture}
                onChange={(e) => setFermeture(e.target.value)}
              />
            </div>
          </div>
          <div className='w-full h-[200px] items-center justify-center flex flex-row '>
            <div className='flex flex-col m-5 w-[40%]'>
              <h3 className='text-bold text-xl relative right-11'>
                temps bloquer ou reservee
              </h3>
              <br />
              <TimeList start={ouverture} end={fermeture} step={data} label="Time Slots:"/>
            </div>
            <div className='flex flex-col m-5 w-[40%]'>
              <h3 className='text-bold text-xl relative right-11'>
                date repos
              </h3>
              <br />
              <select
                  className='border b-2  m-2 bg-white shadow-md  w-200 p-2 rounded-md'
                  value={data}
                  onChange={handleDurationChange}
                >
                  <option value={"Monday"}>Monday</option>
                  <option value={"tuesday"}>tuesday</option>
                  <option value={"wednesday"}>wednesday</option>
                  <option value={"thursday"}>thursday</option>
                  <option value={"friday"}>friday</option>
                  <option value={"saturday"}>saturday</option>
                  <option value={"sunday"}>sunday</option>
                  <option value={"none"}>none</option>
                </select>
            </div>
          </div>
        </form>
        <div className='flex flex-row items-center justify-center space-x-2'>
          <button className='border border-green-500 text-green-500 p-2 rounded-md text-xl' >
            Annuler
          </button>
          <button className='p-2 border bg-green-500 text-white rounded-md text-xl'>
            Soumettre
          </button>
        </div>

      </div>
    </div>
  </>
)
}

export default AddTerrain