import { React , useState } from 'react';

const TimeList = ({ start, end, step }) => {
  const [selectedTimes, setSelectedTimes] = useState([]); // State to keep track of selected times
  const hs = parseInt(start[0]+start[1])
  const he = parseInt(end[0]+end[1])
  start = new Date(`2024-01-01T${start}`);
  if (hs>=he) {end = new Date(`2024-01-02T${end}`);}
  else{end = new Date(`2024-01-01T${end}`);}
  let currentTime = start;
  const timeList = [];
  
  // Function to handle the selection of a time
  const handleTimeSelection = (time) => {
    // Check if the time is already selected
    if (selectedTimes.includes(time)) {
      // If selected, remove it from the selectedTimes array
      setSelectedTimes(selectedTimes.filter(selectedTime => selectedTime !== time));
    } else {
      // If not selected, add it to the selectedTimes array
      setSelectedTimes([...selectedTimes, time]);
    }
  };
  let count = 0;
  while (currentTime < end) {
    const formattedTime = currentTime.toLocaleTimeString('it-IT', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });
    const isSelected = selectedTimes.includes(formattedTime);
    timeList.push(
      
      <div key={formattedTime} className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mb-4 lg:mb-0">
      <label htmlFor={formattedTime} className="block cursor-pointer">
        <input
          type="checkbox"
          id={formattedTime}
          className="mr-2 cursor-pointer"
          onChange={() => handleTimeSelection(formattedTime)}
        />
        {formattedTime}
      </label>
    </div>
    );
    count++;
    // Add a line break after every 6 elements
    if (count % 6 === 0) {
      timeList.push(<div key={`break-${count}`} className="flex-wrap" ></div>);
    }
    currentTime = new Date(currentTime.getTime() + step * 60000); // Increment by step in milliseconds
  }
  


  return <ul className='flex flex-row text-bold text-xl relative right-11'>{timeList}</ul>;
};

export default TimeList;