import React, { useState, useEffect, useRef } from 'react';
import Calendar from './Calendar';
import List from './List';
import Tachkila from './Tachkila';
import axios from 'axios';
import { useParams } from 'react-router-dom';
export const ReservationAdd = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedHour, setSelectedHour] = useState();
    const [terrainItems, setTerrainItems] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reservedHours, setReservedHours] = useState([]);
    const params = useParams();
    const idUser = params.idUser;
    const idTer = params.idTer; 
    const [openTime, setOpenTime] = useState("");
    const [closeTime, setCloseTime] = useState();
    const [stepDuration, setStepDuration] = useState();
    const [timeReserved, setTimeReserved] = useState()
    const fetchTerrainInfo = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/ter/terrain/getInfo/${idTer}`);
          setTerrainItems(response.data.terrain);
          setCloseTime(response.data.terrain.calendrier.close);
          setOpenTime(response.data.terrain.calendrier.open);
          setStepDuration(response.data.terrain.calendrier.duree);
          setReservedHours(response.data.terrain.calendrier.time);
          setLoading(false);
          console.log(selectedDate.toISOString());
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
      
      // Remove the second useEffect hook
      // useEffect (() => {
      //   fetchTerrainInfo();
      //   handleFetchReservations();
      //   return () => {
      //     // Cleanup logic here (if needed)
      //   };
      // },[])
    console.log(reservedHours)
    console.log(timeReserved)
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
    };
    const handleHourSelect = (hour) => {
        setSelectedHour(hour);
      };
    const handleOnSubmit = async (e) => { 
        e.preventDefault();
        let combinedDateTime = new Date(selectedDate);
        combinedDateTime.setHours(parseInt(selectedHour), 0, 0, 0);
        combinedDateTime = combinedDateTime.toISOString();
        try {
            const response = await axios.post(`http://localhost:4000/res/reservation/add/${idUser}/${idTer}`,{
                date : new Date(combinedDateTime),
            });
            console.log(response.data); // Assuming you want to log the response
        } catch (error) {
            console.error('Failed to add reservation:', error);
        }
    }
      
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
            <div className="max-w-xg w-full md:w-1/2 mx-auto "> {/* Adjust width for medium screens and above */}
                <div className="bg-white shadow-lg p-8 rounded-lg">
                    <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900">Reservation Date and Time</h1>
                    <p>Here you can make your reservation in {terrainItems.nom}</p>
                    <form onSubmit={handleOnSubmit}>
                        <div className='flex flex-col items-center justify-center md:flex-row md:items-start md:justify-between pt-8'>
                            <div className="w-full mb-4 md:mb-0"> {/* Full width on small screens, stack vertically */}
                                <p className='mb-2'>select date</p>
                                <Calendar className="w-full " onDateSelect={handleDateSelect} dayBlocked={terrainItems.calendrier.date}/> {/* Adjust width for small screens and above */}
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
                                />
                            </div>
                            <Tachkila/>  
                        </div>
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
        </div>
    );
};
