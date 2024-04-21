import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import SearchBox from './SearchBox';
import { useAuthContext } from '../hooks/useAuthContext';
import NavBar from '../components/NavBar';
import Sidebar , { SidebarItem } from '../components/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { School ,Settings} from 'lucide-react';
import { Bell } from 'lucide-react';
import { ContactRound , ListPlus , MessageCircleMore } from 'lucide-react';
import { CgUserList } from "react-icons/cg";
import { Dribbble } from 'lucide-react';


const ReservationList = () => {
    const [reservations, setReservations] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const { user } = useAuthContext();
    const id = user.userObj._id;
    const role = user.userObj.__t;
    console.log(role);
    const [yyy , setyyy ] = useState(user.userObj.__t);
    const [xxx , setxxx ] = useState();
    const date = new Date(searchTerm);
    const [width, setWidth] = useState();
    const handleWidth = (width) => {
      setWidth(width);
    }
    useEffect(() => {
      handleWidth(width);
    },[width]);
    const [w, setW] = useState();
    const handleW = (width) => {
      if (width === 284){
      setW(width);}
      else {setW(width);}
    }
    useEffect(() => {
      handleW(width);
    },[width]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (xxx === undefined) {
                    if(yyy === "Particulier") {
                        const response = await axios.get(`http://localhost:4000/res/reservation/listP/${id}`);
                        console.log(reservations);
                        setReservations(response.data.reservations);
                    } else if(yyy === "Responsable") {
                        const response = await axios.get(`http://localhost:4000/res/reservation/listR/${id}`);
                        setReservations(response.data.reservations);
                        console.log(reservations);
                        console.log(response);
                    }}
                else if(xxx === "search") {
                    const response = await axios.get(`http://localhost:4000/res/reservation/search/${id}`, { params : { searchTerm : date.toISOString() }});
                    console.log(response.data);
                    setReservations(response.data);
                }else {
                    console.error('Invalid param value:', yyy , xxx);
                    return;
                }
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        };

        fetchData();
    }, [searchTerm]);
    const navigate = useNavigate();
    function toReservationEdit (_id){
        navigate(`/reservation/edit/${_id}`);
    }

    const handleSearch = (searchTerm) => {
        setSearchTerm(searchTerm);
        setxxx("search")
      };

      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

  

    return (
        <>
        <NavBar/>
            <div className='flex flex-row'>
                {
                (yyy === "Particulier") ? (
                    <Sidebar sendWidth={handleWidth} >
                        <SidebarItem icon={<FontAwesomeIcon icon={faSearch}/>} text={<SearchBox onSearch={handleSearch}/>} test={true}  />
                        <SidebarItem icon={<School />} text="Home" link={'particulier'} />
                        <SidebarItem icon={<ContactRound />} text="Profile " link={'profile'} />
                        <SidebarItem icon={<Bell />} text="Notifications" link={'notifications'} />
                        <SidebarItem icon={<ListPlus />} text="Reservations" link={'reservation/listP'} />
                        <SidebarItem icon={<CgUserList className='w-8 h-8' />} text="Friends" link={'friendslist'} />
                        <SidebarItem icon={<MessageCircleMore />} text="Messages" link={'chat'} />
                    </Sidebar>
                ) : (
                    <Sidebar sendWidth={handleWidth}>
                        <SidebarItem icon={<School />} text="Dashboard" link={'responsable'} />
                        <SidebarItem icon={< Dribbble />} text="Terrain list" link={`terrain/responsable`} />
                        <SidebarItem icon={<ListPlus /> } text="Reservation list" link={'reservation/listR'} />
                    </Sidebar>
                )
                }
                <div className={`ml-[${w}px] mt-[82px] w-[100%] items-center justify-center p-12`}>
                    <div className="flex flex-row bg-white text-sm text-gray-500 font-bold px-5 py-2 shadow border-b border-gray-300 items-center justify-between">
                        <p className='flex-grow-0'>Reservation list</p>
                        {role==="Particulier" && <SearchBox className="py-4" onSearch={handleSearch} isReservation={true} />}
                    </div>

                    <div className="w-full h-auto overflow-auto shadow bg-white px-12" id="journal-scroll">
                        {reservations.length > 0? (
                            <table className="w-full">
                                <tbody>
                                    {reservations.map((item, index) => (
                                        <tr key={index} onClick={yyy === "Particulier" && item.status === "En cours" ? () => toReservationEdit(item._id) : null} className="relative transform scale-10 text-xs py-1 border-b-2 border-blue-100 cursor-default bg-blue-500 bg-opacity-25  " >
                                            <td className="pl-5 pr-3 whitespace-no-wrap">
                                            <div className="text-gray-400 text-xl">Date : {new Date(item.date).toLocaleString()}</div>

                                                <div>{item.time}</div>
                                            </td>
                                            <td className="px-2 py-2 whitespace-no-wrap">
                                            <div className="leading-5 text-gray-500 font-medium text-lg mb-1">By : {item.user?.nom} {item.user?.prenom}</div>
                                                        <div className="leading-5 text-gray-900 text-lg mb-1"> Nom terrain : {' '}
                                                        <a className="text-blue-500 hover:underline" href={role==="Responsable"?`/responsable/${item.terrain?._id}`:`/terrain/detail/${item.terrain?._id}`} onClick={(e) => e.stopPropagation()}>
                                                            {item.terrain?.nom}
                                                                                </a>
                                                    <a className="text-blue-500 hover:underline" href="#">{item.lien_terrain}</a>
                                                </div>
                                                <div className={` ${item.status === "Terminée" ? 'text-red-500 text-lg' : item.status === "Annulée" ? 'text-yellow-500 text-lg' : 'text-green-500 text-lg'}`}>statut : {item.status}</div>

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
        </>
    );
};

export default ReservationList;
