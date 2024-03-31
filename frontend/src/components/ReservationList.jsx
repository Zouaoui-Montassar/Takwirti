import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchBox from './SearchBox';

const reservation = [
  /*{
    idterrain: 1545644,
    terrain: "terrain1",
    lien_terrain: "terrain lien",
    Date: "2024-07-31T10:00:00.000+00:00",
    status: "en cours",
    user: "user1",
  },
  {
    idterrain: 1545644,
    terrain: "terrain1",
    lien_terrain: "terrain lien",
    Date: "2024-07-31T10:00:00.000+00:00",
    status: "en cours",
    user: "user1",
  },*/
];

const ReservationList = ({xxx,id}) => {

    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if(xxx === "Particulier"){
                // Make an HTTP GET request to fetch reservations from the backend
                  const response = await axios.get(`http://localhost:4000/ter/reservation/listP/${id}`);
                // Assuming the backend returns data in the format { reservations: [...] }
                  setReservations(response.data.reservations);
                  console.log(response);
                  console.log(response.data)
                  console.log(response.data.reservations);
                
                }else if(xxx === "responsable"){
                   // Make an HTTP GET request to fetch reservations from the backend
                    const response = await axios.get(`http://localhost:4000/ter/reservation/listR/${id}`);
                    // Assuming the backend returns data in the format { reservations: [...] }
                    setReservations(response.data.reservations);
                    console.log(response);
                    console.log(response.data)
                    console.log(response.data.reservations);
                }
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        };

        fetchData();
    }, []);

    const navigate = useNavigate();
    function toReservationEdit (idterrain){
        navigate(`/reservation/edit/:${idterrain}`);
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4 py-8">
            <div className="max-w-xg w-full h-3/4 md:w-1/3 mx-auto "> {/* Adjust width for medium screens and above */}
                <div className="bg-white shadow-lg p-8 rounded-lg">
                <div className="flex flex-row bg-white text-sm text-gray-500 font-bold px-5 py-2 shadow border-b border-gray-300 items-center justify-between">
                    <p className='flex-grow-0'>Reservation list</p>
                    <SearchBox className="py-4" />
                </div>

                    <div className="w-full h-full overflow-auto shadow bg-white" id="journal-scroll">
                        {reservations.length > 0  ? (
                            <table className="w-full">
                                <tbody>
                                    {reservations.map((item, index) => (
                                        <tr key={index} onClick={() => toReservationEdit(item.idterrain)} className="relative transform scale-10 text-xs py-1 border-b-2 border-blue-100 cursor-default bg-blue-500 bg-opacity-25">
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
