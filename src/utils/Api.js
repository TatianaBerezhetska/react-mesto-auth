class Api {
  constructor({ url, userUrl, headers }) {
    this.url = url;
    this.userUrl = userUrl;
    this.headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return Promise.resolve(res.json());
    }
    return Promise.reject(res.status);
  }

  getUserInfo() {
    return fetch(this.userUrl, {
      headers: this.headers,
    }).then(this._checkResponse);
  }

  getCards() {
    return fetch(`${this.url}/cards`, {
      method: 'GET',
      headers: this.headers,
    }).then(this._checkResponse);
  }

  getAllData() {
    return Promise.all([this.getUserInfo(), this.getCards()]);
  }

  setUserInfo(data) {
    return fetch(this.userUrl, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResponse);
  }

  setUserAvatar(newAvatar) {
    return fetch(`${this.userUrl}/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(newAvatar),
    }).then(this._checkResponse);
  }

  postNewCard(newCard) {
    return fetch(`${this.url}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
      body: JSON.stringify({
        _id: cardId,
      }),
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: `${isLiked ? "PUT" : "DELETE"}`,
      headers: this.headers,
      body: JSON.stringify({
        _id: cardId,
      }),
    }).then(this._checkResponse);
  }
}

const api = new Api({
  url: "https://api.berezhetska.students.nomoredomains.sbs",
  userUrl: "https://api.berezhetska.students.nomoredomains.sbs/users/me",
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
    "Content-Type": "application/json",
  },
});

export default api;
