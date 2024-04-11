import React, { useState, useEffect, useContext } from 'react';
import {ReservationAdd} from './ReservationAdd';
import { TeamContext, TeamProvider } from '../context/Teamcontext';
import Tachkila from './Tachkila';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Sidebar , { SidebarItem } from '../components/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { School ,Settings,LogOut} from 'lucide-react';
import SearchBox from '../components/SearchBox';
import { useAuthContext } from '../hooks/useAuthContext';

const ReservationEdit = () => {
    const { idRes } = useParams();
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const idUser = user.userObj._id;
    const [idTer, setIdTer] = useState();
    const [Datee, setDatee] = useState(new Date());
    const [selectedHour, setSelectedHour] = useState();
    const [reservationDetails, setReservationDetails] = useState();
    const [terrainItems, setTerrainItems] = useState();
    const [tachkila, setTachkila] = useState([]);
    const [searchTerm, setSearchTerm] = useState();
    const [team, setTeam] = useState();
    const [width, setWidth] = useState();
    const [selectedDate, setSelectedDate] = useState();
    const handleWidth = (width) => {
      setWidth(width);
    }
    useEffect(() => {
      handleWidth(width);
    },[width]);
    const [w, setW] = useState();
    const handleW = (width) => {
      if (width === 284){
      setW(400);}
      else {setW(width);}
    }
    useEffect(() => {
      handleW(width);
    },[width]);
    useEffect(() => {
        if (idTer == null) {
            const initialTeam = [];
            getTerrainfromReservation(); 
        }
    });
    
    useEffect(() => {
            fetchTerrainInfo();
    },[idTer])

    const getTerrainfromReservation = async () =>{
        try{
            const reservation = await axios.get(`http://localhost:4000/res/reservation/getReservationInfo/${idRes}`);
            setIdTer(reservation.data.reservations.terrain);
            const date = new Date(reservation.data.reservations.date);
            console.log(date);
            const date1 = date.toISOString()
            console.log(date1);
            setSelectedDate(date.toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
              }));
            setSelectedHour(date.toLocaleTimeString('fr-FR', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              }));
            setReservationDetails(reservation.data.reservations);
            setTachkila(reservation.data.reservations.participants)
        }catch(e){
            console.error(e);
        }
    }

    const fetchTerrainInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/ter/terrain/getInfo/${idTer}`);
            setTerrainItems(response.data.terrain);
        } catch (error) {
            console.error('Failed to fetch terrain info:', error);
        }
    };

    if (idTer != null && terrainItems != null) {
        const cancelReservation = async () => {
            try {
                // Faites une requête HTTP DELETE pour annuler la réservation
                await axios.put(`http://localhost:4000/res/reservation/annul/${idRes}`);
                // Redirigez l'utilisateur vers la liste des réservations après l'annulation réussie
                navigate(`/reservation/listP`);
            } catch (error) {
                console.error('Error cancelling reservation:', error);
            }
        };

        const handleOnSubmit = async (e) => { 
            e.preventDefault();
            let combinedDateTime = new Date(Datee);
            combinedDateTime.setHours(parseInt(selectedHour), 0, 0, 0);
            combinedDateTime = combinedDateTime.toISOString();
            try {
                const response = await axios.put(`http://localhost:4000/res/reservation/update/${idRes}`,{
                    date : new Date(combinedDateTime),
                    participants: tachkila,
                });
                navigate('/reservation/listP');
            } catch (error) {
                console.error('Failed to add reservation:', error);
            }
        }

        const handleDateSelect = async (date) => {
            setDatee(date);
            // Appeler une fonction pour récupérer les détails de la réservation pour la date sélectionnée
            setReservationDetails(reservationDetails);
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
        const handleTachkila = (tachkila) => {
            setTachkila(tachkila);
        } 
        return (
            <div>
                <NavBar />
                <div className='flex flex-row'>
                <Sidebar sendWidth={handleWidth} >
                    <SidebarItem icon={<FontAwesomeIcon icon={faSearch}/>} text={<SearchBox onSearch={handleSearch}/>} test={true}  />
                    <SidebarItem icon={<Settings />} text="Home" link={'particulier'} />
                    <SidebarItem icon={<School />} text="Profile "  link={'profile'} />
                    <SidebarItem icon={<Settings />} text="Notifications" link={'notifications'} />
                    <SidebarItem icon={<Settings />} text="Reservations" link={'reservation/listP'} />
                    <SidebarItem icon={<Settings />} text="Friends" link={'friendslist'} />
                </Sidebar>
                <div className={`relative left-[${w}px] top-[82px] w-[calc(100vw-${w}px)] p-8`}>
                    <p>You reservation in {terrainItems.nom} on {selectedDate} at {selectedHour} with {reservationDetails.participants}</p>
                    <p>You can update you reservation here</p>
                    <form onSubmit={handleOnSubmit}>
                        <TeamProvider value={{ team, setTeam }}>
                            <ReservationAdd 
                                idTer={idTer} 
                                idRes={idRes}
                                jour={reservationDetails.date}
                                sendselectedDate={handleDateSelect}
                                sendselectedHour={handleHourSelect}
                                sendterrainItems={handleTerrainItems}
                            />
                            <Tachkila handleTachkila ={handleTachkila} tachkila={reservationDetails.participants}/>
                        </TeamProvider>
                        <div className="flex flex-col md:flex-row md:justify-end mt-4">
                            <button onClick={cancelReservation} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-2 md:mb-0 md:mr-2 rounded">
                                Cancel Reservation
                            </button>
                            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                                Submit
                            </button>   
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReservationEdit;