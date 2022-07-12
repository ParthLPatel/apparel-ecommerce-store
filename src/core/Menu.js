import React, { Fragment } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { isAutheticated, signout } from "../auth/helper";

const Menu = (history) => {
  const routeHistory = useHistory();

  return (
    <div>
      <nav class="navbar navbar-expand-lg fixed-top navbar-light bg-light">
        <Link
          className="navbar-brand text-capitalize font-weight-bold text-dark"
          to="/"
        >
          Parth's Apparels Store
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav">
            <li class="nav-item ">
              <Link
                className="nav-link text-dark active"
                to="/"
              >
                Home
              </Link>
            </li>

            {!isAutheticated() && (
              <Fragment>
                <li className="nav-item">
                  <Link
                    className="nav-link text-dark"
                    to="/signup"
                  >
                    Signup
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-dark"
                    to="/signin"
                  >
                    Sign In
                  </Link>
                </li>
              </Fragment>
            )}

            <li className="nav-item">
              <Link
                className="nav-link text-dark"
                to="/contact"
              >
                Contact Us
              </Link>
            </li>

            {isAutheticated() && (
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  My Profile
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  {isAutheticated() && isAutheticated().user.role === 0 && (
                    <li className="nav-item dropdown-item">
                      <Link
                        className="nav-link text-dark"
                        to="/user/dashboard"
                      >
                        User Dashboard
                      </Link>
                    </li>
                  )}
                  {isAutheticated() && isAutheticated().user.role === 1 && (
                    <li className="nav-item dropdown-item">
                      <Link
                        className="nav-link text-dark"
                        to="/admin/dashboard"
                      >
                        Admin Dashboard
                      </Link>
                    </li>
                  )}

                  <div class="dropdown-divider"></div>
                  {isAutheticated() && (
                    <li className="nav-item dropdown-item">
                      <span
                        className="nav-link text-dark"
                        onClick={() => {
                          signout(() => {
                            routeHistory.push("/");
                          });
                        }}
                      >
                        Signout
                      </span>
                    </li>
                  )}
                </div>
              </li>
            )}

            {isAutheticated() && isAutheticated().user.role === 0 && (
              <li className="nav-item">
                <Link
                  className="nav-link text-info"
                  to="/cart"
                >
                  Cart
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>

    
    </div>
  );
};

export default withRouter(Menu);
