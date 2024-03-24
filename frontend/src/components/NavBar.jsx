import { Card, List, ListItem } from "@material-tailwind/react";
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import whitelogo from '../assets/whitelogo.png';
const NavBar = ({ links }) => {
  const [isHomePage, setIsHomePage] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleNotificationMenu = () => {
    setIsNotificationMenuOpen(!isNotificationMenuOpen);
  };

  return (
    <nav className='bg-green-500 fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 py-3 max-container text-white'>
      <div className='flex flex-row'>
        <img src={whitelogo} alt="logo" width={74} height={50} />
        <h1 className='text-2xl font-bold pt-4'> Takwirti |</h1> 
      </div>
      
      <div className="hidden md:block  "> {/* This div will hold the links */}
        <List className="flex flex-row">
          {links.map((link, index) => (
            <ListItem className="text-white-50 text-xl" key={index}>
              {link.label} 
            </ListItem>
          ))}
        </List>
      </div>

  <div className='flex space-x-7 items-center justify-center'>
    {isHomePage ? (
      <>
        <button className='text-white hover:rounded-xl hover:bg-white hover:text-green-500 hover:w-auto hover:p-2'>Login</button>
        <button className='bg-white text-green-500 px-4 py-2 rounded-full'>Sign up</button>
      </>
    ) : (
      <>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src={whitelogo}
              alt="user photo"
            />
          </button>
          {isMenuOpen && (
            <div className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute top-14 right-0">
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">Kaou Achraf</span>
                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                  achraf03achref@gmail.com
                </span>
              </div>
              <ul className="py-2 text-black">
                <li>
                  <Link to="/settings">Settings</Link>
                </li>
                <li>
                  <Link to="/signout">Sign out</Link>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="relative px-5">
          <FontAwesomeIcon icon={faBell} className="me-4 flex items-center text-3xl text-neutral-600 dark:text-white cursor-pointer" onClick={toggleNotificationMenu} />
          {isNotificationMenuOpen && (
            <ul
              className="absolute z-[1000] top-14 right-0 m-0 min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-black shadow-lg"
              data-twe-dropdown-menu-ref
            >
              <li>
                <Link to="/notifications" className="block py-2 px-4 hover:bg-gray-100 transition duration-300">Notification 1</Link>
              </li>
              <li>
                <Link to="/notifications" className="block py-2 px-4 hover:bg-gray-100 transition duration-300">Notification 2</Link>
              </li>
              <li>
                <Link to="/notifications" className="block py-2 px-4 hover:bg-gray-100 transition duration-300">Notification 3</Link>
              </li>
            </ul>
          )}
        </div>
      </>
    )}
  </div>
</nav>

  );
};

export default NavBar;
