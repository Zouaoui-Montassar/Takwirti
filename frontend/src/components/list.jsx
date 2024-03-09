// List.jsx
import React from 'react';

const List = ({ date }) => {
  // Generate hours from 8 am to 8 pm
  const hours = [];
  for (let i = 8; i <= 20; i++) {
    hours.push(i);
  }

  return (
    <div class="list-container mt-6">
        <div class="px-4 sm:px-8 max-w-5xl m-auto">
            <h1 class="text-center font-semibold text-sm">List Group</h1>
            <ul class="border border-gray-200 rounded overflow-hidden shadow-md">
                {hours.map((hour) => (
                <li key={hour} className='px-4 py-2 bg-white hover:bg-sky-100 hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out'>
                    {hour}:00
                </li>
                ))}
            </ul>
        </div>
    </div>

  );
};

export default List;

