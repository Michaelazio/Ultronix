import React,{useEffect, useState} from "react";
import one from "../components/ProductDetailsPage/images/smartphone-1.jpeg";
import Rating from "../components/ProductDetailsPage/RatingComp";
import Review from "../components/ProductDetailsPage/Review";
import { getReview } from "../utils/asyncCalls"
import { useParams } from "react-router-dom";
import { getAModelData } from "../utils/asyncCalls";
import { useSelector, useDispatch } from "react-redux";
import { setReviews } from "../Redux/reviewSlice";

const EachProductViewPage = () => {
  const { model, brand } = useParams();
  console.log(model, brand);
  const [modelData, setModelData] = useState({})
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();


 useEffect(()=> {
  const getModelData = async() =>{
    const data = await getAModelData(model)
    console.log(data, data?.model)
    setModelData(data?.model)
  };
  getModelData()

 },[model])

 useEffect(() => {
  const fetchReviews = async () => {
    try {
      const dataRes = await getReview(model, token);
      console.log(dataRes?.reviews);
      dispatch(setReviews(dataRes?.reviews))
    } catch (error) {
      console.error("Error fetching reviews:", error);
      
    }
  };
  if (token) {
    fetchReviews();
  }
}, [model]);
const { reviews } = useSelector((state) => state.review);
console.log(reviews)
  
  console.log(modelData);
  const product = modelData  || {
    model: "apple",
    rating: 5,
    price: 299,
    brand: 'xyz'
  };
  console.log(product);

  return (
    <>
      <div className="product-view-container">
        <div className="product-image-container">
          <div className="product-image">
            <img src={one} alt="Product" id="product-image" />
          </div>

          <h1 className="product-name">{product.model}</h1>
          <Rating value={product.rating} className=".rating" />
          <h1 className="product-name">Price: {product.price}</h1>
        </div>

        <div className="product-details">
          <table>
            <tbody>
              <tr>
                <td>Brand</td>
                <td>{product.brand}</td>
              </tr>
              <tr>
                <td>Model</td>
                <td>{product.model}</td>
              </tr>
              <tr>
                <td>Display</td>
                <td>{product.display}</td>
              </tr>
              <tr>
                <td>Processor</td>
                <td>{product.processor}</td>
              </tr>
              <tr>
                <td>Memory</td>
                <td>{product.memory}</td>
              </tr>
              <tr>
                <td>Camera</td>
                <td>{product.camera}</td>
              </tr>
              <tr>
                <td>Battery</td>
                <td>{product.battery}</td>
              </tr>
              <tr>
                <td>Connectivity</td>
                <td>{product.connectivity}</td>
              </tr>
              <tr>
                <td>Operating System</td>
                <td>{product.operating_system}</td>
              </tr>
              <tr>
                <td>Features</td>
                <td>{product.features}</td>
              </tr>
              <tr>
                <td>Dimensions</td>
                <td>{product.dimensions}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <Review />
      </div>
    </>
  );
};

export default EachProductViewPage;
