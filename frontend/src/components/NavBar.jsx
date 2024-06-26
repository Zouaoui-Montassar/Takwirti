import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import whitelogo from '../assets/whitelogo.png';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const NavBar = ({ isHomePage }) => {
  /*added , isHomePage fou9 hedhi bedhabet   */ 
  const { user } = useAuthContext(); // bech naffichi el infos fel profile ala jnab
  /* const [isHomePage, setIsHomePage] = useState(false); */
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);
  const { logout } = useLogout()
  const handleClick = () => {
    logout();
    alert("logged out successfully");
  }
  const isParticulier = user && user.userObj && user.userObj.__t === 'Particulier';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

/*   const toggleNotificationMenu = () => {
    setIsNotificationMenuOpen(!isNotificationMenuOpen);
  };
 */


  return (
    <nav className={`bg-primary-50 fixed top-0 z-40 h-[82px] w-[100%] flex justify-between items-center py-3 max-container text-white ${isHomePage ? 'px-[10%]' : 'px-[3%]'}`}>
      
      <Link to="/">
    <div className='flex flex-row'>
      <img src={whitelogo} alt="logo" width={74} height={50} />
      <h1 className='text-2xl font-bold pt-4'> Takwirti |</h1>
    </div>
    </Link>

      <div className='flex space-x-7 items-center justify-center'>
        {isHomePage ? (
          <>
            <Link to="/signin" className='text-white hover:rounded-full hover:bg-white hover:text-green-500  px-5 py-2'>Login</Link>
            <Link to="/signupparti" className='bg-white text-green-500 px-4 py-2 rounded-full'>Sign up</Link>
          </>
        ) : (
          <>
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
                  src={user.userObj.image}
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
            {isParticulier && (
              <div className="relative px-5">
                <Link to="/notifications">
                  <FontAwesomeIcon icon={faBell} className="me-4 flex items-center text-3xl dark:text-white cursor-pointer" />
                </Link>
              </div>)}
              {/* {isNotificationMenuOpen && (
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
              )} */}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;