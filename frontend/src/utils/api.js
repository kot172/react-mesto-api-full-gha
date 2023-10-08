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
    return fetch(`${this._url}${url}`, options)
      .then(this._checkResponse)
  }

  getInfo(token) {
    return this._request('/users/me', {
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
  }

  getCards(token) {
    return this._request('/cards', {
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
  }

  editUserInfo(formData) {
    return this._request('/users/me', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.username,
        about: data.job,
      })
    })
  }

  editUserAvatar(formData, token) {
    return this._request('/users/me/avatar', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
  }

  addCard(formData, token) {
    return this._request('/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.title,
        link: data.link,
      })
    })
  }

  addLike(cardId, token) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
  }
}

  deleteLike(cardId, token) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
  }

  //Удаление карточки
  deleteCard(cardId, token) {
    return this._request(`/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    })
  }


const api = new Api({
  baseUrl: 'http://mesto.nikita.back.nomoredomainsrocks.ru',
});

export default api;