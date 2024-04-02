import React, { useState, useEffect, useContext } from 'react';
import {ReservationAdd} from './ReservationAdd';
import { TeamContext, TeamProvider } from '../context/Teamcontext';
import Tachkila from './Tachkila';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Sidebar , { SidebarItem } from '../components/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { School ,Settings,LogOut} from 'lucide-react';
import { useLogout } from '../hooks/useLogout'; 
import SearchBox from '../components/SearchBox';



const ReservationAddParent = () => {
    const params = useParams();
    const idUser = params.idUser;
    const idTer = params.idTer; 
    const { team, setTeam } = useContext(TeamContext);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedHour, setSelectedHour] = useState();
    const [terrainItems, setTerrainItems] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        const initialTeam = [];
    }, []);

    useEffect(() => {
        const fetchTerrainInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/ter/terrain/getInfo/${idTer}`);
                setTerrainItems(response.data.terrain);
            } catch (error) {
                console.error('Failed to fetch terrain info:', error);
            }
        };

        fetchTerrainInfo();
    }, [idTer]);

    const handleOnSubmit = async (e) => { 
        e.preventDefault();
        let combinedDateTime = new Date(selectedDate);
        combinedDateTime.setHours(parseInt(selectedHour), 0, 0, 0);
        combinedDateTime = combinedDateTime.toISOString();
        try {
            const response = await axios.post(`http://localhost:4000/res/reservation/add/${idUser}/${idTer}`,{
                date : new Date(combinedDateTime),
                participants: team,
            });
            console.log(response.data); // Assuming you want to log the response
        } catch (error) {
            console.error('Failed to add reservation:', error);
        }
    }

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    const handleHourSelect = (hour) => {
        setSelectedHour(hour);
    };
    const handleTerrainItems = (data) => {
        setTerrainItems(data);
    };
    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
      };
      
    return (
        <>
            <NavBar />
            <div className='flex flex-row'>
            <Sidebar>
                <SidebarItem icon={<FontAwesomeIcon icon={faSearch}/>} text={<SearchBox onSearch={handleSearch}/>}  />
                <SidebarItem icon={<Settings />} text="Home" link={'particulier'} />
                <SidebarItem icon={<School />} text="Profile "  link={'profile'} />
                <SidebarItem icon={<Settings />} text="Notifications" link={'notifications'} />
                <SidebarItem icon={<Settings />} text="Reservations" link={'reservation/list'} />
                <SidebarItem icon={<Settings />} text="Friends" link={'friendslist'} />
            </Sidebar>
                        <div className="bg-white shadow-lg rounded-lg w-[100%] px-[15%] pt-[2%]">
                            <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900">Reservation Date and Time</h1>
                            <p>Here you can make your reservation in {/* {terrainItems.nom} */}</p>
                            <form onSubmit={handleOnSubmit}>
                                <TeamProvider value={{ team, setTeam }}>
                                    <ReservationAdd 
                                        idTer={idTer} 
                                        sendselectedDate={handleDateSelect}
                                        sendselectedHour={handleHourSelect}
                                        sendterrainItems={handleTerrainItems}
                                    />
                                    <Tachkila/>
                                </TeamProvider>
                                <div className="flex flex-col md:flex-row md:justify-end mt-4"> {/* Stack vertically on small screens, align to end on medium screens and above */}
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-2 md:mb-0 md:mr-2 rounded" type='submit'> {/* Margin on bottom on small screens, margin on right on medium screens and above */}
                                        Submit
                                    </button>
                                    <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" type='reset'>
                                        Reset
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
        </>
    );
};

export default ReservationAddParent;