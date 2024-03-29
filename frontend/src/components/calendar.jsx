import React, { useState, useRef } from 'react';
import List from './List';
import { useLocation,useParams } from 'react-router-dom';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const Calendar = ({ onDateSelect }) => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState(new Date()); // Define setSelectedDate here
  const modalDateRef = useRef(null);
  const params= useParams();
  const idUser = params.idUser ;
  const idTer = params.idTer;
  const location = useLocation(); // Get current location using useLocation hook
  const isReservationPage = location.pathname === `/reservation/add/${idUser}/${idTer}`; // Assuming reservation page route is '/reservation'
  console.log(isReservationPage); //

  const generateCalendar = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const calendar = [];

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const firstDayOfWeek = firstDayOfMonth.getDay();

    for (let i = 0; i < firstDayOfWeek; i++) {
      calendar.push(<div key={`empty-${i}`} className="text-center py-2 border"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const classNames = [
        'text-center',
        'py-2',
        'border',
        'cursor-pointer',
        date.toDateString() === new Date().toDateString() ? 'bg-blue-500 text-white' : ''
      ].join(' ');

      calendar.push(
        <div 
          key={day} 
          className={`${classNames} ${date.toDateString() === selectedDate?.toString() && 'bg-primary-50 text-white '}`} 
          onClick={() => {
            if (!isReservationPage) {
              showModal(date.toDateString()); // Show modal if not on reservation page
            } else {
              handleDaySelect(date); // Handle day select if on reservation page
              setSelectedDate(date); // Set the selected date
            }
          }}
        >
          {day}
        </div>
      );
      }      

    return (
      <>
        <div className="grid grid-cols-7 gap-2 p-4">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="text-center font-semibold">{day}</div>
          ))}
          {calendar}
        </div>
      </>
    );
  };

  const handlePrevMonth = () => {
    setCurrentMonth(prevMonth => prevMonth - 1);
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prevYear => prevYear - 1);
    }
  };

  const handleNextMonth = () => {
    setCurrentMonth(prevMonth => prevMonth + 1);
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prevYear => prevYear + 1);
    }
  };

  const showModal = (selectedDate) => {
    modalDateRef.current.innerText = selectedDate;
    document.getElementById('myModal').classList.remove('hidden');
  };

  const hideModal = () => {
    document.getElementById('myModal').classList.add('hidden');
  };

  const handleDaySelect = (selectedDate) => {
    setSelectedDate(selectedDate); // Update selectedDate state with the selected date
    console.log(selectedDate); // Log the selected date
    console.log(selectedDate.getHours() + ":" + selectedDate.getMinutes()); // Log the time
    if (!isReservationPage) {
      showModal(selectedDate.toDateString());
    }
  };
  return (
    <div className="flex justify-center ">
      <div className="p-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-6 py-3 bg-primary-50">
            <button onClick={handlePrevMonth} className="text-white">Previous</button>
            <h2 id="currentMonth" className="text-white">{`${monthNames[currentMonth]} ${currentYear}`}</h2>
            <button onClick={handleNextMonth} className="text-white">Next</button>
          </div>
          {generateCalendar()}
          {!isReservationPage && (
          <div id="myModal" className="modal hidden fixed inset-0 flex items-center justify-center z-50">
            <div className="modal-overlay absolute inset-0 bg-black opacity-50"></div>
            <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
              <div className="modal-content py-4 text-left px-6">
                
                <div className="flex justify-between items-center">
                  <p className="text-2xl font-bold" ref={modalDateRef}></p>
                  <button onClick={hideModal} className="modal-close px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring">✕</button>
                </div>
                <List date={selectedDate} isReservationPage={isReservationPage} />
              </div>
            </div>
          </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
