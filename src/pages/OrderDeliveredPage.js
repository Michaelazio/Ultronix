import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderDeliveredPage = () => {
  const navigate = useNavigate();
  let [counter, setCounter] = useState(6);

  useEffect(() => {
    const timer = setInterval(() => {
      for (let i = counter; i === counter; i--) {
        setCounter((c) => (c -= 1));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    const intvTimeFunc = setTimeout(() => {
      navigate("/");
    }, 6100);

    return () => {
      clearTimeout(intvTimeFunc);
    };
  }, [navigate]);

  return (
    <div className="order-delivered-page">
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="order-tracking-msg">
        <h1 className="order-msg">
          Thank You For Shopping with us!
          <br />
          <p>Your Product is on the Way !<br/>
           </p>
        </h1>
        <p>You will be directed to the Home Page automatically after {`(${counter})sec`}</p>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default OrderDeliveredPage;
