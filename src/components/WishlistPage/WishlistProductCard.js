import React, { useEffect, useState } from "react";
import one from "../ProductDetailsPage/images/smartphone-1.jpeg";
import { useDeletionWishlistMutation } from "../../Redux/api";
import { useDispatch, useSelector } from "react-redux";
import { deleteWishlistItem } from "../../Redux/wishlistSlice";
import { addToCart, clearTotalCost, removeProduct, setTotalCost } from "../../Redux/cartSlice";
import { searchingModel } from "../../utils/asyncCalls";

const WishlistProductCard = ({product}) => {
  console.log(product)
 const [deletionWishlist] = useDeletionWishlistMutation();
 const dispatch = useDispatch();
 const [productData, setProductData] = useState()

  const removeWishHandler = async() =>{
    try {
      const { data } = await deletionWishlist(
        JSON.stringify({ model: product.model })
      );
      console.log(data);
      dispatch(deleteWishlistItem({model: product.model}))
    } catch (error) {
      console.log(error)
    }
  }
  const { cartItem} = useSelector((state) => state.cart);

useEffect(()=>{
  const fetchProductData = async() =>{
    try {
      const dataRes = await searchingModel(product.model);
    console.log(dataRes.data.searchResults[0]);
    setProductData(dataRes.data.searchResults[0])
    } catch (error) {
      console.log(error)
    }
  }
  fetchProductData()
},[])




  const addToCartHandler = async (e) => {
    e.preventDefault();
    const foundProductInCart = cartItem.find(
      (item) => item.model === product.model
    );
    if (!foundProductInCart) {
      // setIsAddedToCart(true);
      dispatch(addToCart(productData));
      dispatch(
        setTotalCost({
          model: productData.model,
          price: productData.price,
          camera: productData.camera,
          memory: productData.memory,
          processor: productData.processor,
        })
      );
      dispatch(deleteWishlistItem({ model: productData.model }));
      const { data } = await deletionWishlist(
        JSON.stringify({ model: productData.model })
      );
      if (data?.success === true) {
        alert("Item is Added to the Cart");
      }
    } else {
      // setIsAddedToCart(false);
      dispatch(removeProduct({ model: product.model }));
      dispatch(clearTotalCost({ model: product.model }));
      alert("Item is Removed from the Cart");
    }
  };

  return (
    <div className="wishlist-card-container">
      <div className="wishlist-img-div">
        <img src={one} alt="im" />
      </div>
      <div className="wished-product-name">
        <div>
          <p>{product.model}</p>
        </div>
        <div className="price">
          <p> {product.price}$</p>
        </div>
       
        <div>
          <button className="remove-from-wishlist-button" onClick={removeWishHandler}  >Remove</button>
        </div>
      </div>
      <button className="wishlist-add-to-cart" onClick={addToCartHandler}>Add To Cart</button>
    </div>
  );
};

export default WishlistProductCard;
