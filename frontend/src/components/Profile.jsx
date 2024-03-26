import React from 'react';
import NavBar from './NavBar copy';
import Sidebar from './SideBar';
import { MdOutlineAdd } from "react-icons/md";
import { BsPen } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsTelephone } from "react-icons/bs";
import { BsCalendar2Date } from "react-icons/bs";
import { CgUserList } from "react-icons/cg";
import { Link } from 'react-router-dom';
import Invitation from './Invitation';

const links = [
    { label: 'Accueil', path: '/' },
    { label: 'Page 1', path: '/page1' },
    { label: 'Page 2', path: '/page2' },
    // Add more links as needed
];

const Profile = () => {
    return (
        <>
            <NavBar copy links={links} />
            <div className='flex flex-row'>
                <Sidebar />
                <div className='m-2 flex-grow'>
                    <div className="flex justify-center items-center ">
                        <div className="relative">
                            {/* Cover Image */}
                            <img
                                src="/Section 1 image.jpg"
                                alt="Cover"
                                className="w-[1250px] h-64 object-cover rounded-t-lg"
                            />
                            
                            {/* Profile Image */}
                            <img
                                src="/taswira.jpg"
                                alt="Profile"
                                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-[250px] h-[250px] rounded-full border-4 border-white"
                            />
                        </div>
                    </div>

                    <div className="w-full lg:w-4/12 px-4 lg:order-1 ml-[90px] ">
                        <div className="flex justify-center py-4 lg:pt-4 pt-8">
                            <div className="mr-4 p-3 text-center">
                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span>
                                <span className="text-sm text-blueGray-400">Friends</span>
                            </div>
                            {/* Add more stat components similar to the Friends one */}
                        </div>
                    </div>

                    <div className="flex flex-row justify-center m-2 relative left-[850px] bottom-[100px]  w-[350px]">
                        <div className='border b-2 border-green-500 bg-green-500 w-[90px] flex flex-row p-2 items-center justify-center rounded-md shadow-lg shadow-slate-400 mr-2'>
                          <button className="mr-2 text-white text-lg">Add friend</button>
                          <MdOutlineAdd className=' w-[25px] h-[25px] text-white' />
                        </div>

                        <div className='border b-2 border-blue-500 bg-blue-500 w-[90px] flex flex-row p-2 items-center justify-center rounded-md shadow-lg shadow-slate-400 mr-2'>
                          <Link to={`/modifier`} className="mr-2 text-white text-lg">Modify</Link>
                          <BsPen className='  text-white' />
                        </div>

                        <div className='border b-2 border-red-500 bg-red-500 w-[90px] flex flex-row p-2 items-center justify-center rounded-md shadow-lg shadow-slate-400'>
                          <Link to={`/delete`} className="mr-2 text-white text-lg">Delete</Link>
                          <RiDeleteBin6Line className=' w-[25px] h-[25px] text-white' />
                        </div>
                        
                    </div>

                    <div className="items-center mt-[5px] ">
                       <h3 className="text-4xl font-semibold leading-normal bold-52 text-blueGray-700 mb-4">karim benzou</h3>
                        <h3 className='text-sm font-bold text-blueGray-400'>elbenzou@gmail.com</h3>

                       <div className='flex flex-row items-center justify-center mt-5'>
                         <BsTelephone /> 
                         <span className="text-sm font-bold text-blueGray-400 ml-2">+216 22 333 444</span>                      
                       </div>

                       <div className='flex flex-row items-center justify-center my-5'>
                         <BsCalendar2Date /> 
                         <span className="text-sm font-bold text-blueGray-400 ml-2">01/02/1999</span>                      
                       </div>
                                      
                    </div>

                    <div className='justify-center items-center flex flex-col'>
                      <h1 className='text-xl font-bold text-blueGray-400 my-2'>Invitation received :</h1>
                      <Invitation />
                      <Invitation />
                    </div>
                    
                    <Link to={`/friendslist`}>
                        <div className='border b-2 border-green-500 bg-green-500 w-[200px] flex flex-row p-2 items-center justify-center rounded-md shadow-lg shadow-slate-400 m-2'>
                            <button className="mr-2 text-white text-lg">Friends List</button>
                            <CgUserList className=' w-[25px] h-[25px] text-white' />
                        </div>
                    </Link>

                </div>
            </div>
        </>
    );
};

export default Profile;