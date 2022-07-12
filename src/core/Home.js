import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import {
  getProducts,
  getAllCategories,
  getProductsByCategory,
} from "./helper/coreapicalls";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Summer");
  const [categories, setCategories] = useState([]);

  const loadAllProducts = () => {
    getProducts()
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setProducts(
            data.filter((product) => product.category.name === selectedCategory)
          );
        }
      })
      .catch((err) => console.log(err));
  };

  const loadAllCategories = () => {
    getAllCategories()
      .then((data) => {
        // console.log(data);
        if (data.error) {
          setError(data.error);
        } else {
          setCategories(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadAllProducts();
    loadAllCategories();
  }, [selectedCategory]);

  return (
    <Base
      title="Hello!"
      description="Welcome to our Store. Choose from a variety of tshirts collections."
    >
      <div className="row text-center d-flex justify-content-center">
        <div className="d-flex">
          <h4 className="text-dark px-4">Tshirt Collections</h4>
        </div>
        <div className="d-flex mx-4">
          <select
            onChange={(event) => setSelectedCategory(event.target.value)}
            value={selectedCategory}
            className="category_dropdown"
          >
            {categories.map((category, index) => {
              return <option key={index}>{category.name}</option>;
            })}
          </select>
        </div>
      </div>

        <div className="row px-4">
          {products.map((product, index) => {
            return (
              <div className="my-4 col-12 col-md-4 card-deck text-center" key={index}>
                <Card item={product} />
              </div>
            );
          })}
        </div>
      
    </Base>
  );
}
