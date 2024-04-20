import React from 'react';
import NavBar from '../components/NavBar';
import SideBar, { SidebarItem } from '../components/SideBar';
import { School, Settings } from 'lucide-react';
import { Fragment, useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import Dailog from './Dailog';
import TimeList from './TimeList';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Image from './Image';
import { ListPlus , Dribbble } from 'lucide-react';
import { useAuthContext } from '../hooks/useAuthContext';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../firebase";

const ville = [
  { name: 'Tunis' },
  { name: 'nabeul' },
  { name: 'sousse' },
  { name: 'gafsa' },
];

// id w func mawjoudin fel path (a modifier plus tard)
const Terrain = ({ func }) => {
  const [width, setWidth] = useState();
  const { user } = useAuthContext();
  const id = user.userObj._id;
  const idTer = useParams();
  const [img, setImg] = useState("abc")
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [selected, setSelected] = useState(ville);//ville
  const [data, setData] = useState(90);//duree
  const [prix, setPrix] = useState(120)
  const [ouverture, setOuverture] = useState('08:00');
  const [fermeture, setFermeture] = useState('00:00');
  const [time , setTime] = useState([]);
  const [date, setDate] = useState("none");
  const [status, setStatus]=useState();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null); // State to hold the uploaded image
  const [terrainItems, setTerrainItems] = useState([]);
  const [calendrier, setCalendrier] = useState([]);
  const [error, setError] = useState(null); // State to hold error messages

  // Function to handle errors
  const handleError = (errorMessage) => {
    setError(errorMessage);
    setTimeout(() => {
      setError(null); // Clear error after some time
    }, 5000); // Adjust time as needed
  };


  const handleWidth = (width) => {
    setWidth(width);
  }
  useEffect(() => {
    handleWidth(width);
  },[width]);
  const [w, setW] = useState();
  const handleW = (width) => {
    if (width === 284){
    setW(220);}
    else {setW(width);}
  }
  useEffect(() => {
    handleW(width);
  },[width]);
  const getTerrain = async() => {
    try { 
      const response = await axios.get(`http://localhost:4000/ter/terrain/getInfo/${idTer.id}`);
      setTerrainItems(response.data.terrain);
      setCalendrier(response.data.terrain.calendrier); 
    }catch(e) { 
      console.error('Error fetching terrain items:', e);
    }
  }
  useEffect(() => {
    getTerrain();
  },[])

  const handleImageUpload = async (file) => {
    setImage(file); // Set the uploaded image in state
  };
  const handleTime = (time) => {
    setTime(time);
  }
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  useEffect(() => {
    setData(data);
  }, [data]);

  const handleDurationChange = (e) => {
    setData(e.target.value);
  };

  const showDialog = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      let imageUrl;
      if (image) {
        const storageRef = ref(storage, `terrainpictures/${user.userObj._id}`);
        const imageSnapshot = await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(imageSnapshot.ref);
        console.log(imageUrl);
      }
      if (func === "add") {
        response = await axios.post(`http://localhost:4000/ter/terrain/add/${id}`, {
          img: imageUrl,
          nom: name,
          phone: phone,
          prix: prix,
          position: `${address}, ${selected.name}`, // Adjust the position format as needed
          open: ouverture,
          close: fermeture,
          duree: data,
          time: time,
          date: date,
          status: "Disponible",
        });
      } else if (func === "update") {
        console.log(time);
        response = await axios.put(`http://localhost:4000/ter/terrain/update/${idTer.id}`, {
          img: imageUrl,
          nom: name,
          phone: phone,
          prix: prix,
          open: ouverture,
          close: fermeture,
          duree: data,
          time: time,
          date: date,
          status: status,
        });
      }
  
      if (response.data) {
        console.log(`Terrain ${func}ed successfully`);
      } else {
        console.error(`Failed to ${func} terrain`);
        handleError(`Failed to ${func} terrain`);
      }
      navigate(`/terrain/responsable`)
    } catch (error) {
      console.error(`Error ${func}ing terrain:`, error);
      handleError(`Error ${func}ing terrain`);
    }
  };
  
  const handleDeleteTerrain = async () => {
    try {
      const response = await axios.delete(`http://localhost:4000/ter/terrain/delete/${id}`);
      if (response.status === 200) {
        console.log('Terrain deleted successfully');
        // Optionally, perform any other actions after successful deletion
      } else {
        console.error('Failed to delete terrain');
        handleError(`Failed to delete terrain`);
      }
    } catch (error) {
      console.error('Error deleting terrain:', error);
    }
  };
  

  return (
    <>
    <NavBar  />
      <div className='flex flex-row'>
        <SideBar sendWidth={handleWidth}>
          <SidebarItem icon={<School />} text="Dashboard" link={'responsable'} />
          <SidebarItem icon={< Dribbble />} text="list terrain" link={`terrain/responsable`} />
          <SidebarItem icon={<ListPlus /> } text="reservation list" link={'reservation/listR'} />
        </SideBar>
      <div className={`p-5  h-full ml-[${w}px] mt-[82px] w-[100%] justify-center items-center`}>
        <h1 className='bold-52'>{func} Stadium</h1>
        <form onSubmit={handleSubmit}>
            <div className='w-full h-[200px] items-center justify-center flex flex-row '>
              <div className='flex flex-col m-5 w-[40%]'>
                <h3 className='text-bold text-xl relative right-7'>Stadium Name</h3>
                <input
                  className='border b-2  m-2 bg-white shadow-md  w-200 p-2 rounded-md'
                  type='text'
                  placeholder='NOM DU TERRAIN'
                  onChange={(e) => {setName(e.target.value)}}
                  defaultValue={func==="update"? terrainItems.nom : null}
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
                  onChange={(e) => {setPhone(e.target.value)}}
                  defaultValue={func==="update"? terrainItems.phone : null}

                />
              </div>
            </div>

            <div className='w-full h-[200px] flex flex-row items-center justify-center'>
              <div className='flex flex-col w-[40%] m-5'>
                <h3 className='text-bold text-xl relative right-7'>
                  address
                </h3>
                <input
                  className='border b-2  m-2 bg-white shadow-md  w-200 p-2 rounded-md'
                  type='text'
                  placeholder='adresse'
                  onChange={handleAddressChange}
                  disabled={func === 'update'}
                  title={func === 'update' ? 'Ce champ est inaccessible en mode édition de terrain' : ''}
                  defaultValue={func==="update"? terrainItems.position : null}

                />
              </div>
              <div className='flex flex-col w-[40%] m-5'>
                <h3 className='text-bold text-xl relative right-1'>
                  city
                </h3>
                <Listbox defaultValue={selected.name} onChange={setSelected} disabled={func === 'update'} title={func === 'update' ? 'Ce champ est inaccessible en mode édition de terrain' : ''}>
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
                  Time per match
                </h3>
                <select
                  className='border b-2  m-2 bg-white shadow-md  w-200 p-2 rounded-md'
                  onChange={(e) => {handleDurationChange(e)}}
                  defaultValue={func==="update"? calendrier.duree : 90}

                >
                  <option value={60}>60 minutes</option>
                  <option value={75}>75 minutes</option>
                  <option value={90}>90 minutes</option>
                  <option value={120}>120 minutes</option>
                </select>
              </div>
              <div className='flex flex-col m-5 w-[40%]'>
                <h3 className='text-bold text-xl relative right-11'>
                  match prize
                </h3>
                <input
                  className='border b-2  m-2 bg-white shadow-md  w-200 p-2 rounded-md'
                  type='number'
                  onChange= {(e) => {setPrix(e.target.value)}}
                  defaultValue={func==="update"? terrainItems.prix : 120}
                  
                />
              </div>
            </div>
          <div className='w-full h-[200px] items-center justify-center flex flex-row '>
            <div className='flex flex-col m-5 w-[40%]'>
                <h3 className='text-bold text-xl relative right-7'>
                  Opening time
                </h3>
                <input
                  className='border b-2  m-2 bg-white shadow-md  w-200 p-2 rounded-md'
                  type='time'
                  step="60"
                  onChange={(e) => setOuverture(e.target.value)}
                  defaultValue={func==="update"? calendrier.open : ouverture}

                />
              </div>
            <div className='flex flex-col m-5 w-[40%]'>
              <h3 className='text-bold text-xl relative right-11'>
                closing time
              </h3>
              <input
                className='border b-2  m-2 bg-white shadow-md  w-200 p-2 rounded-md'
                type='time'
                step="60"
                defaultValue={func==="update"? calendrier.close : fermeture}
                onChange={(e) => setFermeture(e.target.value)}
              />
            </div>
          </div>
          {func === 'update' && (
              <div className='w-full h-[200px] items-center justify-center flex flex-row '>
                <h3 className='text-bold text-xl relative right-11'>
                    availability of Satdium
                </h3>
                <input
                  className='border b-2  m-2 bg-white shadow-md  w-200 p-2 rounded-md'
                  type="radio"
                  id="disponible"
                  name="status"
                  value="disponible"
                  checked={terrainItems.status === 'disponible'}
                  onChange={(e) => setStatus(e.target.value)}
                />
                <label htmlFor="disponible">Disponible</label>

                <input
                  className='border b-2  m-2 bg-white shadow-md  w-200 p-2 rounded-md'
                  type="radio"
                  id="indisponible"
                  name="status"
                  value="indisponible"
                  checked={terrainItems.status === 'indisponible'}
                  onChange={(e) => setStatus(e.target.value)}
                />
                <label htmlFor="indisponible">Indisponible</label>
              </div>
            )}
          <div className='w-full h-auto items-center justify-center flex flex-row'>
              <div className='flex flex-col m-5 w-[40%] '>
                <h3 className='text-bold text-xl relative right-11 '>
                  time block or reserved
                </h3>
                <br />
                {/* Placez le composant TimeList ici */}
                <TimeList start={ouverture} end={fermeture} step={data} label="Time Slots:" sendDataToParent={handleTime} time={func==="update"?calendrier.time : null} />
              </div>
              <div className='flex flex-col m-5 w-[40%]'>
                <h3 className='text-bold text-xl relative right-11'>
                  rest date
                </h3>
                <br />
                <select
                  className='border b-2  m-2 bg-white shadow-md  w-200 p-2 rounded-md'
                  value={func==="update" ? calendrier.date : date}
                  onChange={(e) => {setDate(e.target.value)}}
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
            
            <div className=' justify-center items-center m-4 '>
              <div className='relative left-[350px]  w-[500px]'>
                <Image onImageUpload={handleImageUpload} pic={func === "upade" ? terrainItems.img: null} />
              </div>
            </div>

                      {error && (
              <div className="flex justify-center items-center h-screen fixed top-0 left-0 w-full bg-gray-500 bg-opacity-75 z-50">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-[50%] my-5">
                  <strong className="font-bold text-xl">Error: </strong>
                  <span className="block sm:inline text-red-500 text-xl">{error}</span>
                </div>
              </div>
            )}

      
           

          <div className='flex flex-row items-center justify-center space-x-2'>
          <button
            className='border border-green-500 text-green-500 p-2 rounded-md text-xl'
            onClick={func === 'update' ? handleDeleteTerrain : null}
            type={func === 'update' ? 'button' : 'reset'}
          >
            {func === 'update' ? 'Delete Stadium' : 'Cancel'}
          </button>
          <button className='p-2 border bg-green-500 text-white rounded-md text-xl' type="submit">
            Confirm
          </button>
        </div>
        </form>
      </div>
      </div>
  </>
)
}

export default Terrain