import React, { useState } from 'react';
import Calendar from './Calendar';
import List from './List';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ReservationEdit = ({ iduser }) => {
    const { idRes } = useParams();
    const [selectedDate, setSelectedDate] = useState();
    const [selectedHour, setSelectedHour] = useState();
    const [reservationDetails, setReservationDetails] = useState(null);
    const navigate = useNavigate();

    function toReservationList() {
        navigate(`/reservation/list/${iduser}`);
    }

    const reservedHours = () => {
        return [10, 11, 12];
    };

    const handleDateSelect = async (date) => {
        setSelectedDate(date);
        // Appeler une fonction pour récupérer les détails de la réservation pour la date sélectionnée
        setReservationDetails(reservationDetails);
    };

    const cancelReservation = async () => {
        try {
            // Faites une requête HTTP DELETE pour annuler la réservation
            await axios.put(`http://localhost:4000/res/reservation/annul/${idRes}`);
            // Redirigez l'utilisateur vers la liste des réservations après l'annulation réussie
            navigate(`/reservation/list/${iduser}`);
        } catch (error) {
            console.error('Error cancelling reservation:', error);
        }
    };

    const TerminerReservation = async () => {
        try {
            // Faites une requête HTTP DELETE pour annuler la réservation
            await axios.put(`http://localhost:4000/res/reservation/termin/${idRes}`);
            // Redirigez l'utilisateur vers la liste des réservations après l'annulation réussie
            navigate(`/reservation/list/${iduser}`);
        } catch (error) {
            console.error('Error ending reservation:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
            <div className="max-w-xg w-full md:w-1/2 mx-auto ">
                <div className="bg-white shadow-lg p-8 rounded-lg">
                    <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900">Reservation Date and Time</h1>
                    <p>Here you can make your reservation in "nom terrain"</p>
                    <div className='flex flex-col items-center justify-center md:flex-row md:items-start md:justify-between pt-8'>
                        <div className="w-full mb-4 md:mb-0">
                            <p className='mb-2'>select date</p>
                            <Calendar className="w-full " onDateSelect={handleDateSelect} />
                        </div>
                        
                        <div className="md:w-1/2 w-full">
                            <p>select time</p>
                            <List date={selectedDate} reservedHours={reservedHours()} selectedHour={selectedHour} setSelectedHour={setSelectedHour} />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-end mt-4">
                        {reservationDetails && (
                            <div className="text-gray-600 mb-2">
                                {reservationDetails.user} has a reservation on {selectedDate} at {selectedHour}:00.
                            </div>
                        )}
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
                </div>
            </div>
        </div>
    );
}

export default ReservationEdit;
