import React, { useState, useEffect } from 'react';
import Calendar from './Calendar';
import List from './List';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Reservation = ({idTer, idRes, jour, sendselectedDate, sendselectedHour, sendterrainItems }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());  
    const [selectedHour, setSelectedHour] = useState();
    const [terrainItems, setTerrainItems] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reservedHours, setReservedHours] = useState([]);
    const [openTime, setOpenTime] = useState("");
    const [closeTime, setCloseTime] = useState();
    const [stepDuration, setStepDuration] = useState();
    const [date, setDate] = useState();
    const [heure, setHeure] = useState();
    const locate = useLocation();
    console.log(jour)
    useEffect (()=> {
        if (jour !== null) {
            const y = new Date(jour);
            const options = { hour: 'numeric', minute: 'numeric' }; // Options de formatage pour toLocaleTimeString
            const x = y.toLocaleTimeString('fr-FR', options); // Utilisation de toLocaleTimeString avec les options spécifiées
            setSelectedHour(x);
            const options2 = { date: 'numeric', month: 'numeric' }; // Options de formatage pour toLocaleTimeString
            const x2 = y.toLocaleTimeString('fr-FR', options2); // Utilisation de toLocaleTimeString avec les options spécifiées
            setSelectedDate(x2);
        }
    },[idRes])

    //for fetching the terrain infos and setting the rest hours in the reseerved hours hook
    const fetchTerrainInfo = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/ter/terrain/getInfo/${idTer}`);
          setTerrainItems(response.data.terrain);
          setCloseTime(response.data.terrain.calendrier.close);
          setOpenTime(response.data.terrain.calendrier.open);
          setStepDuration(response.data.terrain.calendrier.duree);
          setReservedHours(...reservedHours,response.data.terrain.calendrier.time);
          sendterrainItems(response.data.terrain);
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
          handleFetchReservations();
        }
      };

      //for reservation fetching and setting the reserved hours in the reseerved hours hook
      const handleFetchReservations = async () => {
        try {
          console.log(selectedDate)
          const response = await axios.get(`http://localhost:4000/res/reservation/getInfo/${idTer}/${selectedDate.toISOString()}`, {
            params: {
              date: selectedDate.toISOString() // Assuming selectedDate is a valid Date object
            }
          });console.log(response)
          if (response.data.reservations && response.data.reservations.length > 0) {
            const reservationTimes = response.data.reservations.map(reservation => {
              const reservationDateTime = new Date(reservation.date);
              return `${String(reservationDateTime.getHours()).padStart(2, '0')}:${String(reservationDateTime.getMinutes()).padStart(2, '0')}`;
            });
      
            setReservedHours(...reservedHours, reservationTimes)
          } else {
            console.log('Aucune réservation trouvée');
          }
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      }

      useEffect(()=>{
        if (jour===undefined){
            setSelectedDate(new Date());
            const formattedDate = selectedDate.toLocaleDateString('fr-FR', {
                day: 'numeric', // Récupère le jour du mois (par exemple, 14)
                month: 'long' // Format de date court (par exemple, 14/04/24)
            });
            // Utilisation de la date formatée comme souhaité
            setDate(formattedDate);
            if (selectedHour !== undefined){
                const options = { hour: 'numeric', minute: 'numeric' };
                const formattedHeure = selectedDate.toLocaleTimeString('fr-FR', options);
                setHeure(formattedHeure);
            }
        }
        else {
            setSelectedDate(new Date(jour));
            const formattedDate = selectedDate.toLocaleDateString('fr-FR', {
                day: 'numeric', // Récupère le jour du mois (par exemple, 14)
                month: 'long' // Format de date court (par exemple, 14/04/24)
            });
            // Utilisation de la date formatée comme souhaité
            setDate(formattedDate);
            if (selectedHour !== undefined){
                const options = { hour: 'numeric', minute: 'numeric' };
                const formattedHeure = selectedDate.toLocaleTimeString('fr-FR', options);
                setHeure(formattedHeure);
            }       
            }
        fetchTerrainInfo();
      },[]);
      useEffect(() => {
        reservedHours.length = 0 
        setReservedHours(reservedHours)
        handleFetchReservations();
      }, [selectedDate]); 

    //cas d'erreur
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!terrainItems) {
        return <div>Terrain not found.</div>;
    }

    //when user select hour or day from calandar or list it set it and send it to the reservation add or edit
    const handleDateSelect = (date) => {
        setSelectedDate(date);
        sendselectedDate(date);
    };
    const handleHourSelect = (hour) => {
        setSelectedHour(hour);
        sendselectedHour(hour); 
    };
  return (
    <>
        <div className='flex flex-col items-center justify-center md:flex-row md:items-start md:justify-between pt-8'>
          <div className="w-full mb-4 md:mb-0"> {/* Full width on small screens, stack vertically */}
            <p className='mb-2'>select date : </p>
            <Calendar className="w-full " onDateSelect={handleDateSelect} dayBlocked={terrainItems.calendrier.date } jour={locate.pathname === `/reservation/edit/${idRes}`?jour:null} /> {/* Adjust width for small screens and above */}
          </div>
          <div className="md:w-1/2 w-full"> {/* Half width on medium screens and above */}
            <p>select time : </p>
            <List
                date={jour}
                reservedHours={reservedHours}
                isReservationPage={true}
                onHourSelect={handleHourSelect}
                start={openTime}
                end={closeTime}
                step={stepDuration}
                jour={locate.pathname === `/reservation/edit/${idRes}`?jour:null}
            />
          </div>
        </div>
    </>
  )
}

export default Reservation