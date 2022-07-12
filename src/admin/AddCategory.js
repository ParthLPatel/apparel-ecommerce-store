import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import Base from "../core/Base";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAutheticated();

  const goBack = () => (
    <div className="mt-3 d-flex justify-content-center">
      <Link className="btn btn-sm btn-dark mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //backend api call triggered
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };

  const successMsg = () => {
    if (success) {
      return <h4 className="text-success">Category created successfully!</h4>;
    }
  };

  const warningMsg = () => {
    if (error) {
      return <h4 className="text-info">Failed to create category!</h4>;
    }
  };

  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead text-center">Enter the category</p>
        <input
          className="form-control my-3"
          autoFocus
          required
          placeholder="For Ex. Summer"
          onChange={handleChange}
          value={name}
        />
        <div className="d-flex justify-content-center">
          <button onClick={onSubmit} className="btn btn-outline-dark mb-2">
            Create Category
          </button>
        </div>
      </div>
    </form>
  );

  return (
    <Base
      title="Create a Category here"
      description="Add a new category for new tshirts"
      className="container bg-dark p-3 mb-5"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMsg()}
          {warningMsg()}
          {myCategoryForm()} {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
