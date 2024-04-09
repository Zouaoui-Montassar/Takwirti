import React from 'react';
import Sidebar from '../chat/sidebar/Sidebar';
import MessageContainer from '../chat/messages/MessageContainer';
import Messages from '../chat/messages/Messages';
import { useAuthContext } from '../hooks/useAuthContext';

const Chatapp = () => {
  const { user } = useAuthContext();
  console.log(user);
  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg'>
      <Sidebar />
      <MessageContainer />
    </div>
  );

}


export default Chatapp;
