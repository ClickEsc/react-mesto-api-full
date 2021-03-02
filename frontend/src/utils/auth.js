export const BASE_URL = 'https://api.skubilina.students.nomoreparties.space';

const showError = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(new Error(`Ошибка: ${res.status}`));
}

// Обработка запроса регистрации пользователя
export const register = (email, password) => {
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
        if (res.ok) {
          return res.json();
        }
      } catch (err) {
        return (err)
      }
    })
    .then((res) => {
      return res;
    })
    .then(res => showError(res));
};

// Обработка запроса авторизации пользователя
export const authorize = (email, password) => {
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
  .then(res => showError(res));
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
    return data
  })
  .then(res => showError(res));
};