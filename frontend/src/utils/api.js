class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }
  
  // Показать ошибку в консоли
  showError(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  // Получить список всех карточек в виде массива
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      headers: this.headers
    })
      .then(res => this.showError(res))
  }

  // Добавить карточку
  postCard(card) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(card)
    })
      .then(res => this.showError(res))
  }

  // Удалить карточку
  deleteCard(card) {
    return fetch(`${this.baseUrl}/cards/${card._id}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(res => this.showError(res))
  }

  // Получить данные пользователя
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: this.headers
    })
      .then(res => this.showError(res))
  }

  // Заменить данные пользователя
  editUserInfo({ name, about }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({ name, about })
    })
      .then(res => this.showError(res))
  }

  // Заменить аватар
  changeUserAvatar({ avatar }) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({ avatar })
    })
      .then(res => this.showError(res))
  }

  // Поставить или убрать лайк
  changeLikeCardStatus(card, isLiked) {
    if (isLiked) {
      return fetch(`${this.baseUrl}/cards/${card._id}/likes`, {
        method: 'DELETE',
        headers: this.headers,
      })
        .then(res => this.showError(res))
    } else {
      return fetch(`${this.baseUrl}/cards/${card._id}/likes`, {
        method: 'PUT',
        headers: this.headers,
      })
        .then(res => this.showError(res))
    }
  }
}

export const api = new Api({
  baseUrl: 'https://api.skubilina.students.nomoreparties.space',
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem('token')}`
  }
})