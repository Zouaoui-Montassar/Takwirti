import React, { useState, useEffect, useContext } from 'react';
import {ReservationAdd} from './ReservationAdd';
import { TeamContext, TeamProvider } from '../context/Teamcontext';
import Tachkila from './Tachkila';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const ReservationAddParent = () => {
    const params = useParams();
    const idUser = params.idUser;
    const idTer = params.idTer; 
    const { team, setTeam } = useContext(TeamContext);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedHour, setSelectedHour] = useState();
    const [terrainItems, setTerrainItems] = useState(null);

    useEffect(() => {
        const initialTeam = [];
    }, []);

    useEffect(() => {
        const fetchTerrainInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/ter/terrain/getInfo/${idTer}`);
                setTerrainItems(response.data.terrain);
            } catch (error) {
                console.error('Failed to fetch terrain info:', error);
            }
        };

        fetchTerrainInfo();
    }, [idTer]);

    const handleOnSubmit = async (e) => { 
        e.preventDefault();
        let combinedDateTime = new Date(selectedDate);
        combinedDateTime.setHours(parseInt(selectedHour), 0, 0, 0);
        combinedDateTime = combinedDateTime.toISOString();
        try {
            const response = await axios.post(`http://localhost:4000/res/reservation/add/${idUser}/${idTer}`,{
                date : new Date(combinedDateTime),
                participants: team,
            });
            console.log(response.data); // Assuming you want to log the response
        } catch (error) {
            console.error('Failed to add reservation:', error);
        }
    }

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    const handleHourSelect = (hour) => {
        setSelectedHour(hour);
    };
      
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
            <div className="max-w-xg w-full md:w-1/2 mx-auto "> {/* Adjust width for medium screens and above */}
                <div className="bg-white shadow-lg p-8 rounded-lg">
                    <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900">Reservation Date and Time</h1>
                    <p>Here you can make your reservation in {/* {terrainItems.nom} */}</p>
                    <form onSubmit={handleOnSubmit}>
                        <TeamProvider value={{ team, setTeam }}>
                            <ReservationAdd 
                                idTer={idTer} 
                                sendselectedDate={selectedDate}
                                sendselectedHour={selectedHour}
                                sendterrainItems={terrainItems}
                            />
                            <Tachkila/>
                        </TeamProvider>
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

export default ReservationAddParent;