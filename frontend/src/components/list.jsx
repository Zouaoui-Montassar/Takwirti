import React, { useState, useEffect } from 'react';
import {useParams,useLocation} from 'react-router-dom';
import axios from 'axios';
const List = ({ date, reservedHours, isReservationPage, onHourSelect, start, end, step , jour }) => {
  const [selectedHour, setSelectedHour] = useState('');
  const [reservations,setReservations] = useState([]);
  const [idUser,setIdUser] = useState();
  const modifiedDate = new Date(date);
  let jourDate ;
  if (selectedHour && typeof selectedHour === 'string') {
    const [hour, minutes] = selectedHour.split(':');
    jourDate = modifiedDate.setHours(parseInt(hour), parseInt(minutes));
  }
  const idTer = useParams().terrainId;
  const location = useLocation();
  const isRespo = location.pathname === `/responsable/${idTer}`;
  const handleFetchReservations = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/res/reservation/getInfo/${idTer}/${modifiedDate.toISOString()}`, {
        params: {
          date: modifiedDate.toISOString() // Assuming selectedDate is a valid Date object
        }
      });
      console.log(response);
      if (response.data.reservations && response.data.reservations.length > 0) {
        const reservations = response.data.reservations.map(reservation => ({
          time: `${String(new Date(reservation.date).getHours()).padStart(2, '0')}:${String(new Date(reservation.date).getMinutes()).padStart(2, '0')}`,
          userId: reservation.user
        }));
        setReservations(reservations);
      } else {
        setReservations([]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleFetchOneReservations = async (test) => {
    try {
      const response = await axios.get(`http://localhost:4000/res/reservation/ByDate/${idTer}/${test.toISOString()}`);
      const x = response.data.reservations
      setIdUser(x)
      console.log(x);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(()=>{
    handleFetchReservations();
  },[date]);
  useEffect(()=>{
    if(jour!=null){
      setSelectedHour(jourDate.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
      }));
    }
  },[jour])
  const handleHourClick = (hour) => {
    if (!reservedHours.includes(hour)) {
      setSelectedHour(hour);
      if (!isRespo) onHourSelect(hour);
    } else {
      alert("You cannot reserve this hour as it's already reserved.");
    }
  };
  const hs = parseInt(start);
  const he = parseInt(end);
  start = new Date(`2024-01-01T${start}`);
  if (hs >= he) {
    end = new Date(`2024-01-02T${end}`);
  } else {
    end = new Date(`2024-01-01T${end}`);
  }
  let currentTime = start;
  const hours = [];

  const [reservationTime, setReservationTime] = useState([]);
  useEffect(() => {
    if (Array.isArray(reservations) && reservations.length > 0) {
      const reservationTimes = reservations.map(reservation => reservation.time);
      setReservationTime(reservationTimes);
    }
  }, [reservations]); // Only run when reservations change
  let i =0;
  while (currentTime < end) {
    const formattedTime = currentTime.toLocaleTimeString('it-IT', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });
    if(isRespo){
      i = (reservationTime || []).includes(formattedTime)? i+1 : i  ;
      console.log((reservationTime || []).includes(formattedTime),i)
      if ((reservationTime || []).includes(formattedTime)) {
        const index = reservationTime.findIndex(time => time === formattedTime);
        if (index !== -1) {
          console.log("formatted : ", formattedTime)
          const timeString = reservationTime[index]; // Assuming "hh:mm" format
          console.log(timeString)
          const [hour, minutes] = timeString.split(':').map(part => parseInt(part));
          const test = new Date(date);
          test.setHours(hour, minutes); // Set hours and minutes separately
          console.log(test);
          handleFetchOneReservations(test);
        }
      }
    }
    console.log(idUser)
    hours.push(
      <li key={formattedTime}>
        <input
          type='button'
          onClick={() => handleHourClick(formattedTime)}
          className={`w-full px-4 py-3 bg-white ${
            selectedHour === formattedTime
              ? 'bg-sky-100 '
              : (reservedHours || []).includes(formattedTime)
                ? 'bg-gray-300 cursor-not-allowed text-gray-300'
                : ''
          } border-b border-gray-200 transition-all duration-300 ease-in-out
          cursor-pointer ${isReservationPage && selectedHour === formattedTime ? 'text-primary-50 border-primary-50 bg-primary-50' : ''}`}
          disabled={(reservedHours || []).includes(formattedTime)}
          value = {
            (isRespo)? 
                (reservedHours || []).includes(formattedTime)?  formattedTime + "  temps repos" :
                (reservationTime || []).includes(formattedTime)? formattedTime + `  by user ${idUser} ` :
                formattedTime+ "  aucune reservation" :
            (reservedHours || []).includes(formattedTime)?  formattedTime + "  reserved" :
            formattedTime  
        }
        />
      </li>
    );
    currentTime = new Date(currentTime.getTime() + step * 60000);
  }

  const getDayOfWeek = (date) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const options = { weekday: 'long' };
    return new Intl.DateTimeFormat("fr-CA", options).format(dateObj);
  };

  const dayOfWeek = date ? getDayOfWeek(date) : '';

  return (
    <div className="list-container mt-6">
      <div className="px-4 sm:px-8 max-w-5xl m-auto">
        <h1 className="text-center font-semibold text-sm text-primary-50">{dayOfWeek}</h1>
        <div className="flex">
          <ul className="border border-gray-200 rounded overflow-hidden shadow-md flex-1 mr-4">
            {hours}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default List;
