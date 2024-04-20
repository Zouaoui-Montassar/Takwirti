import React, { useState, useEffect, useContext } from 'react';
import { TeamContext, TeamProvider } from '../context/Teamcontext';
import Reservation from './Reservation';
import Tachkila from './Tachkila';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import Sidebar , { SidebarItem } from './SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { School ,Settings,LogOut} from 'lucide-react';
import SearchBox from './SearchBox';
import { useAuthContext } from '../hooks/useAuthContext';
import { Bell } from 'lucide-react';
import { ContactRound , ListPlus , MessageCircleMore } from 'lucide-react';
import { CgUserList } from "react-icons/cg";

const ReservationEdit = () => {
    const { idRes } = useParams();
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const idUser = user.userObj._id;
    const [idTer, setIdTer] = useState();
    const [Datee, setDatee] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState();
    const [selectedHour, setSelectedHour] = useState();
    const [reservationDetails, setReservationDetails] = useState();
    const [terrainItems, setTerrainItems] = useState();
    const [tachkila, setTachkila] = useState([]);
    const [searchTerm, setSearchTerm] = useState();
    const [team, setTeam] = useState();
    const [width, setWidth] = useState();
    const [w, setW] = useState();
    const [ancien, setAncien] = useState();

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

    useEffect(() => {
        if (idTer == null) {
            const initialTeam = [];
            getTerrainfromReservation(); 
        }
    });

    useEffect(() => {
        fetchTerrainInfo();
    },[idTer])

    //fetch terrain from reservation
    const getTerrainfromReservation = async () =>{
        try{
            const reservation = await axios.get(`http://localhost:4000/res/reservation/getReservationInfo/${idRes}`);
            setIdTer(reservation.data.reservations.terrain);
            const date = new Date(reservation.data.reservations.date);
            const date1 = date.toISOString()
            setSelectedDate(date.toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
              }));
            setDatee(date.toLocaleDateString('fr-FR', {
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
            console.log(reservation.data.reservations);
            setTeam(reservation.data.reservations.participants);
            setTachkila(reservation.data.reservations.participants);
            console.log("el participants",reservation.data.reservations.participants);
        }catch(e){
            console.error(e);
        }
    }

    //fetching for terrain info to set terrainItems
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
            const dateParts = Datee.split('/'); // Séparer la chaîne en parties (jour, mois, année)
            const day = parseInt(dateParts[0], 10); // Récupérer le jour et le convertir en nombre entier
            const month = parseInt(dateParts[1], 10) - 1; // Récupérer le mois (soustraire 1 car les mois sont indexés à partir de zéro)
            const year = parseInt(dateParts[2], 10) + 2000; // Récupérer l'année (ajouter 2000 car l'année est sur deux chiffres)
            let combinedDateTime = new Date(year, month, day);
            console.log(selectedDate);
            console.log(combinedDateTime);
            combinedDateTime.setHours(parseInt(selectedHour), 0, 0, 0);
            combinedDateTime = combinedDateTime.toISOString();
            console.log("array el tachkila ",tachkila);
            try {
                const response = await axios.patch(`http://localhost:4000/res/reservation/update/${idRes}`,{
                    date : new Date(combinedDateTime),
                    participants: tachkila.map(player => ({ nom: player.nom, prenom: player.prenom, tel: player.tel, _id: player._id })),
                });
                console.log(response);
                navigate('/reservation/listP');
            } catch (error) {
                console.error('Failed to add reservation:', error);
            }
        }

        const handleDateSelect = async (date) => {
            setDatee(date.toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
              }));
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
                    <SidebarItem icon={<School />} text="Home" link={'particulier'} />
                    <SidebarItem icon={<ContactRound />} text="Profile " link={'profile'} />
                    <SidebarItem icon={<Bell />} text="Notifications" link={'notifications'} />
                    <SidebarItem icon={<ListPlus />} text="Reservations" link={'reservation/listP'} />
                    <SidebarItem icon={<CgUserList className='w-8 h-8' />} text="Friends" link={'friendslist'} />
                    <SidebarItem icon={<MessageCircleMore />} text="Messages" link={'chat'} />

                </Sidebar>
                <div className={`relative left-[${w}px] top-[82px] w-full p-8  items-center justify-center`}>
                    <p className='text-xl'>your reservation is on {new Date(reservationDetails.date).toLocaleString()}</p>
                    <p className='text-2xl my-2'>Your reservation updated in {terrainItems.nom} on {Datee} at {selectedHour} with:</p>
                    <ul>
                    {reservationDetails.participants.map((participant) => (
                        <li key={participant._id}>{participant.nom} {participant.prenom}</li>
                    ))}
                    </ul>

                    <p className='text-3xl text-green-500 my-2'>You can update you reservation here</p>
                    <form onSubmit={handleOnSubmit}>
                        <TeamProvider value={{ team, setTeam }}>
                            <Reservation 
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

export default ReservationEdit