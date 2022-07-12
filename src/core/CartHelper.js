export const addItemToCart = (item, next) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({
      ...item,
      count: 1,
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const loadCart = () => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      return (cart = JSON.parse(localStorage.getItem("cart")));
    }
  }
};

export const removeItemFromCart = (productID) => {
  let cart = [];
  if (typeof(localStorage) !== "undefined") {
    cart = JSON.parse(localStorage.getItem("cart"));

    const index = cart.findIndex(product => product._id === productID);
    if (index > -1) {
      cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
}
};

export const cartEmpty = (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("cart");
    let cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
}
