import React, { useState } from 'react';
import Calendar from './calendar';
import List from './List';

const ParentComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <div >
      <Calendar onDateSelect={handleDateSelect} />
      {selectedDate && <List date={selectedDate} />}
    </div>
  );
};

export default ParentComponent;
