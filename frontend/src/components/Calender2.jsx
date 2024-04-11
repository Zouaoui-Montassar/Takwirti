import React, { useState, useRef } from 'react';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const Calendar2 = ({ onDateSelect, dayBlocked }) => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState(new Date()); // Define setSelectedDate here

  const modalDateRef = useRef(null);
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
      let isBlocked = (dayBlocked === date.getDay()) // Comparer le jour actuel avec le jour bloqué
      const classNames = [
        'text-center',
        'py-2',
        'border',
        'cursor-pointer',
        date.toDateString() === new Date().toDateString() ? 'bg-gray-200 text-primary-50 border border-primary-50' : '',
        date.toDateString() === selectedDate?.toDateString()? 'bg-primary-50 text-white' : '', // Conditional class for selected date
        isBlocked ? 'text-gray-400 cursor-not-allowed' : '', // Utilisez isBlocked directement pour désactiver le bouton
      ].join(' ');
    
      calendar.push(
          <input type="button" key={day} className={classNames} onClick={() =>{ handleDaySelect(date);setSelectedDate(date);}} value={day} disabled={isBlocked}/>
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
    console.log("ok")
    console.log(selectedDate)
  };

  const hideModal = () => {
    document.getElementById('myModal').classList.add('hidden');
  };

  const handleDaySelect = (selectedDate) => {
    setSelectedDate(selectedDate);
    onDateSelect(selectedDate); // Update selectedDate state with the selected date
  }
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
          <div id="myModal" className="modal hidden fixed inset-0 flex items-center justify-center z-50">
            <div className="modal-overlay absolute inset-0 bg-black opacity-50"></div>
            <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
              <div className="modal-content py-4 text-left px-6">
                <div className="flex justify-between items-center pb-3">
                  <p className="text-2xl font-bold">Selected Date</p>
                  <button onClick={hideModal} className="modal-close px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring">✕</button>
                </div>
                <div ref={modalDateRef} className="text-xl font-semibold">
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Calendar2;
