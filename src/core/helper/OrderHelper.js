import { API } from "../../backend";

export const createOrder = (userID, token, orderData) => {
  return fetch(`${API}/order/create/${userID}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ order: orderData }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};
