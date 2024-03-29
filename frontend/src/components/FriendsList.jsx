import React, { useState } from 'react'
import NavBar from './NavBar'
import Sidebar,{SidebarItem} from './SideBar';
import FriendsCard from './FriendsCard';
import { School ,Settings,LogOut} from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import SearchBox from './SearchBox';


const links = [
    { label: 'Accueil', path: '/' },
    { label: 'Page 1', path: '/page1' },
    { label: 'Page 2', path: '/page2' },
    // Add more links as needed
  ];

const Friends = [
    {
        id: 1,
        name: 'hamdi ben salem',
        image: '/Section 1 image.jpg',
        tel :'+216 22 222 222 '
    },
    {
        id: 2,
        name: 'mahdi ben salem',
        image: '/Section 1 image.jpg',
        tel :'+216 55 555 555 '
    },
    {
        id: 3,
        name: 'mahdan ben salem',
        image: '/Section 1 image.jpg',
        tel :'+216 26 262 262 '
    },
    {
        id: 4,
        name: 'mahdan ben salem',
        image: '/Section 1 image.jpg',
        tel :'+216 26 262 262 '
    },
    {
        id: 5,
        name: 'mahdan ben salem',
        image: '/Section 1 image.jpg',
        tel :'+216 26 262 262 '
    },
];

const FriendsList = () => {
  const [searchTerm, setSearchTerm] = useState('');


  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };
  return (
    <>
      <NavBar  links={links} />
        <div className='flex flex-row'>
            <Sidebar>
                  <SidebarItem icon={<FontAwesomeIcon icon={faSearch}/>} text={<SearchBox onSearch={handleSearch}/>}  />
                  <SidebarItem icon={<School />} text="profile "  link={'profile'} />
                  <SidebarItem icon={<Settings />} text="friends list" link={'friendslist'} />
                  <SidebarItem icon={<Settings />} text="reservation list" link={'reservation/list'} />
                  <SidebarItem icon={<Settings />} text="page utilisateur" link={'particulier'} />
                  <SidebarItem icon={<LogOut />} text="se déconnecter" link={'signout'}/>
              </Sidebar>
          <div className='m-2'>
            <h2 className='text-bold text-2xl m-2'>All friends</h2>
               {Friends.map((friend) => (
                 <ul>
                    <li key={friend.id}>
                        <FriendsCard data={friend} />
                    </li>
                 </ul>
               ))}
          </div>

        </div>
    </>
  )
}

export default FriendsList