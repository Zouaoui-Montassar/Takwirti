import React, { useState } from 'react';

const List = ({ date, reservedHours, isReservationPage, onHourSelect, start, end, step }) => {
  const [selectedHour, setSelectedHour] = useState([]);
  
  // Fonction pour gérer le clic sur une heure
  const handleHourClick = (hour) => {
    if (!reservedHours.includes(hour)) {
      setSelectedHour(hour);
      onHourSelect(hour);
      console.log('setSelectedHour', hour);
    } else {
      alert("You cannot reserve this hour as it's already reserved.");
    }
  };
  const hs = parseInt(start);
  console.log(hs)
  const he = parseInt(end);
  start = new Date(`2024-01-01T${start}`);
  if (hs >= he) {
    end = new Date(`2024-01-02T${end}`);
  } else {
    end = new Date(`2024-01-01T${end}`);
  }
  let currentTime = start;
  const hours = [];

  while (currentTime < end) {
    const formattedTime = currentTime.toLocaleTimeString('it-IT', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });
    hours.push(
      <li key={formattedTime}>
        <input
          type='button'
          onClick={() => handleHourClick(formattedTime)}
          className={`w-full px-4 py-3 bg-white ${
            selectedHour === formattedTime
              ? 'bg-sky-100 text-sky-900'
              : (reservedHours || []).includes(formattedTime)
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : ''
          } border-b border-gray-200 transition-all duration-300 ease-in-out
          cursor-pointer ${isReservationPage && selectedHour === formattedTime ? 'text-primary-50 border-primary-50' : ''}`}
          disabled={(reservedHours || []).includes(formattedTime)}
          value={formattedTime}
        />
      </li>
    );
    currentTime = new Date(currentTime.getTime() + step * 60000);
  }

  const getDayOfWeek = (date) => {
    const options = { weekday: 'long' };
    return new Intl.DateTimeFormat("fr-CA", { year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
  };

  const dayOfWeek = date ? getDayOfWeek(date) : '';

  return (
    <div className="list-container mt-6">
      <div className="px-4 sm:px-8 max-w-5xl m-auto">
        <h1 className="text-center font-semibold text-sm text-primary-50">{dayOfWeek}</h1>
        <div className="flex">
          <ul className="border border-gray-200 rounded overflow-hidden shadow-md flex-1 mr-4">
            {hours}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default List;
