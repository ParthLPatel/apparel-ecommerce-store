import React, { useState } from "react";
import Base from "./Base";
import { submitUserFeedback } from "./helper/coreapicalls";
import emailjs from "emailjs-com";

const Contact = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
    error: "",
    success: false,
  });

  const [checked, setChecked] = useState(false);

  const handleChangeCheckbox = () => {
    setChecked(!checked);
  };

  const { error, success, name, email, message } = values;

  const handleInputChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const successMsg = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-center">
          <div
            className="alert alert-success text-dark"
            style={{ display: success ? "" : "none" }}
          >
            Your message was successfully submitted.
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

  const onSubmit = (event) => {
    event.preventDefault();

    setValues({ ...values, error: false });

    //backend API call;
    submitUserFeedback({ name, email, message })
      .then((data) => {
        if (data.errorMsg) {
          setValues({ ...values, error: data.errorMsg, success: false });
        } else {
          //no errors
          setValues({
            ...values,
            name: "",
            email: "",
            message: "",
            error: "",
            success: true,
          });
        }
      })
      .catch((err) => console.log("Error in ContactPage" + err));

    if (checked) {
      //Using EmailJs for sending the email response;
      const emailContent = {
        to_name: name,
        to_message: message,
        receiver: email,
      };

      emailjs
        .send(
          "service_8pg0muk",
          "template_p82iqlx",
          emailContent,
          "Q57HQehwBo_GtRNRn"
        )
        .then(
          (response) => {
            console.log("SUCCESS!", response.status, response.text);
          },
          (err) => {
            console.log("FAILED...", err);
          }
        );
    }

    //after submission : updating checked status:
    setChecked(false);
  };

  const contactForm = () => {
    return (
      <div className="row pb-5">
        <div className="col-lg-7 mx-auto">
          <div className="card mt-2 mx-auto p-4 bg-light">
            <div className="card-body bg-light">
              <div className="container">
                <form id="contact-form" role="form">
                  <div className="controls">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="form_name" className="text-dark">
                            Name
                          </label>
                          <input
                            id="form_name"
                            type="text"
                            className="form-control"
                            placeholder="John Doe"
                            value={name}
                            onChange={handleInputChange("name")}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label for="form_email" className="text-dark">
                            Email
                          </label>
                          <input
                            id="form_email"
                            type="email"
                            className="form-control"
                            placeholder="johndoe@example.com"
                            value={email}
                            onChange={handleInputChange("email")}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label for="form_message" className="text-dark">
                            Message
                          </label>
                          <textarea
                            id="form_message"
                            className="form-control"
                            placeholder="Write your message here."
                            rows="4"
                            value={message}
                            onChange={handleInputChange("message")}
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="exampleCheck1"
                            checked={checked}
                            onChange={handleChangeCheckbox}
                          />
                          <label
                            className="form-check-label text-dark mb-4"
                            for="exampleCheck1"
                          >
                            Get a email copy of the submitted response.
                          </label>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <input
                          type="submit"
                          className="btn btn-success btn-send  pt-2 btn-block"
                          value="Send Message"
                          onClick={onSubmit}
                        />
                      </div>
                    </div>
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
    <Base title="Contact Us" description="We will be happy to serve you!">
      {successMsg()}
      {errMsg()}
      {contactForm()}
    </Base>
  );
};

export default Contact;
