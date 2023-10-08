class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getInfo() {
    return this._request(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization,
      },
    });
  }

  getCards() {
    return this._request(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization,
      },
    });
  }

  editUserInfo(formData) {
    return this._request(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        about: formData.job,
      }),
    });
  }

  editUserAvatar(formData) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: formData,
      }),
    });
  }

  addCard(formData) {
    return this._request(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.place,
        link: formData.link,
      }),
    });
  }

  addLike(cardId) {
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._authorization,
      },
    });
  }

  deleteLike(cardId) {
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
      },
    });
  }

  //Удаление карточки
  deleteCard(cardId) {
    return this._request(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: { authorization: this._authorization },
    });
  }
}

const api = new Api({
  baseUrl: 'http://mesto.nikita.back.nomoredomainsrocks.ru',
});

export default api;
