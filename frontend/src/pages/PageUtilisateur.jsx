import React, {useState,useEffect} from 'react'
import NavBar from '../components/NavBar';
import Sidebar , { SidebarItem } from '../components/SideBar';
import SearchBox from '../components/SearchBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import TerrainList from '../components/TerrainList';
import { useAuthContext } from '../hooks/useAuthContext';
import { Navigate } from 'react-router-dom';
import { School ,Settings} from 'lucide-react';
import { Bell } from 'lucide-react';
import { ContactRound , ListPlus , MessageCircleMore } from 'lucide-react';
import { CgUserList } from "react-icons/cg";


  
const PageUtilisateur = () => {
    const view = 'board';
    const [searchTerm, setSearchTerm] = useState('');
    const { user } = useAuthContext();
    const [isLoaded, setIsLoaded] = useState(false); // Initialize isLoaded to false
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
      setW(500);}
      else {setW(102);}
    }
    useEffect(() => {
      handleW(width);
    },[width]);
    console.log(w);
    // Check if there is no user or their type is not Particulier
    useEffect(() => {
      if (!user || user.userObj.__t !== 'Particulier') {
        return <Navigate to="/signin" />;
      }
      setIsLoaded(true); // Set isLoaded to true once user data is loaded
    }, [user]);


    const handleSearch = (searchTerm) => {
      setSearchTerm(searchTerm);
    };

    if (!isLoaded) {
      // Return null or a loading component while waiting for user data
      return <div>Loading...</div>;
    }
  return (
    <>
        <NavBar />
        <div className='flex flex-row'>
           <Sidebar sendWidth={handleWidth} >
              <SidebarItem icon={<FontAwesomeIcon icon={faSearch}/>} text={<SearchBox onSearch={handleSearch}/>} test={true}  />
              <SidebarItem icon={<School />} text="Home" link={'particulier'} />
              <SidebarItem icon={<ContactRound />} text="Profile " link={'profile'} />
              <SidebarItem icon={<Bell />} text="Notifications" link={'notifications'} />
              <SidebarItem icon={<ListPlus />} text="Reservations" link={'reservation/listP'} />
              <SidebarItem icon={<CgUserList className='w-8 h-8' />} text="Friends" link={'friendslist'} />
              <SidebarItem icon={<MessageCircleMore />} text="Messages" link={'chat'} />

           </Sidebar>
           <div className={`ml-[${w}px] flex mt-[82px] w-[100%] justify-center items-center`}>
           {searchTerm ? <TerrainList param={"search"} searchTerm={searchTerm} width={w} /> :(
              <div className=''>
                <h1 className='text-3xl font-bold my-2'>Cheapest fields</h1>
                <TerrainList param={"get"} width={w}/>
              </div>)}
            </div>
        </div>
    </>
  )
}

export default PageUtilisateur