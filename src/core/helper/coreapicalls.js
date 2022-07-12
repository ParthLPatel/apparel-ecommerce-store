import { API } from "../../backend";

export function getProducts() {
  return fetch(`${API}/products`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
}

export function getAllCategories() {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
}

export function submitUserFeedback(userRes) {
  return fetch(`${API}/contact_us`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userRes),
  })
  .then(response => {
    return response.json()
  })
  .catch(err => console.log(err));
};