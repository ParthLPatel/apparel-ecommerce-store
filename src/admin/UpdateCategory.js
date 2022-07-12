import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import Base from "../core/Base";
import { createCategory, getCategory, updateCategory} from "./helper/adminapicall";

const UpdateCategory = (props) => {
  const [category, setCategory] = useState({});


  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAutheticated();

  const preload = (categoryID) => {
    getCategory(categoryID).then((data) => {
        // console.log(data);
        if(data.error){
            setError(data.error);
        }else{
            setCategory(data);
        }
    })
  }

  useEffect(() => {
    preload(props.match.params.categoryID);
  },[]);

  const goBack = () => (
    <div className="mt-3">
      <Link className="btn btn-sm btn-dark mb-3 d-flex justify-content-center" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );

  const handleChange = (event) => {
    setError("");
    setCategory({...category, name: event.target.value})
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //backend api call triggered
    const updatedCategory = category;
    console.log(updatedCategory.name+"updated");
    updateCategory(user._id, updatedCategory._id, token, {name: category.name}).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
        setCategory({name: updatedCategory.name});
      }
    });


  };

  const successMsg = () => {
    if (success) {
      return <h4 className="text-success">Category updated successfully!</h4>;
    }
  };

  const warningMsg = () => {
    if (error) {
      return <h4 className="text-danger">Failed to update category!</h4>;
    }
  };

  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead py-2 text-center">Enter the category</p>
        <input
          className="form-control my-3"
          autoFocus
          required
          placeholder="For Ex. Summer"
          onChange={handleChange}
          value={category.name}
        />
       <div className="d-flex justify-content-center">
          <button onClick={onSubmit} className="btn btn-outline-dark mb-2">
            Update Category
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
      <div className="row bg-white rounded p-2">
        <div className="col-md-8 offset-md-2">
            {successMsg()}
            {warningMsg()}
          {myCategoryForm()} {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;
