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
    const [selectedDate, setSelectedDate] = useState();
    const [selectedHour, setSelectedHour] = useState();
    const [reservationDetails, setReservationDetails] = useState();
    const [terrainItems, setTerrainItems] = useState();
    const [tachkila, setTachkila] = useState([]);
    const [searchTerm, setSearchTerm] = useState();
    const [team, setTeam] = useState();

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
            console.log(terrainItems);
            console.log(response.data.terrain);
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
                navigate(`/reservation/list`);
            } catch (error) {
                console.error('Error cancelling reservation:', error);
            }
        };

        const TerminerReservation = async () => {
            try {
                // Faites une requête HTTP DELETE pour annuler la réservation
                await axios.put(`http://localhost:4000/res/reservation/termin/${idRes}`);
                // Redirigez l'utilisateur vers la liste des réservations après l'annulation réussie
                navigate(`/reservation/list/${idUser}`);
            } catch (error) {
                console.error('Error ending reservation:', error);
            }
        };

        const handleOnSubmit = async (e) => { 
            e.preventDefault();
            console.log(selectedDate, selectedHour)
            let combinedDateTime = new Date(selectedDate);
            combinedDateTime.setHours(parseInt(selectedHour), 0, 0, 0);
            combinedDateTime = combinedDateTime.toISOString();
            try {
                const response = await axios.put(`http://localhost:4000/res/reservation/update/${idRes}`,{
                    date : new Date(combinedDateTime),
                    participants: tachkila,
                });
                console.log(response.data); // Assuming you want to log the response
                navigate('/reservation/list');
            } catch (error) {
                console.error('Failed to add reservation:', error);
            }
        }

        const handleDateSelect = async (date) => {
            setSelectedDate(date);
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
                <Sidebar>
                    <SidebarItem icon={<FontAwesomeIcon icon={faSearch}/>} text={<SearchBox onSearch={handleSearch}/>}  />
                    <SidebarItem icon={<Settings />} text="Home" link={'particulier'} />
                    <SidebarItem icon={<School />} text="Profile "  link={'profile'} />
                    <SidebarItem icon={<Settings />} text="Notifications" link={'notifications'} />
                    <SidebarItem icon={<Settings />} text="Reservations" link={'reservation/list'} />
                    <SidebarItem icon={<Settings />} text="Friends" link={'friendslist'} />
                </Sidebar>
                <div className="bg-white shadow-lg rounded-lg w-[100%] px-[15%] pt-[2%]">
                    <p>You reservation in {terrainItems.nom} on {reservationDetails.date} with {reservationDetails.participants}</p>
                    <p>You can update you reservation here</p>
                    <form onSubmit={handleOnSubmit}>
                        <TeamProvider value={{ team, setTeam }}>
                            <ReservationAdd 
                                idTer={idTer} 
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
                            <button onClick={TerminerReservation} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-2 md:mb-0 md:mr-2 rounded">
                                end Reservation
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
