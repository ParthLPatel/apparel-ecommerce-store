import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./CartHelper";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "./helper/OrderHelper";


// stripe test card details:
// all 42 
//expiry: 12/21
// pin: 123


const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload: undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const token = isAutheticated() && isAutheticated().token;
  const userID = isAutheticated() && isAutheticated().user._id;

  const getFinalAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((res) => {
        console.log(res);
        //call further methods here.
        const orderData = {
            products: products,
            transaction_id: res.transaction.id,
            amount: res.transaction.amount
        }
        createOrder(userID, token, orderData);
        cartEmpty(() => console.log("Did we got a crash?"));
      })
      .catch((err) => console.log(err));
  };

  const showStripeButton = () => {
    return isAutheticated() ? (
      <StripeCheckoutButton
        stripeKey="pk_test_51L9B8IFPathvY4nTHD2yHJuFlTy18Kz5YZo0etB29HRdPHL12QEXb4l6oyBuMGp29N1piA0JNFyaTEK8wf4nKwFh00EPHkAhbT"
        token={makePayment}
        amount={getFinalAmount() * 100}
        name="Buy Tshirts"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay with Stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Signin</button>
      </Link>
    );
  };

  return (
    <div>
      <h5 className="text-dark alert alert-info font-weight-normal">Total Amount: {getFinalAmount()}</h5>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
