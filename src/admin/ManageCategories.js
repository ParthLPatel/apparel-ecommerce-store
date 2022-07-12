import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { getCategories, deleteCategory, updateCategory, getCategory } from "./helper/adminapicall";

const ManageCategories = () => {

  const [categories, setCategories] = useState([]);
  const { user, token } = isAutheticated();


  const preLoad = () => {

    //for loading all categories
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preLoad();
  }, []);


  //for removing the category and calling respecting delete backend route
  const removeCategory = (categoryID) => {
    deleteCategory(categoryID, user._id, token).then((data) => {
      if(data.error){
        console.log(data.error);
      }else{
        preLoad();
      }
    })
  }

  return (
    <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4 text-dark">All products</h2>
      <Link className="" to={`/admin/dashboard`}>
        <span className="btn btn-secondary">&#60; Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3 text-dark">
            All Present Categories In Store
          </h2>

          <div className="table-container my-4 py-4">
            <table class="table table-striped text-dark ">
              <thead>
                <tr>
                  <th scope="col">Category Id</th>
                  <th scope="col">Category Name</th>
                  <th scope="col">Category Update</th>
                  <th scope="col">Category Delete</th>
                </tr>
              </thead>
              {categories.map((category, index) => {
                console.log(category);
                return (
                  <tbody>
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{category.name}</td>
                      <td>
                        <Link
                          className="btn btn-success"
                          to={`/admin/category/update/${category._id}`}
                        >
                          <span className="">Update</span>
                        </Link>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            removeCategory(category._id);
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
  )
}

export default ManageCategories;