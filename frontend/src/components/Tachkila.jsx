import React, { useState } from 'react';
import NavBar from './NavBar';
import Sidebar from './SideBar';
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsPen } from "react-icons/bs";
import { CgUserList } from "react-icons/cg";


const links = [
    { label: 'Accueil', path: '/' },
    { label: 'Page 1', path: '/page1' },
    { label: 'Page 2', path: '/page2' },
    // Add more links as needed
];

const Tachkila = () => {
    const [players, setPlayers] = useState([]);
    const [newPlayerName, setNewPlayerName] = useState('');


    const addPlayer = () => {
        if (newPlayerName.trim() !== '') {
            setPlayers([...players, newPlayerName]);
            setNewPlayerName('');
        }
    };

    const deletePlayer = (index) => {
        const updatedPlayers = players.filter((_, i) => i !== index);
        setPlayers(updatedPlayers);
    };

    const updatePlayer = (index, newName) => {
        const updatedPlayers = [...players];
        updatedPlayers[index] = newName;
        setPlayers(updatedPlayers);
    };

    return (
        <>
            <div className='flex flex-row'>

                <div className='mx-[250px] justify-center items-center w-full'>
                    <h1 className='bold-36 my-5'>Tachkila list</h1>
                    <input
                        type="text"
                        value={newPlayerName}
                        onChange={(e) => setNewPlayerName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                addPlayer();
                            }
                        }}
                        placeholder="Add player"
                        className='border-2 border-gray-300 p-2 w-1/2 my-5 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
                    />
                    <ul className=' border border-5 border-gray-200 p-2 rounded-xl shadow-2xl bg-white shadow-slate-500 '>
                        {players.map((player, index) => (
                            <li key={index} className='space-x-4 flex flex-row items-center justify-between border border-5 border-green-500 my-4 p-2 bg-green-500 rounded-full shadow-md shadow-slate-400 text-white'>
                                <h1 className='text-2xl text-bold ml-4'>{player}</h1>
                                <div className='flex flex-row'>
                                    <button onClick={() => deletePlayer(index)} className='flex flex-row border-2 border-red-500 bg-red-500 p-1 rounded-md shadow-md shadow-slate-400 items-center justify-center mx-5'>
                                        <h1 className=''>Delete</h1>
                                        <RiDeleteBin6Line className=' w-[25px] h-[25px] text-white' />
                                    </button>
                                    <button onClick={() => {
                                        const newName = prompt('Enter new name:', player);
                                        if (newName !== null) {
                                            updatePlayer(index, newName);
                                        }
                                    }} className='mx-5 flex flex-row border-2 border-blue-500 bg-blue-500 p-1 rounded-md shadow-md shadow-slate-400 items-center justify-center'>
                                        <h1 className='mr-1'>Edit</h1>
                                        <BsPen className='  text-white' />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className='border b-2 border-green-500 bg-green-500 w-[200px] flex flex-row p-2 items-center justify-center rounded-md shadow-lg shadow-slate-400 m-5'>
                            <button className="mr-2 text-white text-lg">confirm List</button>
                            <CgUserList className=' w-[25px] h-[25px] text-white' />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Tachkila;
