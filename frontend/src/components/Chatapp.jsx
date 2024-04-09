import React, {useState,useEffect} from 'react';
import SidebarChat from '../chat/sidebar/Sidebar';
import MessageContainer from '../chat/messages/MessageContainer';
import Messages from '../chat/messages/Messages';
import { useAuthContext } from '../hooks/useAuthContext';
import NavBar from './NavBar';
import { School ,Settings} from 'lucide-react';
import Sidebar , { SidebarItem } from '../components/SideBar';
import SearchBox from '../components/SearchBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Chatapp = () => {
  const { user } = useAuthContext();
  console.log(user);
  const [width, setWidth] = useState();
  const [searchTerm, setSearchTerm] = useState('');

    const handleWidth = (width) => {
      setWidth(width);
    }
    useEffect(() => {
      handleWidth(width);
    },[width]);
    const [w, setW] = useState();
    const handleW = (width) => {
      if (width === 284){
      setW(284);}
      else {setW(102);}
    }
    useEffect(() => {
      handleW(width);
    },[width]);
    const handleSearch = (searchTerm) => {
      setSearchTerm(searchTerm);
    };
  return (
    <>
      <NavBar/>
      <div className='flex flex-row'>
           <Sidebar sendWidth={handleWidth} >
              <SidebarItem icon={<FontAwesomeIcon icon={faSearch}/>} text={<SearchBox onSearch={handleSearch}/>} test={true}  />
              <SidebarItem icon={<Settings />} text="Home" link={'particulier'} />
              <SidebarItem icon={<School />} text="Profile "  link={'profile'} />
              <SidebarItem icon={<Settings />} text="Notifications" link={'notifications'} />
              <SidebarItem icon={<Settings />} text="Reservations" link={'reservation/listP'} />
              <SidebarItem icon={<Settings />} text="Friends" link={'friendslist'} />
              <SidebarItem icon={<Settings />} text="Messages" link={'chat'} />

           </Sidebar>
      <div className={`flex h-[100%] md:h-[550px] sm:h-[450px] rounded-lg overflow-hidden bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg ml-[${w}px] mt-[82px] justify-center p-8 w-[90%] `}>
        <SidebarChat />
        <MessageContainer />
      </div>
      </div>
    </>
  );

}


export default Chatapp;
