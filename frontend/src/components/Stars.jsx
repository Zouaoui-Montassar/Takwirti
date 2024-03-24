import React, { useState } from 'react';

const Stars = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [clickedRating, setClickedRating] = useState(0);

  const handleMouseOver = (value) => {
    setHoveredRating(value);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const handleClick = (value) => {
    setRating(value);
    setClickedRating(value);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((value) => (
          <i
            key={value}
            className={`star text-3xl ${hoveredRating >= value ? 'text-yellow-500' : 'text-gray-400'} cursor-pointer`}
            onMouseOver={() => handleMouseOver(value)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(value)}
          >
            &#9733;
          </i>
        ))}
      </div>
      <p className="text-xl mt-4">Note: {clickedRating}</p>
    </div>
  );
};

export default Stars;
