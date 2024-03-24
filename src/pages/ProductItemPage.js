import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductDetailsPage/ProductCard";
import { Outlet, useParams } from "react-router-dom";

import { getBrandedProducts } from "../utils/asyncCalls";

const ProductItemPage = () => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [brandData, setBrandData] = useState([]);
  const { brand } = useParams();

  useEffect(() => {
    const getBrandDatas = async () => {
      const data = await getBrandedProducts(brand);
      console.log(data);
      setBrandData(data);
    };
    getBrandDatas();
  }, [brand]);
  console.log(brandData);

  const productsBasedOnBrandArray = brandData.brand || [];
  console.log(productsBasedOnBrandArray);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productsBasedOnBrandArray.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  return (
    <div className="product-item-page">
      <div className="product-card-item">
        {currentItems.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Prev
        </button>
        {Array.from(
          {
            length: Math.ceil(productsBasedOnBrandArray.length / itemsPerPage),
          },
          (_, i) => (
            <button key={i} onClick={() => paginate(i + 1)}>
              {i + 1}
            </button>
          )
        )}
        <button
          onClick={nextPage}
          disabled={currentItems.length < itemsPerPage}
        >
          Next
        </button>
      </div>
      <div className="each-product-view-container">
        <Outlet />
      </div>
    </div>
  );
};

export default ProductItemPage;
