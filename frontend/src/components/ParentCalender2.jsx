import React, { useState } from 'react';
import Calendar2 from './Calender2';
import List from './List';

const ParentComponent2 = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <div >
      <Calendar2 onDateSelect={handleDateSelect} />
    </div>
  );
};

export default ParentComponent2;
