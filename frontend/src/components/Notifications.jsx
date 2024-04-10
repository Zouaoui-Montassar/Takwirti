import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import Sidebar, { SidebarItem } from './SideBar';
import { School, Settings, LogOut } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import SearchBox from './SearchBox';
import { useAuthContext } from '../hooks/useAuthContext';
import NotificationCard from './NotificationCard';
import { Bell } from 'lucide-react';
import { ContactRound , ListPlus , MessageCircleMore } from 'lucide-react';
import { CgUserList } from "react-icons/cg";

const Notifications = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [notifications, setNotifications] = useState([]);
    const { user } = useAuthContext();
    
    useEffect(() => {
      const fetchNotifications = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/noti/getallnotiuser/${user.userObj._id}`);
          setNotifications(response.data.notifications);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchNotifications();
    },[]); 

  
    const handleSearch = (searchTerm) => {
      setSearchTerm(searchTerm);
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
      setW(400);}
      else {setW(width);}
    }
    useEffect(() => {
      handleW(width);
    },[width]);


    return (
        <>
            <NavBar/>
            <div className='flex flex-row' >
                <Sidebar sendWidth={handleWidth} >
                  <SidebarItem icon={<FontAwesomeIcon icon={faSearch}/>} text={<SearchBox onSearch={handleSearch}/>} test={true}  />
                  <SidebarItem icon={<School />} text="Home" link={'particulier'} />
                  <SidebarItem icon={<ContactRound />} text="Profile " link={'profile'} />
                  <SidebarItem icon={<Bell />} text="Notifications" link={'notifications'} />
                  <SidebarItem icon={<ListPlus />} text="Reservations" link={'reservation/listP'} />
                  <SidebarItem icon={<CgUserList className='w-8 h-8' />} text="Friends" link={'friendslist'} />
                  <SidebarItem icon={<MessageCircleMore />} text="Messages" link={'chat'} />
               </Sidebar>
                <div className={`ml-[${w}px] mt-[82px] w-[100%] p-12 `}>
                    <h2 className='text-bold text-2xl m-2'>All notifications</h2> 
                    {notifications.map((notification) => (
                      <div className='flex items-center justify-center'>
                        <NotificationCard key={notification._id} data={notification} />
                      </div>
                    ))}
                </div>
            </div>
        </>
    );
                  }      
  
  export default Notifications;
  