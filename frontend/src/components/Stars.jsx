import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
const Stars = (terrain) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [clickedRating, setClickedRating] = useState(0);
  const {user} = useAuthContext();
  console.log(terrain)
  useEffect(()=> {
    setClickedRating(terrain.terrain.ratingAvg);
    getUserRate();
  },[terrain])
  console.log(hoveredRating)
  const getUserRate = async() => {
    try {
      const rate = await axios.get(`http://localhost:4000/ter/terrain/${terrain.terrain._id}/rate/${user.userObj._id}`)
      console.log(rate.data.userRating)
      setHoveredRating(rate.data.userRating.rating ? rate.data.userRating.rating : 0);
    }catch(e) {
      console.error(e);
    }
  }
  const handleRatingChange = (newRating) => {
    setRating(newRating);
    // Send POST or PATCH request to update rating
    if (!terrain.terrain._id) return; // Make sure terrainId is available

    if (!terrain.terrain.rating) {
        // POST request for initial rating
        axios.post(`http://localhost:4000/ter/terrain/${terrain.terrain._id}/rate`, { userId : user.userObj._id, rating: newRating })
            .then(response => {
                console.log(response.data.message);
            })
            .catch(error => {
                console.error(error);
            });
    } else {
        // PATCH request for updating rating
        axios.patch(`http://localhost:4000/ter/terrain/${terrain.terrain._id}/rate`, { userId : user.userObj._id, rating: newRating })
            .then(response => {
                console.log(response.data.message);
            })
            .catch(error => {
                console.error(error);
            });
    }
};

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
            onClick={() => {handleClick(value);handleRatingChange(value)}}
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
