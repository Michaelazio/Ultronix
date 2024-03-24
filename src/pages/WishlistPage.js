import React from "react";

import WishlistProductCard from "../components/WishlistPage/WishlistProductCard";
import { useSelector } from "react-redux";


const WishlistPage = () => {
  const {wishlistPage} = useSelector(state => state.wish)
  
  return (
    <div className="wishlist-page-container">
      
      <div className="wishlist-heading">
        <h1>Welcome to Your Preffered Stock! </h1>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="kilo" >
      {wishlistPage && wishlistPage.map(item => (<div  key={item.model} className="wishlist-product-container">
        <WishlistProductCard product={item} />
      </div>))}
      </div>
    </div>
  );
};

export default WishlistPage;
