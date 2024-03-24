import React, { useEffect, useState } from "react";
import ReviewWriting from "../Review/ReviewWriting";
import { useSelector } from "react-redux";
import Rating from "../ProductDetailsPage/RatingComp";
import { getReview } from "../../utils/asyncCalls";

const OrderItem = ({
  model,
  price,
  memory,
  processor,
  camera,
  cost,
  quantity,
  createdAt,
}) => {
  const { specificReview } = useSelector((state) => state.review);
  const { token } = useSelector((state) => state.auth);
  console.log(specificReview);
  const [rev, setRev] = useState();


  useEffect(() => {
    const fecthReview = async () => {
      const dataRes = await getReview(model, token);
      console.log(dataRes.reviews)
        setRev(dataRes?.reviews[0]);
        console.log(rev)  
    };
   fecthReview();
  
  }, [model, specificReview.length]);
  console.log(rev);
  

  return (
    <div className="order-order">
      <div className="ordered-item-container">
        <div className="ordered-item-details">
          <p>
            {model} <br />/ {camera} <br />/ {memory} <br />/ {processor}
          </p>
        </div>
        <div className="ordered-item-details">
          <p>Unit Price: {price}$</p>
        </div>
        <div className="ordered-item-details">
          <p>Quantity: {quantity}</p>
        </div>
        <div className="ordered-item-details">
          <p>Cost: {cost}$</p>
        </div>
        <div className="ordered-item-details">
          <p>Purchased at: {createdAt}</p>
        </div>
      </div>
      <div className="view-review-container">
        {rev ? (
          <>
            <div className="div-one">
              <h3>{rev.title}</h3>
              <p>{rev.description}</p>
              <Rating value={rev.rating} />
              <p>By: {rev.userId.firstNm} {' '} {rev.userId.lastNm} </p>
            </div>
          </>
        ) : (
          <>
            <p>NO REVIEWS</p>
          </>
        )}
      </div>
      <div className="post-review">
        <ReviewWriting model={model}  />
      </div>
    </div>
  );
};

export default OrderItem;
