import React ,{useState, useEffect}from 'react'
import NavBar from './NavBar'
import Sidebar, { SidebarItem } from './SideBar';
import Message from './Message';
import Image from './Image';
import { School, Settings, LogOut } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import SearchBox from './SearchBox';

const ProfileModif = () => {
    const [isSuccess, setIsSuccess] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission

    setIsSuccess(true);
  };
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
    setW(435);}
    else {setW(100);}
  }
  useEffect(() => {
    handleW(width);
  },[width]);
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };
  return (
    <>
        <NavBar />
        <div className='flex flex-row'>
        <Sidebar sendWidth={handleWidth}>
          <SidebarItem icon={<FontAwesomeIcon icon={faSearch} />} text={<SearchBox onSearch={handleSearch} test={true}/>} />
          <SidebarItem icon={<Settings />} text="Home" link={'particulier'} />
              <SidebarItem icon={<School />} text="Profile "  link={'profile'} />
              <SidebarItem icon={<Settings />} text="Notifications" link={'notifications'} />
              <SidebarItem icon={<Settings />} text="Reservations" link={'reservation/list'} />
              <SidebarItem icon={<Settings />} text="Friends" link={'friendslist'} />

        </Sidebar>
             <div className= {`relative left-[${w}px] top-[82px] w-[calc(100vw-${w}px)] flex items-center justify-center  flex-col md:ml-[200px] sm:ml-[50px]`}>
                <h1 className='bold-52 my-6'>Modfier le profile</h1>
                <form action="get" className='flex flex-col'>
                    <label htmlFor="nom" className='text-2xl text-bold m-2'>Nom</label>
                    <input type="text" name="nom" id="nom" className='border border-5 border-slate-500 w-[500px] mb-2 rounded-2xl p-2 shadow-md shadow-slate-200' placeholder='nom' />
                    <label htmlFor="prenom" className='text-2xl text-bold m-2'>Prenom</label>
                    <input type="text" name="prenom" id="prenom" className='border border-5 border-slate-500 w-[500px] mb-2 rounded-2xl p-2 shadow-md shadow-slate-200' placeholder='prenom' />
                    <label htmlFor="email" className='text-2xl text-bold m-2'>Email</label>
                    <input type="email" name="email" id="email" className='border border-5 border-slate-500 w-[500px] mb-2 rounded-2xl p-2 shadow-md shadow-slate-200' placeholder='Email' />
                    <label htmlFor="Num tel" className='text-2xl text-bold m-2'>Numéro téléphone</label>
                    <input type="text" name="Num tel" id="Num tel" className='border border-5 border-slate-500 w-[500px] mb-2 rounded-2xl p-2 shadow-md shadow-slate-200' placeholder='Tel' />
                    <label htmlFor="Photo" className='text-2xl text-bold m-2'>Photo</label>
                    <Image />
                    <label htmlFor="password" className='text-2xl text-bold m-2 '>Mot de passe</label>
                    <input type="password" name="password" id="password" className='border border-5 border-slate-500 w-[500px] mb-2 rounded-2xl p-2 shadow-md shadow-slate-200' placeholder='mot de passe' />
                    <label htmlFor="password2" className='text-2xl text-bold m-2'>Confirmer le mot de passe</label>
                    <input type="password" name="password2" id="password2" className='border border-5 border-slate-500 w-[500px] mb-2 rounded-2xl p-2 shadow-md shadow-slate-200' placeholder='confirm' />
                    <input type="submit" value="Modifier" className="border border-green-500 bg-green-500 cursor-pointer text-white rounded-3xl p-2 m-5 w-1/4 relative left-[450px]" onClick={handleSubmit}/>
                </form>
                            {isSuccess && (
                              <Message/>
                    )}
             </div>
        </div>
    </>
  )
}

export default ProfileModif