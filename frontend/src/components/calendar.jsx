import React, { useState, useRef } from 'react';
import List from './List';
import { useLocation,useParams } from 'react-router-dom';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const Calendar = ({ onDateSelect, dayBlocked}) => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState(new Date()); // Define setSelectedDate here
  const modalDateRef = useRef(null);
  const params= useParams();
  const idUser = params.idUser ;
  const idTer = params.idTer;
  const location = useLocation(); // Get current location using useLocation hook
  const isReservationPage = location.pathname === `/reservation/add/${idUser}/${idTer}`; // Assuming reservation page route is '/reservation'
  console.log(dayBlocked)

  const dayNameToNumber = (dayName) => {
    switch (dayName.toLowerCase()) {
      case 'sunday':
        return 0;
      case 'monday':
        return 1;
      case 'tuesday':
        return 2;
      case 'wednesday':
        return 3;
      case 'thursday':
        return 4;
      case 'friday':
        return 5;
      case 'saturday':
        return 6;
      default:
        return -1; // Retourne -1 si le nom du jour n'est pas valide
    }}
  if (isReservationPage)
    dayBlocked = dayNameToNumber(dayBlocked)

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
      let isBlocked = (dayBlocked === date.getDay())|| (date < new Date()); // Comparer le jour actuel avec le jour bloqué
      const classNames = [
        'text-center',
        'py-2',
        'border',
        'cursor-pointer',
        date.toDateString() === new Date().toDateString() ? 'bg-sky-500 text-white' : '',
        date.toDateString() === selectedDate?.toDateString() && isReservationPage ? 'bg-primary-50 text-white' : '', // Conditional class for selected date
        isReservationPage && date.toDateString() === selectedDate?.toString() ? 'bg-green-500 text-white' : '', // Conditional class for selected date on reservation page
        isBlocked ? 'text-gray-400 cursor-not-allowed' : '', // Utilisez isBlocked directement pour désactiver le bouton
      ].join(' ');
    
      calendar.push(
        <input 
          type='button'
          key={day} 
          className={`${classNames} ${date.toDateString() === selectedDate?.toString() && 'bg-primary-50 text-white '}`} 
          onClick={() => {
            if (!isReservationPage && !isBlocked) {
              showModal(date.toDateString()); // Afficher le modal si ce n'est pas une page de réservation et que le jour n'est pas bloqué
            } else if (!isBlocked) {
              handleDaySelect(date); // Gérer la sélection du jour si c'est une page de réservation et que le jour n'est pas bloqué
              setSelectedDate(date); // Définir la date sélectionnée
            }
          }}
          value={day}
          disabled={isBlocked} // Désactiver le bouton si le jour est bloqué
        />
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
    setSelectedDate(selectedDate);
    onDateSelect(selectedDate); // Update selectedDate state with the selected date
    if (!isReservationPage) {
      showModal(selectedDate.toDateString());
    }
  };
  return (
    <div className="flex justify-center ">
      <div className="p-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-6 py-3 bg-primary-50">
            <input type='button' onClick={handlePrevMonth} className="text-white" value={"Previous"}/>
            <h2 id="currentMonth" className="text-white">{`${monthNames[currentMonth]} ${currentYear}`}</h2>
            <input type="button" onClick={handleNextMonth} className="text-white" value={"Next"}/>
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
