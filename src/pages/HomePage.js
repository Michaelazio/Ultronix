import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import one from "../components/HomePage/images/1.png";
import two from "../components/HomePage/images/2.png";
import three from "../components/HomePage/images/3.png";
import { Link } from "react-router-dom";
import LatestProductCard from "../components/HomePage/LatestProductCard";
import { useSelector } from "react-redux";
import { getBrands, searching} from "../utils/asyncCalls";

let images = [one, two, three];
let initialImageIndex = 0;

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(initialImageIndex);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);
  

  // Search Handling
  const [searched, setSearched] = useState("");
  const [result, setResult] = useState([]);
  const [brandData, setBrandData] = useState([]);

 
  useEffect(() => {
    const fetchData = async () => {
      const data = await getBrands();
      setBrandData(data);
    };

    fetchData();
  }, []);
  console.log(brandData.brands);

  const clickMe = async (e) => {
    e.preventDefault();
    try {
      const dataRes = await searching(searched);
      console.log(dataRes.data);
      setResult(dataRes.data.searchResults);
    } catch (error) {
      console.log(error.response);
    }
  };
  console.log(result);
  return (
    <div className="home-container">
      <h1 className="home-page-text">Welcome {user ? user.firstNm.charAt(0).toUpperCase() + user.firstNm.slice(1) : null}!</h1>
      <Link to="/product">
        <div className="advertisement-box">
          <motion.div
            initial={{ opacity: 5 }}
            animate={{ opacity: 5 }}
            exit={{ opacity: 5 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <motion.img
              className="img-container"
              src={images[currentImageIndex]}
              alt={`${images[currentImageIndex]}`}
              key={`${images[currentImageIndex]}`}
              whileHover={{ scale: 1.1 }}
            />
          </motion.div>
        </div>
      </Link>
      <div className="advertisement-text">
        <h1>Click Now!! what Are You Waiting For !!!</h1>
      </div>
      <h2 id="search-header">Get Your Choice Directly !!</h2>
      <div className="search-bar">
      <p id="search-text">Click To Search Products</p>
        <select onChange={(e) => setSearched(e.target.value)} id="search-input" defaultValue='xi'>
          
          {brandData.brands &&
            brandData.brands.map((brand) => (
              <>
                <option></option>
                <option key={brand} value={brand}>
                  {brand.charAt(0).toUpperCase() + brand.slice(1)}
                </option>
                
              </>
            ))}
        </select>

        <button className="searching-btn" onClick={clickMe}>
          &#128269;
        </button>
      </div>
      <br />
      <div className="kilo">
        {result &&
          result.map((item) => (
            <div key={item._id} className="wishlist-product-container">
              <LatestProductCard {...item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default HomePage;
