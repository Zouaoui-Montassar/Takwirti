import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react'; // Import useEffect and useState if not already imported
import axios from 'axios'; // Import axios if not already imported
import Card from './Card';
function TerrainList({ param, searchTerm }) {
    
  const [terrainItems, setTerrainItems] = useState([]);
  const view = 'list';
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
  <div className='flex flex-wrap'>
    {terrainItems?.map((item) => (
      <Link to={`/detail/${item.id}`} key={item._id}>
        <Card view={view} data={item} />
      </Link>
    ))}
  </div>
);
}

export default TerrainList;
