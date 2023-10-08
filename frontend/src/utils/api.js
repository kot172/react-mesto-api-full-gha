class Api {
  constructor(options) {
    this._url = options.baseUrl;
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

  getInfo(token) {
    return this._request(`${this._url}/users/me`, {
      headers: {
        "Authorization" : `Bearer ${token}`
      },
    });
  }

  getCards(token) {
    return this._request(`${this._url}/cards`, {
      headers: {
        "Authorization" : `Bearer ${token}`,
      },
    });
  }

  editUserInfo(formData, token) {
    return this._request(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: formData.name,
        about: formData.job,
      }),
    });
  }

  editUserAvatar(formData, token) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Authorization" : `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: formData,
      }),
    });
  }

  addCard(formData, token) {
    return this._request(`${this._url}/cards`, {
      method: "POST",
      headers: {
        "Authorization" : `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.place,
        link: formData.link,
      }),
    });
  }

  addLike(cardId, token) {
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        "Authorization" : `Bearer ${token}`,
      },
    });
  }

  deleteLike(cardId, token) {
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        "Authorization" : `Bearer ${token}`,
      },
    });
  }


  //Удаление карточки
  deleteCard(cardId, token) {
    return this._request(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "Authorization" : `Bearer ${token}`,
      },
    });
  }
}

const api = new Api({
  baseUrl: "mesto.nikita.back.nomoredomainsrocks.ru",
});

export default api;
