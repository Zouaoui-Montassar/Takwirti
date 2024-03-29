import React, {useState} from 'react'
import NavBar from '../components/NavBar';
import Sidebar , { SidebarItem } from '../components/SideBar';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import SearchBox from '../components/SearchBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import TerrainList from '../components/TerrainList';
import { useAuthContext } from '../hooks/useAuthContext';
import { Navigate } from 'react-router-dom';

const links = [
    { label: 'Accueil', path: '/' },
    { label: 'Page 1', path: '/page1' },
    { label: 'Page 2', path: '/page2' },
    // Add more links as needed
  ];
  
const PageUtilisateur = () => {
    const view = 'board';
    const [searchTerm, setSearchTerm] = useState('');

    const { user } = useAuthContext();
    // Check if there is no user or their type is not Particulier
if (!user || user.userObj.__t !== "Particulier" ) {
  return <Navigate to="/signin" />;
}


    const handleSearch = (searchTerm) => {
      setSearchTerm(searchTerm);
    };
  return (
    <>
        <NavBar links={links} />
        <div className='flex flex-row'>
           <Sidebar>
              <SidebarItem icon={<FontAwesomeIcon icon={faSearch}/>} text={<SearchBox onSearch={handleSearch}/>}  />
           </Sidebar>
           {searchTerm ? <TerrainList param={"search"} searchTerm={searchTerm} /> :(
            <div className='m-3'>
              <div className=''>
                <h1 className='text-3xl font-bold my-2'>Cheapest fields</h1>
                <TerrainList param={"get"}/>
              </div>
            </div>)}
        </div>
    </>
  )
}

export default PageUtilisateur