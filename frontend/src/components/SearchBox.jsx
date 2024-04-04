import React, { useState } from "react";

export default function SearchBox({ onSearch, isReservation }) {
    const [searchTerm, setSearchTerm] = useState();

    const handleSearch = () => {
        // Call the onSearch callback function with the search term
        onSearch(searchTerm);
    };

    return (
        <div className="flex items-center">
            <div className="flex space-x-1">
                <input
                    type={isReservation ? "date" : "text"}
                    className="block w-full px-4 py-2 text-green-500 bg-white border rounded-full focus:border-green-500 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="px-4 text-white bg-green-500 rounded-full" onClick={handleSearch}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}


