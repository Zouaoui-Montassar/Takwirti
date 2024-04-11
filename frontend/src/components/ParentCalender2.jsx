import React, { useState } from 'react';
import Calendar2 from './Calender2';
import List from './List';

const ParentComponent2 = ({openTime,closeTime,time,date,rh}) => {
  const [selectedDate, setSelectedDate] = useState(new Date);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <div >
      <Calendar2 onDateSelect={handleDateSelect} dayBlocked={date} />
      {selectedDate && <List 
                        date={selectedDate}
                        isReservationPage={true}
                        reservedHours={rh}
                        start={openTime}
                        end={closeTime}
                        step={time}/>}
    </div>
  );
};

export default ParentComponent2;
