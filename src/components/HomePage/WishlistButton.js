import React, { memo, useEffect, useState } from "react";
import { cleanWishListPage, cleanWishForSpecificProduct } from "../../Redux/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";

const WishlistButton = memo(({onWishHandler, model}) => {
  const [btn, setBtn] = useState(false);
  const { wishlistPage} = useSelector(state => state.wish)
  const dispatch = useDispatch();
  useEffect(()=>{
    if(wishlistPage.find(item => item.model === model)){
      setBtn(true)
      // dispatch(cleanWishForSpecificProduct())
    } else {
      setBtn(false)
      
    }
  },[wishlistPage,model, dispatch])

  return (
    <div className="wishlist-btn-container">
      <button
        className={btn === true ? "active-wishlist-btn" : "wishlist-button"}
        onClick={onWishHandler}
      />
    </div>
  );
});

export default WishlistButton;
