import React, { memo, useEffect } from "react";
import one from "../ProductDetailsPage/images/smartphone-1.jpeg";
import { useDispatch, useSelector } from "react-redux";
import {
  removeProduct,
  incrementQuantity,
  decrementQuantity,
  changeInTotalCost,
} from "../../Redux/cartSlice";

const CartItem = memo(({ model, price, image, quantity, camera , processor, memory}) => {
  console.log(model, price, image, quantity);

  const { totalCost } = useSelector((state) => state.cart);
  console.log(totalCost);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeInTotalCost({ model: model, quantity: quantity }));
  }, [model, quantity]);

  const removeItemHandler = (e) => {
    e.preventDefault();
    dispatch(removeProduct({ model: model }));
  };

  let totalCostOfAProduct = quantity * price;

  const incrHnd = (e) => {
    e.preventDefault();
    dispatch(incrementQuantity({ model: model }));
  };
  const decrHnd = (e) => {
    e.preventDefault();
    if (quantity <= 1) {
      dispatch(removeProduct({ model: model }));
    } else {
      dispatch(decrementQuantity({ model: model }));
    }
  };

  return (
    <>
      <div className="cart-image-name-container">
        <img src={one} alt="pic" />
      </div>
      <div className="cart-description-container">
        <h5>{model} <br/>/ {camera} <br/> / {memory} <br/>/ {processor}</h5>
      </div>
      <div className="quantity-container">
        <button
          className="qnt-incr"
          style={{ width: 18, height: 18, fontSize: 20 }}
          onClick={incrHnd}
        >
          +
        </button>
        <span style={{ fontSize: 22 }}>{quantity}</span>
        <button
          className="qnt-decr"
          style={{ width: 18, height: 20, fontSize: 20 }}
          onClick={decrHnd}
        >
          -
        </button>
      </div>
      <div className="cart-item-price">
        <h4>{totalCostOfAProduct}$</h4>
      </div>
      <div className="remove-cart-item">
        <button id="remove-cart-item" onClick={removeItemHandler} />
      </div>
    </>
  );
});

export default CartItem;
