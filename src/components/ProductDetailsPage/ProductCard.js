import React, { useState } from "react";
import one from "../ProductDetailsPage/images/smartphone-1.jpeg";
import WishlistButton from "../HomePage/WishlistButton";
import { Link } from "react-router-dom";
import {
  useSetWishlistMutation,
  useDeletionWishlistMutation,
} from "../../Redux/api";
import {
  setToWishlist,
  setBtn,
  cancelWishlistBtn,
  deleteWishlistItem,
} from "../../Redux/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearTotalCost,
  removeProduct,
  setTotalCost,
} from "../../Redux/cartSlice";

const ProductCard = ({ product }) => {
  const [click, setClick] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  console.log(product.brand, product.model);

  /* For Product Card Component */

  const handleOnMouseOver = () => {
    setClick(true);
  };
  const handleOnMouseOut = () => {
    setClick(false);
  };
  const handleTouchStart = () => {
    setClick(true);
  };
  const handleOnTouchCancel = () => {
    setClick(false);
  };
  const handleOnTouchEnd = () => {
    setClick(false);
  };
  const handleClick = (e) => {
    e.preventDefault();
    setClick(true);
  };

  /* For Wishlist Component  */

  const [setWishlist, { error }] = useSetWishlistMutation();
  const [deletionWishlist] = useDeletionWishlistMutation();
  const dispatch = useDispatch();

  const { wishlistPage, wishlistButtonForSpecificProduct } = useSelector(
    (state) => state.wish
  );
  console.log(wishlistPage, wishlistButtonForSpecificProduct);

  const stringifiedSelectiveDataSet = JSON.stringify({
    image: product.image,
    model: product.model,
    brand: product.brand,
    price: product.price,
  });

  const handleWish = async (e) => {
    e.preventDefault();
    const foundProduct = wishlistPage.find(
      (item) => item.model === product.model
    );
    const foundProductWished = wishlistButtonForSpecificProduct.find(
      (item) => item.model === product.model
    );
    let switchBtn;
    if (!foundProduct && !foundProductWished) {
      try {
        const { data } = await setWishlist(stringifiedSelectiveDataSet);
        console.log(data?.wishlist);
        if (data?.wishlist) {
          switchBtn = true;
          dispatch(setToWishlist(data?.wishlist));
          dispatch(setBtn({ model: product.model }));
        } else {
          switchBtn = false;
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { data } = await deletionWishlist(
          JSON.stringify({ model: product.model })
        );
        if (data?.success === true) {
          switchBtn = false;
          dispatch(cancelWishlistBtn({ model: product.model }));
          dispatch(deleteWishlistItem({ model: product.model }));
        }
      } catch (error) {
        console.log(error);
      }
    }
    return switchBtn;
  };

  // Add to cart handler functionalities
  const { cartItem, totalCost } = useSelector((state) => state.cart);
  const foundProductInCart = cartItem.find(
    (item) => item.model === product.model
  );
  console.log(totalCost);

  const addToCartHandler = async (e) => {
    e.preventDefault();
    const foundProductInCart = cartItem.find(
      (item) => item.model === product.model
    );
    if (!foundProductInCart) {
      setIsAddedToCart(true);
      dispatch(addToCart(product));
      dispatch(
        setTotalCost({
          model: product.model,
          price: product.price,
          camera: product.camera,
          memory: product.memory,
          processor: product.processor,
        })
      );
      dispatch(deleteWishlistItem({ model: product.model }));
      const { data } = await deletionWishlist(
        JSON.stringify({ model: product.model })
      );
      if (data?.success === true) {
        alert("Item is Added to the Cart");
      }
    } else {
      setIsAddedToCart(false);
      dispatch(removeProduct({ model: product.model }));
      dispatch(clearTotalCost({ model: product.model }));
      alert("Item is Removed from the Cart");
    }
  };

  return (
    <div
      className={
        click ? "product-card-container-active" : "product-card-container"
      }
      onMouseOver={handleOnMouseOver}
      onMouseOut={handleOnMouseOut}
      onTouchStart={handleTouchStart}
      onTouchCancel={handleOnTouchCancel}
      onTouchEnd={handleOnTouchEnd}
      onClick={handleClick}
    >
      <div className="name-of-product">
        <div>
          <p>{product.model}</p>
        </div>
        <div className="price">
          <p> {product.price}$</p>
        </div>
        <div>
          <WishlistButton onWishHandler={handleWish} model={product.model} />
        </div>
      </div>
      <div className="add-to-cart-div">
        <button className="add-to-cart" onClick={addToCartHandler}>
          {foundProductInCart ? <>Remove From Cart</> : <>Add To Cart</>}
        </button>
      </div>
      <div className="product-view-div">
        <Link to={`/product/${product.brand}/${product.model}`}>
          <button className="product-view">Product View</button>
        </Link>
      </div>
      <div className="img-div-slider">
        <img src={one} alt="im" />
      </div>
    </div>
  );
};

export default ProductCard;
