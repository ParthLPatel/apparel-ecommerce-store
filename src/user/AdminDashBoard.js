import React from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const {
    user: { name, email, role },
  } = isAutheticated();

  const adminLeftSide = () => {
    return (
      <div className="container py-2">
        <div className="card">
          <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
          <ul className="list-group">
            <li className="list-group-item">
              <Link to="/admin/create/category" className="nav-link text-dark">
                Create Categories
              </Link>
            </li>
            <li className="list-group-item">
              <Link to="/admin/categories" className="nav-link text-dark">
                Manage Categories
              </Link>
            </li>
            <li className="list-group-item">
              <Link to="/admin/create/product" className="nav-link text-dark">
                Create Product
              </Link>
            </li>
            <li className="list-group-item">
              <Link to="/admin/orders" className="nav-link text-dark">
                Manage Orders
              </Link>
            </li>
            <li className="list-group-item">
              <Link to="/admin/products" className="nav-link text-dark">
                Manage Products
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="container py-2">
        <div className="card mb-4">
          <h4 className="card-header bg-dark text-white">Admin Information</h4>
          <ul className="list-group">
            <li className="list-group-item">
              <span className="mr-2">Name:</span> {name}
            </li>

            <li className="list-group-item">
              <span className="mr-2">Email:</span> {email}
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return (
    <Base
      title="Welcome to the Admin Dashboard"
      description="Manage all of your products here"
      className="container p-4"
    >
      <div className="row pb-5 mb-5">
        <div className="col-md-6 col-sm-12 col-lg-6">{adminLeftSide()}</div>
        <div className="col-md-6 col-sm-12 col-lg-6">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashboard;
