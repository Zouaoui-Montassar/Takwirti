import { React , useState, useEffect } from 'react';

const TimeList = ({ start, end, step , sendDataToParent,time}) => {
  console.log(time)
  const [selectedTimes, setSelectedTimes] = useState([]);  
  useEffect(() => { 
    if(time!=null)
      setSelectedTimes(time);
  },[time]);
  const hs = parseInt(start[0]+start[1])
  const he = parseInt(end[0]+end[1])
  start = new Date(`2024-01-01T${start}`);
  if (hs>=he) {end = new Date(`2024-01-02T${end}`);}
  else{end = new Date(`2024-01-01T${end}`);}
  let currentTime = start;
  const timeList = [];
  
  // Function to handle the selection of a time
  const handleTimeSelection = (time) => {
    let updatedSelectedTimes = []; // Create a copy of selectedTimes array
    console.log(time)
    console.log(selectedTimes)
    if (selectedTimes.includes(time)) {
      // If selected, remove it from the selectedTimes array
      updatedSelectedTimes = selectedTimes.filter(selectedTime => selectedTime !== time);
    } else {
      // If not selected, add it to the selectedTimes array
      updatedSelectedTimes = [...selectedTimes, time];
    }
    console.log(updatedSelectedTimes)
    // Update the state with the new selected times
    setSelectedTimes(updatedSelectedTimes);
  
    // Pass the updated selected times to the parent component
    sendDataToParent(updatedSelectedTimes);
  };

/*   useEffect(() => {
    handleTimeSelection(time);
  },[]); */
  console.log(selectedTimes)
  while (currentTime < end) {
    const formattedTime = currentTime.toLocaleTimeString('it-IT', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });
    const isSelected = selectedTimes.includes(formattedTime) && (time != null )? time.includes(formattedTime): false;
    console.log(isSelected);
    timeList.push(
      
      <div key={formattedTime} className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mb-4 lg:mb-0">
      <label htmlFor={formattedTime} className="block cursor-pointer">
        <input
          type="checkbox"
          id={formattedTime}
          className="mr-2 cursor-pointer"
          onChange={() => handleTimeSelection(formattedTime)}
          checked={isSelected?true : null}
          defaultChecked={!isSelected?false:null}
        />
        {formattedTime}
      </label>
    </div>
    );
    currentTime = new Date(currentTime.getTime() + step * 60000); // Increment by step in milliseconds
  }
  


  return <ul className='flex flex-row flex-wrap *: text-bold text-xl  justify-center'>{timeList}</ul>;
};

export default TimeList;