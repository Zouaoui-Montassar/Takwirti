import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Listuser from '../components/Listuser.jsx';
import { User  } from 'lucide-react';


const links = [
  { label: 'Accueil', path: '/' },
  { label: 'Page 1', path: '/page1' },
  { label: 'Page 2', path: '/page2' },
  // Ajoutez plus de liens au besoin
];

export default function Admin() {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/users/count/all');
        setUserCount(response.data.userCount);
      } catch (error) {
        console.error('Failed to fetch user count:', error);
      }
    };

    fetchUserCount();
  }, []);

  return (
    <>
      <NavBar links={links} />
      <div className="flex flex-col flex-grow justify-center items-center mt-[90px]">
        <div className="w-[150px] h-[150px] ml-[60px] border border-gray-400 rounded-2xl shadow-md shadow-slate-400 transform transition-transform hover:rotate-360 m-2">
          <div className="flex flex-col items-center justify-center w-full h-full">
            <User className="w-16 h-16 text-green-500" />
            <h1 className="text-gray-600 text-2xl text-bold">Total Users:</h1>
            <h2 className="text-green-500 text-4xl text-bold">{userCount}</h2>
          </div>
        </div>
        <Listuser />
      </div>
    </>
  );
}
