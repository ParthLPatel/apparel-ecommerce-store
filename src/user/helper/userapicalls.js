import { API } from "../../backend";

export function getUserInfo(userID, token) {
    return fetch(`${API}/user/${userID}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
          },
    }).then( (res) => {
        return res.json();
    }).catch( (err) => {
        console.log(err);
    })
}

export function updateUserInfo(userID, userData, token) {
    return fetch(`${API}/user/${userID}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    })
    .then(response => {
      return response.json()
    })
    .catch(err => console.log(err));
  };