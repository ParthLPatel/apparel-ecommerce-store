import React, { useState } from "react";
import Base from "../core/Base";
import { Link, useHistory } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const _history = useHistory();

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    setValues({ ...values, error: false });

    //backend Api call
    signup({ name, email, password })
      .then((data) => {
        // console.log("____"+JSON.stringify(data));
        if (data.errorMsg) {
          setValues({ ...values, error: data.errorMsg, success: false });
        } else {
          //no error
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("Error in signup"));
  };

  const successMsg = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please{" "}
            <Link to="/signin">Login Here</Link>
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
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-dark">Name</label>
              <input
                type="text"
                className="form-control"
                onChange={handleChange("name")}
                placeholder="John Doe"
                value={name}
              />
            </div>

            <div className="form-group">
              <label className="text-dark">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="abc@example.com"
                onChange={handleChange("email")}
                value={email}
              />
            </div>

            <div className="form-group">
              <label className="text-dark">Password</label>
              <input
                type="password"
                placeholder="******"
                className="form-control"
                onChange={handleChange("password")}
                value={password}
              />
            </div>

            <button
              onClick={onSubmit}
              className="btn btn-success btn-block form-control my-3"
            >
              Submit
            </button>
            <hr className="signin_hr" />
            <div className="form-group pb-5">
              <p className="text-dark text-center">Already have an account!</p>
              <div className="signup_btn d-flex justify-content-center ">
                <button
                  onClick={() => _history.push("/signin")}
                  className="btn btn-outline-success"
                >
                  SignIn
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign Up" description="New to our site. Register below!">
      {successMsg()}
      {errMsg()}
      {signUpForm()}
    </Base>
  );
};

export default Signup;
