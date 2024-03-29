/* eslint-disable no-undef */
import React, { useState } from 'react';

const List = ({ date , reservedHours ,isReservationPage }) => {
  
  // Generate hours from 8 am to 8 pm
  const hours = [];
  for (let i = 8; i <= 20; i++) {
    hours.push(i);
  }

  // Function to get the day of the week
  const getDayOfWeek = (date) => {
    const options = { weekday: 'long' };
    return new Intl.DateTimeFormat("fr-CA", { year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
  };

  // Render the day of the week
  const dayOfWeek = !date ? getDayOfWeek(date) : '';

  // Calculate the middle index of the hours array
  const middleIndex = Math.ceil(hours.length / 2);

  // Split the hours array into two halves
  const firstHalfHours = hours.slice(0, middleIndex);
  const secondHalfHours = hours.slice(middleIndex);

  const [selectedHour, setSelectedHour] = useState();
  const handleHourClick = (hour) => {
    if (!reservedHours.includes(hour)) {
      setSelectedHour(hour);
      console.log('setSelectedHour', hour);
    } else {
      alert("You cannot reserve this hour as it's already reserved.");
    }
  };

  return (
    <div className="list-container mt-6">
      <div className="px-4 sm:px-8 max-w-5xl m-auto">
        <h1 className="text-center font-semibold text-sm text-primary-50">{dayOfWeek}</h1>
        <div className="flex">
          {/* Render first half of hours */}
          <ul className="border border-gray-200 rounded overflow-hidden shadow-md flex-1 mr-4">
          {firstHalfHours.map((hour) => (
              <button
                key={hour}
                onClick={() => handleHourClick(hour)}
                className={`w-full px-4 py-3 bg-white ${
                  selectedHour === hour
                    ? 'bg-sky-100 text-sky-900'
                    : (reservedHours || []).includes(hour)
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    : ''
                } border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out
                cursor-pointer ${isReservationPage && selectedHour === time ? 'bg-green-500 text-white' : ''}`}
                disabled={(reservedHours || []).includes(hour)}
              >
                {hour}:00
              </button>
            ))}
          </ul>
          {/* Render second half of hours */}
          <ul className="border border-gray-200 rounded overflow-hidden shadow-md flex-1">
          {secondHalfHours.map((hour) => (
            <button
              key={hour}
              onClick={() => handleHourClick(hour)}
              className={`w-full px-4 py-3 bg-white ${
              selectedHour === hour ? 'bg-sky-100 text-sky-900' : (reservedHours || []).includes(hour) ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : ''
              } border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out
              cursor-pointer ${isReservationPage && selectedHour === time ? 'bg-green-500 text-white' : ''}`}
              disabled={(reservedHours || []).includes(hour)}
            >
              {hour}:00
            </button>
          ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default List;
