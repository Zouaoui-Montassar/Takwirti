import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'; // Import useEffect and useState if not already imported
import axios from 'axios'; // Import axios if not already imported
import Card from './Card';
import { BsList } from "react-icons/bs";
import { BiSolidDashboard } from "react-icons/bi";

function TerrainList({ param, searchTerm, id }) {
    
  const [terrainItems, setTerrainItems] = useState([]);
  const [view, setView] = useState('list');
  useEffect(() => {
    
    // Fetch data from backend API
    const fetchTerrainItems  = async () => {
      try {
        if (param === "search") {
            const response = await axios.get(`http://localhost:4000/ter/terrain/search`, { params: { searchTerm: searchTerm } });
            setTerrainItems(response.data.results); 
        }else if (param === 'get') {
            const response = await axios.get(`http://localhost:4000/ter/terrain/get`);
            setTerrainItems(response.data.results); 
        }else if (param === 'responsable') {
            const response = await axios.get(`http://localhost:4000/ter/terrain/list/${id}`);
            setTerrainItems(response.data.terrainList);
            console.log(response);
            console.log(response.data)
            console.log(response.data.terrainList) 
        }else {
            console.error('Invalid param value:', param);
            return;
        }
    } catch (error) {
      console.error('Error fetching terrain items:', error);
    }
  };
  fetchTerrainItems(); // Call the fetchTerrainItems function when the component mounts
}, [searchTerm]); // Re-run effect whenever searchItem changes

return (
    <div className='flex flex-col w-full'> {/* Utilisation de w-full pour prendre toute la largeur */}
        <div className='flex flex-col px-[3%] md:flex-row items-center md:items-start space-y-5 md:space-y-0 md:space-x-5'> {/* Utilisation de classes pour les différents breakpoints */}
            <div className='flex items-center space-x-3 mt-2'> {/* Utilisation de space-x-2 pour l'espacement horizontal */}
                <div className='bg-gray-200 flex flex-row border b-2 shadow-md p-2 h-[50px]'>
                    <button className="mr-4" onClick={() => setView('list')}>List View</button> 
                    <BsList className='relative top-[9px]' />
                </div>
                <div className='bg-gray-200 flex flex-row border b-2 shadow-md p-2 h-[50px]'>
                    <button className="mr-4" onClick={() => setView('board')}>Board View</button> 
                    <BiSolidDashboard className='relative top-[9px]'/>
                </div>
            </div>
        </div>
        <div className='flex flex-wrap'>
            {terrainItems?.map((item) => (
                <div key={item._id} className={`px-8 py-5 ${view === 'list' ? 'w-[100%]' : 'w-auto'}`}>
                    {param === 'responsable' ? (
                    <Link to={`/terrain/update/${item._id}`}>
                        <Card view={view} data={item} />
                    </Link>
                    ) : (
                    <Link to={`/terrain/detail/${item._id}`}>
                        <Card view={view} data={item} />
                    </Link>
                    )}
                </div>
            ))}
        </div>
    </div>
);
}
export default TerrainList;
