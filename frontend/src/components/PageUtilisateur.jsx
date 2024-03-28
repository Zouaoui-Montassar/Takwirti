import React, {useState} from 'react'
import NavBar from './NavBar copy';
import Sidebar , { SidebarItem } from './SideBar';
import Card from './Card';
import { Link } from 'react-router-dom';
import SearchBox from './SearchBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import TerrainList from './TerrainList';

const links = [
    { label: 'Accueil', path: '/' },
    { label: 'Page 1', path: '/page1' },
    { label: 'Page 2', path: '/page2' },
    // Add more links as needed
  ];
  
const PageUtilisateur = () => {
    const view = 'board';
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (searchTerm) => {
      setSearchTerm(searchTerm);
    };
  return (
    <>
        <NavBar copy links={links} />
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