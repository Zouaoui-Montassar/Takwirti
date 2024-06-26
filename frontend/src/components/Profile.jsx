import React, { useState , useEffect } from 'react';
import NavBar from './NavBar';
import Sidebar,{SidebarItem} from './SideBar';
import { MdOutlineAdd } from "react-icons/md";
import { BsPen } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsTelephone } from "react-icons/bs";
import { BsCalendar2Date } from "react-icons/bs";
import { CgUserList } from "react-icons/cg";
import { Link } from 'react-router-dom';
import Invitation from './Invitation';
import { School ,Settings,LogOut} from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import SearchBox from './SearchBox';
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';
import { Bell } from 'lucide-react';
import { ContactRound , ListPlus , MessageCircleMore } from 'lucide-react';




const Profile = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [pendingRequests, setPendingRequests] = useState([]);
    const { user } = useAuthContext(); 
    useEffect(() => {
        const fetchPendingRequests = async () => {
          try {
            const response = await axios.get(`http://localhost:4000/api/users/${user.userObj._id}/pending_requests`);
            setPendingRequests(response.data.pendingRequests);
          } catch (error) {
            console.error(error);
          }
        };
        fetchPendingRequests();
      }, [user.userObj._id]);


    const handleSearch = (searchTerm) => {
      setSearchTerm(searchTerm);
    };
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
    return (
        <>
            <NavBar />
            <div className='flex flex-row '>
            <Sidebar sendWidth={handleWidth} >
              <SidebarItem icon={<FontAwesomeIcon icon={faSearch}/>} text={<SearchBox onSearch={handleSearch}/>} test={true}  />
              <SidebarItem icon={<School />} text="Home" link={'particulier'} />
              <SidebarItem icon={<ContactRound />} text="Profile " link={'profile'} />
              <SidebarItem icon={<Bell />} text="Notifications" link={'notifications'} />
              <SidebarItem icon={<ListPlus />} text="Reservations" link={'reservation/listP'} />
              <SidebarItem icon={<CgUserList className='w-8 h-8' />} text="Friends" link={'friendslist'} />
              <SidebarItem icon={<MessageCircleMore />} text="Messages" link={'chat'} />

           </Sidebar>
              <div className={`ml-[${w}px] mt-[82px] p-12 w-[100%] flex justify-center items-center`}>
                <div className='m-2'>
                    <div className="">
                        <div className="relative">
                            {/* Cover Image */}
                            <img
                                src="/Section 1 image.jpg"
                                alt="Cover"
                                className="w-[1250px] h-64 object-cover rounded-t-lg"
                            />
                            
                            {/* Profile Image */}
                            <img
                                src={user.userObj.image}
                                alt="Profile"
                                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-[250px] h-[250px] rounded-full border-4 border-white"
                            />
                        </div>
                    </div>

                    <div className="w-full lg:w-4/12 px-4 lg:order-1 ml-[90px] ">
                        <div className="flex justify-center py-4 lg:pt-4 pt-8">
                            <div className="mr-4 p-3 text-center">
                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{user.userObj.ListeAmi.length}</span>
                                <span className="text-sm text-blueGray-400">Friends</span>
                            </div>
                            
                        </div>
                    </div>

                    <div className="flex flex-row justify-center m-2 relative left-[65%] bottom-[100px]  w-[350px]">
                        <div className='border b-2 border-green-500 bg-green-500 w-[90px] flex flex-row p-2 items-center justify-center rounded-md shadow-lg shadow-slate-400 mr-2'>
                          <button className="mr-2 text-white text-lg">Add friend</button>
                          <MdOutlineAdd className=' w-[25px] h-[25px] text-white' />
                        </div>

                        <div className='border b-2 border-blue-500 bg-blue-500 w-[90px] flex flex-row p-2 items-center justify-center rounded-md shadow-lg shadow-slate-400 mr-2'>
                          <Link to={`/profile/modifier`} className="mr-2 text-white text-lg">Modify</Link>
                          <BsPen className='  text-white' />
                        </div>

                        <div className='border b-2 border-red-500 bg-red-500 w-[90px] flex flex-row p-2 items-center justify-center rounded-md shadow-lg shadow-slate-400'>
                          <Link to={`/delete`} className="mr-2 text-white text-lg">Delete</Link>
                          <RiDeleteBin6Line className=' w-[25px] h-[25px] text-white' />
                        </div>
                        
                    </div>

                    <div className="items-center justify-center mt-[5px] ">
                       <h3 className="text-4xl font-semibold leading-normal bold-52 text-blueGray-700 mb-4">{user.userObj.nom} {user.userObj.prenom}</h3>
                        <h3 className='text-sm font-bold text-blueGray-400'>{user.userObj.email}</h3>

                       <div className='flex flex-row items-center justify-center mt-5'>
                         <BsTelephone /> 
                         <span className="text-sm font-bold text-blueGray-400 ml-2">+216 {user.userObj.tel}</span>                      
                       </div>

                       <div className='flex flex-row items-center justify-center my-5'>
                         <BsCalendar2Date /> 
                         <span className="text-sm font-bold text-blueGray-400 ml-2">{new Date(user.userObj.DN).toLocaleDateString("en-US")}</span>                      
                       </div>
                                      
                    </div>

                    <div className='justify-center items-center flex flex-col'>
                        <h1 className='text-xl font-bold text-blueGray-400 my-2'>Friend requests received :</h1>
                        {pendingRequests.length > 0 ? (
                            pendingRequests.map((request) => (
                                <Invitation key={request._id} data={request} />
                            ))
                        ) : (
                            <p>No pending requests</p>
                        )}
                    </div>
                    
                    <Link to={`/friendslist`}>
                        <div className='border b-2 border-green-500 bg-green-500 w-[200px] flex flex-row p-2 items-center justify-center rounded-md shadow-lg shadow-slate-400 m-2'>
                            <button className="mr-2 text-white text-lg">Friends List</button>
                            <CgUserList className=' w-[25px] h-[25px] text-white' />
                        </div>
                    </Link>

                </div>
            </div>
          </div>
        </>
    );
};

export default Profile;