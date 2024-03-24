import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import appImage from "./app-face-logo.png";
import { useSelector } from "react-redux";
import { useJwtTokenChecker } from "../../utils/jwtTokenChecker";

const Header = memo(() => {
  const { user } = useSelector((state) => state.auth);

  console.log(user);

  const { jwtTokenChecker } = useJwtTokenChecker();
  const { cartItem } = useSelector((state) => state.cart);
  const { wishlistPage } = useSelector((state) => state.wish);

  // for User Presence
  useEffect(() => {
    jwtTokenChecker();
  }, []);

  return (
    <header>
      {user ? (
        <>
          <div className="header-container">
            <div className="header-left">
              <div className="user-name-container">
                <>
                  <img
                    src={appImage}
                    alt="pic"
                    accept="image/*"
                    className="user-image"
                  />
                </>

                <div className="user-name">
                  <p>
                    {" "}
                    {user.firstNm.charAt(0).toUpperCase() +
                      user.firstNm.slice(1)}
                  </p>
                </div>
              </div>

              <div className="app-name-container">
                <h1>Ultronix </h1>
                <span>Mobile-Store</span>
              </div>
            </div>

            <nav className="nav-links">
              <Link to="/" className="link">
                <div id="home-icon" />
                <span>Home</span>
              </Link>
              <Link to="/product" className="link">
                <div id="product-icon" />
                <span>Products</span>
              </Link>
              <Link to="/profile" className="link">
                <div id="profile-icon" />
                <span>Profile</span>
              </Link>
              <Link to="/about" className="link">
                <div id="about-icon" />
                <span>About</span>
              </Link>
              <Link to="/order" className="link">
                <div id="order-icon" />
                <span>Orders</span>
              </Link>
              <Link to="/cart" className="link">
                <div id="cart-icon" />

                <span>Cart:({cartItem.length})</span>
              </Link>
              <Link to="/contact" className="link">
                <div id="contact-icon" />
                <span>Contact</span>
              </Link>
              <Link to="/wishlist" className="link">
                <div id="wishlist-icon" />
                <span>Wishlist:({wishlistPage.length})</span>
              </Link>
              <Link to="/logout" className="link">
                <div id="logout-icon" />
                <span>logout</span>
              </Link>
            </nav>
          </div>
        </>
      ) : (
        <>
          <div className="header-container">
            <div className="header-left">
              <div className="user-name-container">
                <img src={appImage} className="user-image" alt="app-name" />
              </div>

              <div className="app-name-container">
                <h1>Ultronix </h1>
                <span>Mobile-Store</span>
              </div>
            </div>

            <nav className="nav-links">
              <Link to="/" className="link">
                <div id="home-icon" />
                <span>Home</span>
              </Link>
              <Link to="/about" className="link">
                <div id="about-icon" />
                <span>About</span>
              </Link>

              <Link to="/signup" className="link">
                <div id="signup-icon" />
                <span>Signup</span>
              </Link>
              <Link to="/login" className="link">
                <div id="login-icon" />
                <span>Login</span>
              </Link>
              <Link to="/contact" className="link">
                <div id="contact-icon" />
                <span>Contact</span>
              </Link>
            </nav>
          </div>
        </>
      )}
    </header>
  );
});

export default Header;
