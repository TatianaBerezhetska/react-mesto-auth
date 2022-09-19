export const BASE_URL = "https://api.berezhetska.students.nomoredomains.sbs/";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(res.status);
  }
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      if (err.status === 400) {
        console.log(`Некорректно заполнено одно из полей ${err}`);
      } else {
        console.log(`Что-то пошло не так, а точнее: ${err}`);
      }
    });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
  .then((res) => {
    return checkResponse(res);
  });
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data);
};
