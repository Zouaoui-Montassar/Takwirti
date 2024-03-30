import React, { useState } from 'react';
import Calendar from './Calendar';
import List from './List';
import { useNavigate } from 'react-router-dom';


const ReservationEdit = ({iduser}) => {
    const [selectedDate, setSelectedDate] = useState();
    const [selectedHour, setSelectedHour] = useState();
    const [reservationDetails, setReservationDetails] = useState(null);
    const navigate = useNavigate();
    function toReservationList (idterrain){
        navigate(`/reservation/list/:${iduser}`);
    }
    const reservedHours = () => {
        return [10,11,12]; 
    }

    const handleDateSelect = async(date) => {
        setSelectedDate(date);
        // Appeler une fonction pour récupérer les détails de la réservation pour la date sélectionnée
        setReservationDetails(reservationDetails);
    };

    const cancelReservation = () => {
        toReservationList();
        console.log("Reservation canceled!");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
            <div className="max-w-xg w-full md:w-1/2 mx-auto "> {/* Adjust width for medium screens and above */}
                <div className="bg-white shadow-lg p-8 rounded-lg">
                    <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900">Reservation Date and Time</h1>
                    <p>Here you can make your reservation in "nom terrain"</p>
                    <div className='flex flex-col items-center justify-center md:flex-row md:items-start md:justify-between pt-8'>
                        <div className="w-full mb-4 md:mb-0"> {/* Full width on small screens, stack vertically */}
                            <p className='mb-2'>select date</p>
                            <Calendar className="w-full " onDateSelect={handleDateSelect} /> {/* Adjust width for small screens and above */}
                        </div>
                        
                        <div className="md:w-1/2 w-full"> {/* Half width on medium screens and above */}
                            <p>select time</p>
                            <List date={selectedDate} reservedHours={reservedHours()} selectedHour={selectedHour} setSelectedHour={setSelectedHour} /> 
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-end mt-4"> {/* Stack vertically on small screens, align to end on medium screens and above */}
                        {reservationDetails && (
                            <div className="text-gray-600 mb-2">
                                {reservationDetails.user} has a reservation on {selectedDate} at {selectedHour}:00.
                            </div>
                        )}
                        <button onClick={cancelReservation} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-2 md:mb-0 md:mr-2 rounded"> {/* Margin on bottom on small screens, margin on right on medium screens and above */}
                            Cancel Reservation
                        </button>
                        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                            Submit
                        </button>   
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReservationEdit;
