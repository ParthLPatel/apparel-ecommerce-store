import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { deleteProduct, getProducts } from "./helper/adminapicall";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const { user, token } = isAutheticated();

  const preLoad = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preLoad();
  }, []);

  //delete a product
  const removeProduct = (productID) => {
    deleteProduct(productID, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preLoad();
      }
    });
  };

  return (
    <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4 text-dark">All products</h2>
      <Link className="" to={`/admin/dashboard`}>
        <span className="btn btn-secondary">&#60; Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3 text-dark">
            Total 3 products
          </h2>

          <div className="table-container my-4 py-4">
            <table class="table table-striped text-dark ">
              <thead>
                <tr>
                  <th scope="col">Product Id</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Update Product</th>
                  <th scope="col">Delete Product</th>
                </tr>
              </thead>
              {products.map((product, index) => {
                console.log(product);
                return (
                  <tbody>
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{product.name}</td>
                      <td>
                        <Link
                          className="btn btn-success"
                          to={`/admin/product/update/${product._id}`}
                        >
                          <span className="">Update</span>
                        </Link>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            removeProduct(product._id);
                          }}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default ManageProducts;
