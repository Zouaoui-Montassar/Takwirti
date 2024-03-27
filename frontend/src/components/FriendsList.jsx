import React from 'react'
import NavBar from './NavBar copy'
import Sidebar from './SideBar';
import FriendsCard from './FriendsCard';

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
  return (
    <>
      <NavBar copy links={links} />
        <div className='flex flex-row'>
          <Sidebar />
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