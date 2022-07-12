import { API } from "../../backend";

////******category calls******
//create a category
export const createCategory = (userID, token, category) => {
  return fetch(`${API}/category/create/${userID}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

//get all categories
export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

//get a category:
export const getCategory = (categoryID) => {
  return fetch(`${API}/category/${categoryID}`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

//update a category:
export const updateCategory = (userID, categoryID, token, category) => {
  // console.log(category.name+": in frontend");
  return fetch(`${API}/category/${categoryID}/${userID}`, {
    method: "PUT",
    headers: {
      Accept : "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: category,
  })
    .then((res) => {
      // console.log(res.json());
      return res.json();
    })
    .catch((err) => console.log(err));
};

//delete a category:
export const deleteCategory = (categoryID, userID, token) => {
  return fetch(`${API}/category/${categoryID}/${userID}`, {
    method: "DELETE",
    headers: {
      Accept : "application/json",
      Authorization: `Bearer ${token}`
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};




//******product calls******
//create a product
export const createProduct = (userID, token, product) => {
  return fetch(`${API}/product/create/${userID}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

//get all products
export const getProducts = () => {
  return fetch(`${API}/products`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

//delete a product
export const deleteProduct = (productID, userID, token) => {
  return fetch(`${API}/product/${productID}/${userID}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

//get a product
export const getProduct = (productID) => {
  return fetch(`${API}/product/${productID}`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

//update a product
export const updateProduct = (productID, userID, token, product) => {
  return fetch(`${API}/product/${productID}/${userID}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};
