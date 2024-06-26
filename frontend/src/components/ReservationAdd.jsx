import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { TeamContext, TeamProvider } from '../context/Teamcontext';
import Reservation from './Reservation';
import Tachkila from './Tachkila';
import NavBar from './NavBar';
import Sidebar , { SidebarItem } from './SideBar';
import SearchBox from './SearchBox';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { School ,Settings,LogOut} from 'lucide-react';
import { Bell } from 'lucide-react';
import { ContactRound , ListPlus , MessageCircleMore } from 'lucide-react';
import { CgUserList } from "react-icons/cg";
import { useAuthContext } from '../hooks/useAuthContext';
import Message from './Message';

const ReservationAdd = () => {
    const params = useParams();
    const idUser = params.idUser;
    const idTer = params.idTer; 
    const { team, setTeam } = useContext(TeamContext);
    const { user } =useAuthContext();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedHour, setSelectedHour] = useState();
    const [toNotify, setToNotify] = useState([]);
    const [terrainItems, setTerrainItems] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const [tachkila, setTachkila] = useState();
    const navigate = useNavigate();
    const [width, setWidth] = useState();
    const [w, setW] = useState();
    const [nom, setNom] = useState();
    const [error, setError] = useState(null); // State to hold error messages
    const [message, setMessage] = useState(''); // State for the message
    
    

    const handleError = (errorMessage) => {
        setError(errorMessage);
        setTimeout(() => {
          setError(null); // Clear error after some time
        }, 5000); 
      };

    //handle de la date selecteé rom calandar component
    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };
    //handle de l'heure selecteé from list component
    const handleHourSelect = (hour) => {
        setSelectedHour(hour);
    };

    const handleTerrainItems = (data) => {
        setTerrainItems(data);
    };
    //handle recherche de puis sideabr component
    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
      };
    //handle tachkila from tachkila component 
    const handleTachkila = (tachkila) => {
        setTachkila(tachkila);
    } 

    // width for the frontend layout
    const handleWidth = (width) => {
        setWidth(width);
      }
    useEffect(() => {
        handleWidth(width);
    },[width]);
    const handleW = (width) => {
        if (width === 284){
            setW(435);
        }
        else {
            setW(100);
        }
    }
    useEffect(() => {
        handleW(width);
    },[width]);

    //initialisation de tachkila
    useEffect(() => {
        const initialTeam = [];
    }, []);

    //lors de chargement de page preparation des infos de terrain
    useEffect(() => {
        const fetchTerrainInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/ter/terrain/getInfo/${idTer}`);
                setTerrainItems(response.data.terrain);
                setNom(response.data.terrain.nom)
            } catch (error) {
                console.error('Failed to fetch terrain info:', error);
            }
        };
        fetchTerrainInfo();
    }, [idTer]);
    const notifyUsers = async (e) => {
        e.preventDefault();
        setMessage('');
        const filteredUsers = tachkila.filter(user => user._id !== null);
        if (!selectedDate || !selectedHour) {
            return setMessage("Please select a time.");
        }
        // Check if players are selected
        if (tachkila.length === 0) {
            return setMessage("Please select player to notify.");
        }
        let combinedDateTime = new Date(selectedDate);
        console.log(selectedDate)
        console.log(selectedHour)
        const minutes = selectedHour.substring(3,5);
        console.log(minutes)
        combinedDateTime.setHours(parseInt(selectedHour), parseInt(minutes), 0, 0);
        combinedDateTime = combinedDateTime.toISOString();
        setToNotify(filteredUsers);
        console.log("friends eli bech notifehom : ",filteredUsers);
        try {
            const response = await axios.post('http://localhost:4000/noti/sendnoti', {
                sender: user.userObj._id,
                receivers: filteredUsers,
                message: `${user.userObj.nom} ${user.userObj.prenom} has invited you to a Takwira on ${new Date(combinedDateTime)} `
            });
            console.log(response.data); // Assuming you want to log the response
            return setMessage("Notifications sent to the respective players");
        } catch (error) {
            console.error('Failed to notify users:', error);
        }
    };
    
    
    //action de boutton submit : envoie d'une post de creation d'une nouvelle reservation
    const handleOnSubmit = async (e) => { 
        e.preventDefault();
        if (!selectedDate || !selectedHour) {
            return setMessage("Please select a time.");
        }
        let combinedDateTime = new Date(selectedDate);
        console.log(selectedDate)
        console.log(selectedHour)
        const minutes = selectedHour.substring(3,5);
        console.log(minutes)
        combinedDateTime.setHours(parseInt(selectedHour), parseInt(minutes), 0, 0);
        combinedDateTime = combinedDateTime.toISOString();
        
        try {
            
            const response = await axios.post(`http://localhost:4000/res/reservation/add/${idUser}/${idTer}`,{
                date : new Date(combinedDateTime),
                participants: tachkila,
            });
            console.log(response.data); // Assuming you want to log the response
            navigate('/reservation/listP');
        } catch (error) {
            console.error('Failed to add reservation:', error);   
            
        }
    }
  return (
    <>
        <NavBar />
                <div className='flex flex-row'>
            <Sidebar sendWidth={handleWidth} >
              <SidebarItem icon={<FontAwesomeIcon icon={faSearch}/>} text={<SearchBox onSearch={handleSearch}/>} test={true}  />
              <SidebarItem icon={<School />} text="Home" link={'particulier'} />
              <SidebarItem icon={<ContactRound />} text="Profile " link={'profile'} />
              <SidebarItem icon={<Bell />} text="Notifications" link={'notifications'} />
              <SidebarItem icon={<ListPlus />} text="Reservations" link={'reservation/listP'} />
              <SidebarItem icon={<CgUserList className='w-8 h-8' />} text="Friends" link={'friendslist'} />
              <SidebarItem icon={<MessageCircleMore />} text="Messages" link={'chat'} />

           </Sidebar>
            <div className={`px-[15%] p-[2%] ml-[${w}px] mt-[82px] w-auto justify-between items-center`}>
                <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900">Reservation Date and Time</h1>
                <p>Here you can make your reservation in { nom }</p>
                <form onSubmit={handleOnSubmit}>
                    <TeamProvider value={{ team, setTeam }}>
                        <Reservation 
                            idTer={idTer} 
                            jour={null}
                            sendselectedDate={handleDateSelect}
                            sendselectedHour={handleHourSelect}
                            sendterrainItems={handleTerrainItems}
                        />
                        <Tachkila handleTachkila ={handleTachkila}/>
                    </TeamProvider>
                     <div className="text-red-500">To ensure your reservation is successful, you need to choose and fill all the items.</div>
                    <div className="flex flex-col md:flex-row md:justify-end mt-4"> {/* Stack vertically on small screens, align to end on medium screens and above */}
                    <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mb-2 md:mb-0 md:mr-2 rounded"
                onClick={notifyUsers}
            >
                Notify Players
            </button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-2 md:mb-0 md:mr-2 rounded" type='submit'> {/* Margin on bottom on small screens, margin on right on medium screens and above */}
                            Submit
                        </button>
                        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" type='reset'>
                            Reset
                        </button>
                        
                    </div>
                </form>
            </div>
            {message && <Message message={message} noRefresh={true} />}
        </div>
    </>
  )
}

export default ReservationAdd