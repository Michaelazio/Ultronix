import React from 'react';

const Rating = ({ value }) => {
    const stars = [];

    
    for (let i = 1; i <= 5; i++) {
        if (i <= value) {
            stars.push(<span key={i}>&#9733;</span>); // Full star
        } else {
            stars.push(<span key={i}>&#9734;</span>); // Empty star
        }
    }

    return <div className='rating'>{stars}</div>;
};

export default Rating;
