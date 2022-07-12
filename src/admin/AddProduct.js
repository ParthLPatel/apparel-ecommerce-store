import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { createProduct, getCategories } from "./helper/adminapicall";
import { isAutheticated } from "../auth/helper";

const AddProduct = () => {
  const { user, token } = isAutheticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    error,
    loading,
    createdProduct,
    getaRedirect,
    formData,
  } = values;

  const preLoad = () => {
    getCategories().then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
        //   console.log("CATE"+categories);
      }
    });
  };

  useEffect(() => {
    preLoad();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          photo: "",
          stock: "",
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMsg = () => {
    return (
      <div
        className="alert alert-success mt-3"
        style={{ display: createdProduct ? "" : "none" }}
      >
        <h4>{createdProduct} created successfully!</h4>
      </div>
    );
  };

  const errorMsg = () => {
    return (
      <div
        className="alert alert-danger mt-3"
        style={{ display: error ? "" : "none" }}
      >
        <h4>{error}</h4>
      </div>
    );
  };

  const createProductForm = () => (
    <form>
      <div className="mt-3 d-flex justify-content-center">
        <Link
          className="btn btn-md btn-dark mb-3 text-white"
          to="/admin/dashboard"
        >
          Admin Home
        </Link>
      </div>
      <div className="form-group">
        <span className="">Add photo</span>
        <label className="btn btn-block btn-dark my-2">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
            required
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
          required
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
          required
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
          required
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
          required
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <div className="d-flex justify-content-center">
        <button
          type="submit"
          onClick={onSubmit}
          className="btn btn-outline-success mb-3"
        >
          Create Product
        </button>
      </div>
    </form>
  );

  return (
    <Base
      className="container  bg-light p-4 mb-5"
      title="Add a Product here!"
      description="Welcome to product creation section"
    >
      <div className="row bg-light text-dark rounded">
        <div className="col-md-8 offset-md-2">
          {successMsg()}
          {errorMsg()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
