import React, { useState } from "react";
import Rating from "./RatingComp";
import { useSelector } from "react-redux";

const Review = () => {
  let [counterOne, setCounterOne] = useState(0);
  const { reviews } = useSelector((state) => state.review);
  console.log(reviews);

  const initialReviews = reviews;
  console.log(initialReviews);

  // For Review Pannel
  function leftClickHandler(e) {
    e.preventDefault();

    setCounterOne((counter) => (counter + 1) % initialReviews.length);
  }

  function rightClickHandler(e) {
    e.preventDefault();
    setCounterOne(
      (prevCounter) =>
        (prevCounter - 1 + initialReviews.length) % initialReviews.length
    );
  }

  return (
    <div className="review-container">
      {initialReviews.length === 0 ? (
        <>
          <h1>No Reviews Present For This Product</h1>
        </>
      ) : (
        <>
          {" "}
          <div className="review-heading">
            <h2>All Reviews</h2>
          </div>
          <div className="all-reviews">
            <div className="review-box">
              <div className="left-click-button">
                <button onClick={leftClickHandler} />
              </div>

              <div className="div one">
                <h3>{initialReviews[counterOne].title}</h3>
                <p>{initialReviews[counterOne].description}</p>
                <Rating value={initialReviews[counterOne].rating} />
                <p>
                  By:{" "}
                  {initialReviews[counterOne].userId.firstNm +
                    " " +
                    initialReviews[counterOne].userId.lastNm}
                </p>
              </div>

              <div className="right-click-button">
                <button onClick={rightClickHandler} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Review;
