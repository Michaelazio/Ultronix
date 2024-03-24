import React, { memo, useEffect, useState } from "react";
import CartItem from "../components/CartPage/CartItem";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cleanTotalCost, clearCart } from "../Redux/cartSlice";
import { getDiscounts, postOrderedDetails } from "../utils/asyncCalls";

const Cart = memo(() => {
  const [buySwitch, setBuySwitch] = useState(false);
  const [discount, setDiscount]= useState(0)
  const dispatch = useDispatch();
  const { cartItem, totalCost } = useSelector((state) => state.cart);
  console.log(cartItem);
  const {userUpdatedProfile, token} = useSelector(state => state.auth)
  console.log(userUpdatedProfile)
 const {firstNm, lastNm, address, primaryPhone} = userUpdatedProfile
 const navigate = useNavigate()
 
 

  let totalCostOfAProduct = cartItem.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);

  let totalPayable = totalCostOfAProduct * (100 - discount.discount)/100

 console.log(totalCostOfAProduct)

  function buyBtnHandler(e) {
    e.preventDefault();
    setBuySwitch(true);
  }

  function clearCartHandler(e) {
    e.preventDefault();
    setBuySwitch(false);
    dispatch(clearCart())
    dispatch(cleanTotalCost())
  }


useEffect(()=> {
  const fetcchDiscount = async() =>{
    const dataDiscount = await getDiscounts()
    setDiscount(dataDiscount)
  }
  fetcchDiscount()
},[])
console.log(discount.discount)


 async function buyHandler(e){
  e.preventDefault();
  await totalCost.forEach(item =>  postOrderedDetails(item, token))
  navigate("/orderdelivered");
  dispatch(cleanTotalCost());
  dispatch(clearCart())
 }

 function toProfilePageHandler(e){
  e.preventDefault();
  navigate("/profile")
 }



  return (
    <div className="cart">
      
      <div className="cart-text">
        <h1>Welcome to the Cart !</h1>
      </div>
      {cartItem.length === 0 ? (
        <h1>Empty Cart</h1>
      ) : (
        <>
          <div className="cart-item-container-text">
            <div className="cart-product-text">
              <h3>Product</h3>
            </div>
            <div className="cart-product-text">
              <h3>Description</h3>
            </div>
            <div className="cart-product-text">
              <h3>Quantity</h3>
            </div>
            <div className="cart-product-text">
              <h3>Price</h3>
            </div>
            <div className="cart-product-text">
              <h3>Remove Item</h3>
            </div>
          </div>
          <div className="cart-item-topmost-container">
            {cartItem &&
              cartItem.map((item) => (
                <div key={item._id} className="cart-item-container">
                  <CartItem key={item._id} {...item} />
                </div>
              ))}
          </div>
          <br />
          <hr />
          <br />
          <div className="cart-total-cost-container">
            <table>
              <tbody>
                <tr>
                  <td className="cost-container">
                    <h3> Total Product Price :</h3>
                  </td>
                  <td className="cost-container">
                    <h4 className="cost-container-text"> {totalCostOfAProduct}$ </h4>
                  </td>
                </tr>
                <tr>
                  <td className="cost-container">
                    <h3> Discount Offered :</h3>
                  </td>
                  <td className="cost-container">
                    <h4 className="cost-container-text"> {discount.discount}% </h4>
                  </td>
                </tr>
                <tr>
                  <td className="cost-container">
                    <h3> Paying Cost :</h3>
                  </td>
                  <td className="cost-container">
                    <h4 className="cost-container-text"> {totalPayable}$ </h4>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="activity-button-container">
            <div className="buy-btn-container">
              <button className="buy-btn" onClick={buyBtnHandler}>
                Click To Buy
              </button>
            </div>
            <div className="clear-cart-btn-container">
              <button className="clear-cart-btn" onClick={clearCartHandler}>
                Clear Cart
              </button>
            </div>
          </div>
          {buySwitch ? (
            <div className="cart-address-checking-container">
              <h1 id="add-head">Check The Address !</h1>
              <div className="cart-address">
                <table>
                  <tbody>
                    <tr>
                      <td id="cart-address-data">
                        <h2>Name:</h2>
                      </td>
                      <td id="cart-address-data">
                        <h2> {firstNm} {' '} {lastNm} </h2>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h2 id="cart-address-data"> Address:</h2>
                      </td>
                      <td>
                        <h2 id="cart-address-data">
                         {address}
                        </h2>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h2 id="cart-address-data">Contact:</h2>
                      </td>
                      <td>
                        <h2 id="cart-address-data"> {primaryPhone}</h2>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="proceed-to-buy-container">
                  <button className="proceed-to-buy-btn" onClick={buyHandler}>Proceed To Buy</button>
                <button className="edit-address-btn" onClick={toProfilePageHandler}>To Address Page</button>
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
});

export default Cart;
