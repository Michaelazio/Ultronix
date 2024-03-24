import React, { useEffect, useState } from "react";
import OrderItem from "../components/OrderPage/OrderItem";
import { getOrderDetails } from "../utils/asyncCalls";
import { useSelector } from "react-redux";

const OrderDetails = () => {
  const [orderData, setOrderData] = useState([]);
  const { token } = useSelector((state) => state.auth);
  

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const resData = await getOrderDetails(token);
      console.log(resData);
      setOrderData(resData?.userSpecificOrders);
    };
    fetchOrderDetails();
  }, []);
  console.log(orderData);

  return (
    <div className="order-page-container">
      <h1 className="order-page-header">Welcome To The Order Page</h1>
      {orderData.length === 0 ? (
        <>
          <h1>No Orders Exist So far</h1>
        </>
      ) : (
        <>
          {orderData &&
            orderData.map((item) => (
              <div key={item._id} className="order-item-container">
                <OrderItem key={item._id} {...item} />
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default OrderDetails;
