import React, {  useState } from "react";
import { Link } from "react-router-dom";

const SliderComponent = ({brands}) => {
  console.log(brands)
  const dummyTextArray = brands || ['apple', 'samsaung', 'xi', 'bulk'];



  let [counterOne, setCounterOne] = useState(0);
  let [counterTwo, setCounterTwo] = useState(1);
  let [counterThree, setCounterThree] = useState(2);
  let [counterFour, setCounterFour] = useState(3);
  let [counterFive, setCounterFive] = useState(4);

  function rightClickHandler(e) {
    e.preventDefault();

    setCounterOne((counter) => (counter + 1) % dummyTextArray.length);
    setCounterTwo((counter) => (counter + 1) % dummyTextArray.length);
    setCounterThree((counter) => (counter + 1) % dummyTextArray.length);
    setCounterFour((counter) => (counter + 1) % dummyTextArray.length);
    setCounterFive((counter) => (counter + 1) % dummyTextArray.length);
  }
  function leftClickHandler(e) {
    e.preventDefault();

    setCounterOne(
      (prevCounter) =>
        (prevCounter - 1 + dummyTextArray.length) % dummyTextArray.length
    );
    setCounterTwo(
      (prevCounter) =>
        (prevCounter - 1 + dummyTextArray.length) % dummyTextArray.length
    );
    setCounterThree(
      (prevCounter) =>
        (prevCounter - 1 + dummyTextArray.length) % dummyTextArray.length
    );
    setCounterFour(
      (prevCounter) =>
        (prevCounter - 1 + dummyTextArray.length) % dummyTextArray.length
    );
    setCounterFive(
      (prevCounter) =>
        (prevCounter - 1 + dummyTextArray.length) % dummyTextArray.length
    );
  }

  return (
    <>
      <div className="left-click-button">
        <button onClick={leftClickHandler} />
      </div>
      <div className="slider-div-container">
        <Link
          to={`/product/${dummyTextArray[counterOne]}`}
          className="link-slide"
        >
          <div className="slider-div ">
            <p>{dummyTextArray[counterOne]}</p>
          </div>
        </Link>
        <Link
          to={`/product/${dummyTextArray[counterTwo]}`}
          className="link-slide"
        >
          <div className="slider-div">
            <p>{dummyTextArray[counterTwo]}</p>
          </div>
        </Link>
        <Link
          to={`/product/${dummyTextArray[counterThree]}`}
          className="link-slide"
        >
          <div className="slider-div ">
            <p>{dummyTextArray[counterThree]}</p>
          </div>
        </Link>
        <Link
          to={`/product/${dummyTextArray[counterFour]}`}
          className="link-slide"
        >
          <div className="slider-div ">
            <p>{dummyTextArray[counterFour]}</p>
          </div>
        </Link>
        <Link
          to={`/product/${dummyTextArray[counterFive]}`}
          className="link-slide"
        >
          <div className="slider-div">
            <p>{dummyTextArray[counterFive]}</p>
          </div>
        </Link>
      </div>
      <div className="right-click-button">
        <button onClick={rightClickHandler} />
      </div>
    </>
  );
};

export default SliderComponent;
