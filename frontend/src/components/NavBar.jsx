import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import whitelogo from '../assets/whitelogo.png';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const NavBar = ({ links }) => {
  const { user } = useAuthContext(); 
  const [isHomePage, setIsHomePage] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);

  const { logout } = useLogout()

  const handleClick = () => {
    logout();
    alert("logged out successfully");
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleNotificationMenu = () => {
    setIsNotificationMenuOpen(!isNotificationMenuOpen);
  };



  return (
    <nav className='bg-green-500  top-0 left-0 right-0  flex justify-between items-center px-4 py-3 max-container text-white '>
      <div className='flex flex-row'>
        <img src={whitelogo} alt="logo" width={74} height={50} />
        <h1 className='text-2xl font-bold pt-4'> Takwirti |</h1> 
      </div>
      
      
      <div className='flex space-x-7 items-center justify-center'>
        {isHomePage ? (
          <>
            <Link to="/signin" className='text-white hover:rounded-xl hover:bg-white hover:text-green-500 hover:w-auto hover:p-2'>Login</Link>
            <Link to="/signupparti" className='bg-white text-green-500 px-4 py-2 rounded-full'>Sign up</Link>
          </>
        ) : (
          <>
          <div className="hidden md:block"> {/* This div will hold the links */}
            <ul className="flex flex-row">
              {links.map((link, index) => (
                <li className="text-white-50 text-xl" key={index}>
                  <Link to={link.path}>{link.label}</Link> 
                </li>
              ))}
            </ul>
          </div>
            {/* User Menu */}
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
                  {Object.keys(user.userObj)
                    .filter((key) => ["nom", "prenom", "email", "DN", "tel", "__t"].includes(key))
                    .map((key) => {
                      if (key === "DN") {
                        // Format the date
                        const date = new Date(user.userObj[key]).toLocaleDateString("en-US");
                        return (
                          <div key={key} className="block text-sm">
                            
                            <span className="truncate text-black">{date}</span>
                          </div>
                        );
                      } 
                      else {
                        return (
                          <div key={key} className="block text-sm">
                            
                            <span className="truncate text-black">{user.userObj[key]}</span>
                          </div>
                        );
                      }
                    })}
                </div>
                  <ul className="py-2 text-black">
                    <li>
                      <Link to="/profile/modifier">Settings</Link>
                    </li>
                    <li>
                      <Link to="/signin" onClick={handleClick}>Sign out</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Notification Menu */}
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
