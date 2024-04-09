import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Listuser from '../components/Listuser.jsx';
import Dashboardadmin from '../components/Dashboardadmin.jsx';

const links = [
  { label: 'Accueil', path: '/' },
  { label: 'Page 1', path: '/page1' },
  { label: 'Page 2', path: '/page2' },
  // Ajoutez plus de liens au besoin
];

export default function Admin() {
  return (
    <>
      <div className="h-screen flex flex-col">
       
        <NavBar links={links} />

       
        <div className="flex flex-col flex-grow">
          
          <Dashboardadmin />

          <Listuser />
        </div>
      </div>
    </>
  );
}
