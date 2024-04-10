import React, { useState, useEffect } from 'react';
import Calendar from './Calendar';
import List from './List';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


export const ReservationAdd = ({ idTer,idRes,jour, sendselectedDate, sendselectedHour, sendterrainItems }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedHour, setSelectedHour] = useState();
    const [terrainItems, setTerrainItems] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reservedHours, setReservedHours] = useState([]);
    const [openTime, setOpenTime] = useState("");
    const [closeTime, setCloseTime] = useState();
    const [stepDuration, setStepDuration] = useState();
    const [timeReserved, setTimeReserved] = useState();
    const locate = useLocation();
    const fetchTerrainInfo = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/ter/terrain/getInfo/${idTer}`);
          setTerrainItems(response.data.terrain);
          setCloseTime(response.data.terrain.calendrier.close);
          setOpenTime(response.data.terrain.calendrier.open);
          setStepDuration(response.data.terrain.calendrier.duree);
          setReservedHours(response.data.terrain.calendrier.time);
          sendterrainItems(response.data.terrain);
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
          handleFetchReservations();
        }
      };
      
      const handleFetchReservations = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/res/reservation/getInfo/${idTer}/${selectedDate.toISOString()}`, {
            params: {
              date: selectedDate.toISOString() // Assuming selectedDate is a valid Date object
            }
          });
          if (response.data.reservations && response.data.reservations.length > 0) {
            const reservationTimes = response.data.reservations.map(reservation => {
              const reservationDateTime = new Date(reservation.date);
              return `${String(reservationDateTime.getHours()).padStart(2, '0')}:${String(reservationDateTime.getMinutes()).padStart(2, '0')}`;
            });
      
            setTimeReserved(reservationTimes);
            setReservedHours(reservationTimes);
            console.log(reservedHours);
          } else {
            console.log('Aucune réservation trouvée');
          }
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      }
      
      useEffect(() => {
        setReservedHours([])
        setTimeReserved([])
        fetchTerrainInfo();
      }, [selectedDate]); 

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!terrainItems) {
        return <div>Terrain not found.</div>;
    }

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        sendselectedDate(date);
    };
    const handleHourSelect = (hour) => {
        setSelectedHour(hour);
        sendselectedHour(hour); 
      };

    
    return (
        <div className='flex flex-col items-center justify-center md:flex-row md:items-start md:justify-between pt-8'>
          <div className="w-full mb-4 md:mb-0"> {/* Full width on small screens, stack vertically */}
            <p className='mb-2'>select date</p>
            <Calendar className="w-full " onDateSelect={handleDateSelect} dayBlocked={terrainItems.calendrier.date } jour={locate.pathname === `/reservation/edit/${idRes}`?jour:null} /> {/* Adjust width for small screens and above */}
          </div>
          <div className="md:w-1/2 w-full"> {/* Half width on medium screens and above */}
            <p>select time</p>
            <List
                date={selectedDate}
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
    );
};
