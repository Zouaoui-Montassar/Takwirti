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
      {selectedDate && <List
                date={selectedDate}
                isReservationPage={false}
                start={"08:00:00"}
                end={"20:00:00"}
                step={120}
            />}
    </div>
  );
};

export default ParentComponent;
