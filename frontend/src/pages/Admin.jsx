import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Listuser from '../components/Listuser.jsx';
import { User  } from 'lucide-react';


export default function Admin() {
  const [userCount, setUserCount] = useState(0);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    const accessKey = localStorage.getItem('access');
    if (accessKey !== '123') {
      setAccessDenied(true);
    }

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

  if (accessDenied) {
    return <div className="text-red-500">Access Denied  </div>;
  }
  return (
    <>
      {/* <NavBar links={links} /> */}
      {accessDenied && <div className="text-red-500">Access Denied</div>}
      {!accessDenied && (
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
      )}
    </>
  );
}
