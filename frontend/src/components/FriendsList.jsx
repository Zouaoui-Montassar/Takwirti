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
import { Bell } from 'lucide-react';
import { ContactRound , ListPlus , MessageCircleMore } from 'lucide-react';
import { CgUserList } from "react-icons/cg";

const FriendsList = () => {
  const [searchUserTerm, setsearchUserTerm] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [friends, setFriends] = useState([]);
  const [findpeople, setFindpeople] =useState([]);
  const [clicked, setClicked] =useState(false);
  const { user } = useAuthContext();
  const handleSearchBar = (searchTerm) => {
    // search bar ala jnab
  };
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

  const removeFriend = async (friendId) => {
    try {
      const response = await fetch('http://localhost:4000/api/users/remove_friend', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: user.userObj._id, friendId })
      });
      
      const data = await response.json();
      console.log(data.message);
      setFriends(friends.filter(friend => friend._id !== friendId));
    } catch (error) {
      console.error('Failed to remove friend', error);
    }
  };
  const handleSearchUser = async () => {
    try {
      console.log("Search term:", searchUserTerm);
      const response = await axios.get(`http://localhost:4000/api/users/search/${searchUserTerm}`);
      console.log(response.data);
      setClicked(true);
      setFindpeople(response.data.users);
    } catch (error) {
      console.error('Failed to search for users', error);
    }
  };
  
  const addFriend = async (friendId) => {
    try {
      const response = await fetch('http://localhost:4000/api/users/send_friend_request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: user.userObj._id, friendId : friendId })
      });
      
      const data = await response.json();
      console.log(data.message);
      alert(data.message);
    } catch (error) {
      console.error('Failed to sent a friend request', error);
    }
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
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };
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
        <div className={` ml-[${w}px] mt-[82px] w-[100%] p-12`}>
        <h2 className='text-bold text-2xl m-2'>Find People</h2>
        <div className="flex items-center justify-center">
            <div className="flex space-x-1">
                <input
                    type="text"
                    className="block w-full px-10 py-2 text-green-500 bg-white border rounded-full focus:border-green-500 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Search..."
                    value={searchUserTerm}
                    onChange={(e) => setsearchUserTerm(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                          e.preventDefault();
                          handleSearchUser();
                      }
                  }}
                />
                <button className="px-4 text-white bg-green-500 rounded-full" onClick={handleSearchUser}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
            </div>
        </div>
        {findpeople.length === 0 && searchUserTerm.length === 0 && (
          <div className='m-2'>
            <h2 className='text-bold text-2xl m-2 opacity-20'>Find people by their name , or their phone number !</h2>
          </div>
        )}
        { clicked && (
          <h2 className='text-bold text-2xl m-2'>Search Results</h2>
        )}

        {findpeople.length === 0 && clicked && searchUserTerm.length > 0 && (
          <div className='m-2'>
            <h2 className='text-bold text-2xl m-2'>No users with the specified input found</h2>
          </div> // lin ntraiti cas enou string fergha
        )}
        {findpeople.length === 1 && clicked && findpeople[0]._id === user.userObj._id && (
          <div className='m-2'>
          <h2 className='text-bold text-2xl m-2'>No users with the specified input found</h2>
        </div> // yfiltri el current user fi cas enou 7at esmou
        )

        }
        { findpeople.length > 0 && (
          <div className='m-2 '>
{findpeople
  .filter(person => person._id !== user.userObj._id && !friends.some(friend => friend._id === person._id))
  .map((person) => (
    <FriendsCard key={person._id} data={person} onAddFriend={addFriend} showAddButton={true} />
  ))}

</div>
)}
          <h2 className='text-bold text-2xl m-2'>All friends</h2>
          {friends.length === 0 && (
  <div className="m-2">
    <h2 className="text-gray-500 text-lg text-center">No friends found</h2>
  </div>
)}
{friends.map((friend) => (
  <ul className="flex items-center justify-center " key={friend._id}>
    <li>
      <FriendsCard data={friend} onRemoveFriend={removeFriend} />
    </li>
  </ul>
))}
        </div>
      </div>
    </>
  );
};

export default FriendsList;
