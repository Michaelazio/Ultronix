import React, { useState } from 'react';

const StarRating = ({ initialRating, onRatingChange, maxRating = 5 }) => {
  const [rating, setRating] = useState(initialRating);

  const handleClick = (newRating) => {
    if (newRating > maxRating) {
      return; 
    }
    setRating(newRating);
    onRatingChange(newRating); 
  };

  const stars = Array(maxRating)
    .fill(0)
    .map((_, i) => {
      const starNumber = i + 1;
      return (
        <span
          key={starNumber}
          onClick={() => handleClick(starNumber)}
          style={{
            display: 'inline-block',
            marginRight: 8,
            cursor: 'pointer',
            fontSize: 32, 
            color: rating >= starNumber ? '#f1c40f' : '#ddd', 
          }}
        >
          ★
        </span>
      );
    });

  return (
    <div>
      {stars}
      <span style={{ marginLeft: 8 }}>({rating} stars)</span>
    </div>
  );
};

export default StarRating;
