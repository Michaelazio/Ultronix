import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import StarRating from "../ProductDetailsPage/StarRating";
import {
  setSpecificReview,
  clearSpecificReview,
  cleanSpecificReviews
} from "../../Redux/reviewSlice";
import { getReview } from "../../utils/asyncCalls";

const ReviewWriting = ({ model }) => {
  const apiBaseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:8080";
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { specificReview } = useSelector((state) => state.review);

  const initialReviewInput = {
    title: "",
    description: "",
    rating: 0,
  };

  const [reviewInput, setReviewInput] = useState(initialReviewInput);
  const [disable, setDisable] = useState(false);
  const [mod, setMod] = useState();

  useEffect(() => {
    dispatch(cleanSpecificReviews())
    const fecthReview = async () => {
      const dataRes = await getReview(model, token);
      console.log(dataRes?.reviews);
      const modelData = await dataRes?.reviews[0]?.model;
      if(modelData === model){
        setDisable(true)
      } else {
        setDisable(false)
      }
      setMod(modelData);
      console.log(modelData);
    };
    fecthReview();
  }, [model]);
  console.log(mod);
  console.log(specificReview);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReviewInput({ ...reviewInput, [name]: value });
  };

  const handleRatingChange = (newRating) => {
    setReviewInput({ ...reviewInput, rating: newRating });
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    if (reviewInput.title !== "" && reviewInput.text !== "") {
      const dataRes = await fetch(`${apiBaseUrl}/api/v1/review/${model}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reviewInput),
      })
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res;
        })
        .then((data) => data.json())
        .catch((er) => console.log(er));
      console.log(dataRes);
      if (dataRes?.success === true) {
        alert(dataRes?.message);
        setDisable(true);
        setReviewInput(initialReviewInput);
        dispatch(setSpecificReview(dataRes?.postData));
      } else {
        setDisable(false);
        alert(dataRes?.message);
      }
    } else {
      alert("Please Enter Review To Submit!");
    }
  };

  const handleDeleteReview = async (e) => {
    e.preventDefault();

    dispatch(clearSpecificReview({ model: model }));
    const data = await fetch(`${apiBaseUrl}/api/v1/review/${model}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res;
      })
      .then((data) => data.json())
      .catch((er) => console.log(er));
    console.log(data);
    if (data?.success === true) {
      dispatch(clearSpecificReview({ model: model }));
      alert(data?.message);
      setDisable(false);
    } else {
      alert(data?.message);
      setDisable(true);
    }
  };

  return (
    <div>
      <>
        {disable ? null : (
          <div className="user-review">
            <h2 className="write-review">Write Your Review</h2>
            <form onSubmit={handleReviewSubmit} className="review-form-field">
              <input
                id="review-input-text"
                type="text"
                name="title"
                placeholder="Title"
                value={reviewInput.title}
                onChange={handleInputChange}
                maxLength="24"
              />
              <textarea
                id="review-text-area"
                name="description"
                placeholder="Your Review"
                value={reviewInput.description}
                onChange={handleInputChange}
                maxLength="24"
              ></textarea>
              <div className="star-review">
                <StarRating
                  rating={reviewInput.rating}
                  onRatingChange={handleRatingChange}
                />
              </div>
              <button id="review-submit-btn" type="submit">
                Submit Review
              </button>
            </form>
          </div>
        )}
        {!disable ? null : (
          <button id="review-submit-btn" onClick={handleDeleteReview}>
            Delete Review
          </button>
        )}
      </>
    </div>
  );
};

export default ReviewWriting;
