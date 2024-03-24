import React from "react";
import one from "../ProductDetailsPage/images/smartphone-1.jpeg";
import { useNavigate } from "react-router-dom";
import Rating from "../ProductDetailsPage/RatingComp";
const LatestProductCard = ({ model, price, brand, rating }) => {
  const navigate = useNavigate()
  const moveHandler = (e) =>{
    e.preventDefault();
    navigate(`/product/${brand}/${model}`)
  }
  return (
    <div className="wishlist-card-container">
      <div className="wishlist-img-div">
        <img src={one} alt="im" />
      </div>
      <div className="wished-product-name">
        <div>
          <p>{model}</p>
        </div>
        <div className="price">
          <p> {price}$</p>
        </div>
        <Rating value={rating} className="rating" />
        <div>
          <button className="remove-from-wishlist-button" onClick={moveHandler}>Product View</button>
        </div>
      </div>
    </div>
  );
};

export default LatestProductCard;
