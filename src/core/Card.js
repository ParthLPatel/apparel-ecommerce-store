import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./CartHelper";
import ImageHelper from "./helper/ImageHelper";

const Card = ({
  item,
  addtoCart = true,
  removeFromCart = false,
  setReload = (f) => f, //function(f){ return f}
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(item.count);

  const cardTitle = item ? item.name : "A photo from pixels";
  const cardDescription = item ? item.description : "A Default description ";
  const cardPrice = item ? item.price : "Default";

  const addToCart = () => {
    addItemToCart(item, () => setRedirect(true));
  };

  const getaRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (addtoCart) => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(item._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove to Cart
        </button>
      )
    );
  };

  return (

    <div class="card shadow mb-5 bg-white">
      {getaRedirect(redirect)}
      <ImageHelper product={item} className="card-img-top"/>
    <div className="card-body text-dark">
      <h5 className="card-title">{cardTitle}</h5>
      <p className="card-text">{cardDescription}</p>
      <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
    </div>
    <div className="card-footer">
    <div className="row">
          <div className="col-12">{showAddToCart(addtoCart)}</div>
          <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
        </div>
    </div>
  </div>




    
  );
};

export default Card;
