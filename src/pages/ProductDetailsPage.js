import React, {useEffect, useState} from "react";
import { Outlet } from "react-router-dom";
import SliderComponent from "../components/HomePage/SliderComponent.js";
import { getBrands } from "../utils/asyncCalls.js";

const ProductDetailsPage = () => {
  const [brandData, setBrandData] =useState([])

  useEffect(() => {
    const fetchData = async () => {
        const data = await getBrands();
        setBrandData(data);
    }

    fetchData();
}, []);
  console.log(brandData.brands)
//  Error Handling needs to be delt here

  

  return (
    <div className="product-details-container">
      <h1>Welcome to the Product Page, Pick your choice!!</h1>
      <div className="product-slider-container">
        <SliderComponent brands={brandData.brands} />
      </div>
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
