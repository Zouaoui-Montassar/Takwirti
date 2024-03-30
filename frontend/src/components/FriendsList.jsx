import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import Sidebar, { SidebarItem } from './SideBar';
import FriendsCard from './FriendsCard';
import { School, Settings, LogOut } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import SearchBox from './SearchBox';
import { useAuthContext } from '../hooks/useAuthContext';

const links = [
  { label: 'Accueil', path: '/' },
  { label: 'Page 1', path: '/page1' },
  { label: 'Page 2', path: '/page2' },
  // Add more links as needed
];

const FriendsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [friends, setFriends] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/users/${user.userObj._id}/friends`);
        setFriends(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFriends();
  }, [user.userObj._id]);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <>
      <NavBar links={links} />
      <div className='flex flex-row'>
        <Sidebar>
          <SidebarItem icon={<FontAwesomeIcon icon={faSearch} />} text={<SearchBox onSearch={handleSearch} />} />
          <SidebarItem icon={<Settings />} text="Home" link={'particulier'} />
              <SidebarItem icon={<School />} text="Profile "  link={'profile'} />
              <SidebarItem icon={<Settings />} text="Notifications" link={'notifications'} />
              <SidebarItem icon={<Settings />} text="Reservations" link={'reservation/list'} />
              <SidebarItem icon={<Settings />} text="Friends" link={'friendslist'} />
              <SidebarItem icon={<LogOut />} text="Se déconnecter"/>
        </Sidebar>
        <div className='m-2'>
          <h2 className='text-bold text-2xl m-2'>All friends</h2>
          {friends.map((friend) => (
            <ul>
              <li key={friend._id}>
                <FriendsCard data={friend} />
              </li>
            </ul>
          ))}
        </div>
      </div>
    </>
  );
};

export default FriendsList;
