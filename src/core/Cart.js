import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import getProducts from "./helper/coreapicalls";
import { loadCart } from "./CartHelper";
import StripeCheckout from "./StripeCheckout";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = () => {
    return (
      <div>
        <h5 className="text-dark alert alert-info font-weight-normal">Products in cart</h5>
        {products.map((product, index) => {
          return (
            <Card
              key={index}
              item={product}
              addtoCart={false}
              removeFromCart={true}
              setReload={setReload}
              reload={reload}
            />
          );
        })}
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to Checkout">
      <div className="row text-center">
        <div className="col-6">{loadAllProducts()}</div>
        <div className="col-6">
          <StripeCheckout products={products} setReload={setReload} />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
