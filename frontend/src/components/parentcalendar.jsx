import React, { useState } from 'react';
import Calendar from './Calendar';
import List from './List';

const ParentComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <div >
      <Calendar onDateSelect={handleDateSelect} />
    </div>
  );
};

export default ParentComponent;
