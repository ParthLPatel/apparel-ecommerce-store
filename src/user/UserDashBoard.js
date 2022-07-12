import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper";
import { getUserInfo, updateUserInfo } from "./helper/userapicalls";

const UserDashboard = () => {
  const [fetchedUser, setFetchedUser] = useState({
    _name: "",
    _lastName: "",
    _email: "",
    error: "",
    success: false,
  });

  const token = isAutheticated() && isAutheticated().token;
  const _id = isAutheticated() && isAutheticated().user._id;

  const getLoggedInUser = (_id, token) => {
    getUserInfo(_id, token)
      .then(
        (data) =>
          setFetchedUser({
            ...fetchedUser,
            _name: data.name,
            _lastName: data.lastName,
            _email: data.email,
          })
        // console.log(data)
      )
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getLoggedInUser(_id, token);
  }, [_id, token]);

  // destructure the values;
  const { _name, _email, _lastName, success, error } = fetchedUser;

  //OnChange for inputs:
  const handleInputChange = (name) => (event) => {
    setFetchedUser({
      ...fetchedUser,
      error: false,
      [name]: event.target.value,
    });
  };

  //handle Form Submission:
  const handleFormSubmit = (event) => {
    event.preventDefault();

    setFetchedUser({ ...fetchedUser, error: false });

    //backend Api call
    const dataToUpdate = {
      name: _name,
      lastName: _lastName,
      email: _email,
    };
    updateUserInfo(_id, dataToUpdate, token)
      .then((data) => {
        // console.log("____"+JSON.stringify(data));
        if (data.errorMsg) {
          setFetchedUser({
            ...fetchedUser,
            error: data.errorMsg,
            success: false,
          });
        } else {
          //no error
          setFetchedUser({
            ...fetchedUser,
            _name: _name,
            _lastName: _lastName,
            _email: _email,
            error: "",
            success: true,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  const successMsg = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success text-dark"
            style={{ display: success ? "" : "none" }}
          >
            Profile Details updated successfully.
          </div>
        </div>
      </div>
    );
  };

  const errMsg = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger text-dark"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  // user form:
  const userForm = () => {
    return (
      <div className="row pb-5">
        <div className="col-lg-7 mx-auto">
          <div className="card mt-2 mx-auto p-4 bg-light">
            <div className="card-body bg-light">
              <div className="container">
                <form onSubmit={handleFormSubmit}>
                  <div class="row form-group">
                    <div class="col">
                      <label for="firstName" className="font-weight-light">
                        First Name
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="First name"
                        id="firstName"
                        onChange={handleInputChange("_name")}
                        value={_name}
                      />
                    </div>
                    <div class="col">
                      <label for="lastName" className="font-weight-light">
                        Last Name
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Last name"
                        id="lastName"
                        onChange={handleInputChange("_lastName")}
                        value={_lastName}
                      />
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="email" className="font-weight-light">
                      Email
                    </label>
                    <input
                      type="email"
                      class="form-control"
                      placeholder="Enter email"
                      id="email"
                      onChange={handleInputChange("_email")}
                      value={_email}
                    />
                  </div>

                  {/* TODO: Pass and change Pass */}
                  {/* <div class="form-group">
          <input
            type="password"
            class="form-control"
            placeholder="Password"
          />
        </div> */}

                  <div className="d-flex justify-content-center">
                    <button type="submit" class="btn btn-success rounded">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base
      title="My Profile"
      description="View your personal details here"
      className="container p-4"
    >
      {successMsg()}
      {errMsg()}
      {/* form avse */}
      {userForm()}

      {/* for testing */}
      {/* <p> {fetchedUser._name}</p> */}
    </Base>
  );
};

export default UserDashboard;
