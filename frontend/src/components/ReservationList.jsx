import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox';
import { useAuthContext } from '../hooks/useAuthContext';

const ReservationList = ({xxx}) => {

    const [reservations, setReservations] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const { user } = useAuthContext();
    const id = user.userObj._id;

    const searchReservationsByDate = async (id, date) => {
        try {
            const response1 = await axios.get(`http://localhost:4000/res/reservation/search/${id}`, { date: date });
            console.log(response1.data.reservations);
            return response1.data.reservations;
            
        } catch (error) {
            console.error('Error searching for reservations by date:', error);
            return [];
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                if(xxx === "Particulier") {
                    response = await axios.get(`http://localhost:4000/res/reservation/listP/${id}`);
                } else if(xxx === "Responsable") {
                    response = await axios.get(`http://localhost:4000/res/reservation/listR/${id}`);
                }
                setReservations(response.data.reservations);
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        };

        fetchData();
    }, []);

    const navigate = useNavigate();
    function toReservationEdit (_id){
        navigate(`/reservation/edit/${_id}`);
    }

    const handleSearchByDate = async (date) => {
        try {
            console.log(date);
            const reservations = await searchReservationsByDate(date);
            setReservations(reservations);
        } catch (error) {
            console.error('Error searching for reservations by date:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4 py-8">
            <div className="max-w-xg w-full h-3/4 md:w-1/3 mx-auto "> {/* Adjust width for medium screens and above */}
                <div className="bg-white shadow-lg p-8 rounded-lg">
                    <div className="flex flex-row bg-white text-sm text-gray-500 font-bold px-5 py-2 shadow border-b border-gray-300 items-center justify-between">
                        <p className='flex-grow-0'>Reservation list</p>
                        <SearchBox className="py-4" onSearch={handleSearchByDate} />
                    </div>

                    <div className="w-full h-full overflow-auto shadow bg-white" id="journal-scroll">
                        {reservations.length > 0 ? (
                            <table className="w-full">
                                <tbody>
                                    {reservations.map((item, index) => (
                                        <tr key={index} onClick={() => toReservationEdit(item._id)} className="relative transform scale-10 text-xs py-1 border-b-2 border-blue-100 cursor-default bg-blue-500 bg-opacity-25">
                                            <td className="pl-5 pr-3 whitespace-no-wrap">
                                                <div className="text-gray-400">{item.date}</div>
                                                <div>{item.time}</div>
                                            </td>
                                            <td className="px-2 py-2 whitespace-no-wrap">
                                                <div className="leading-5 text-gray-500 font-medium">{item.user}</div>
                                                <div className="leading-5 text-gray-900">{item.terrain}
                                                    <a className="text-blue-500 hover:underline" href="#">{item.lien_terrain}</a>
                                                </div>
                                                <div className="leading-5 text-gray-800">{item.status}</div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="text-center text-gray-500">Aucune réservation disponible</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReservationList;
