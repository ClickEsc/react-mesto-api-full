export const BASE_URL = 'http://localhost:3001';

// Обработка запроса регистрации пользователя
export const register = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then((res) => {
      try {
        if (res.status === 201) {
          return res.json();
        }
      } catch (err) {
        return (err)
      }
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
};

// Обработка запроса авторизации пользователя
export const authorize = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then((res => res.json()))
  .then((data) => {
    if (data.token) {
      localStorage.setItem('token', data.token);
      return data;
    }
  })
  .catch(err => console.log(err));
};

// Обработка токена
export const getToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .then((data) => {
    console.log(data);
    return data
  })
  .catch(err => console.log(err));
};