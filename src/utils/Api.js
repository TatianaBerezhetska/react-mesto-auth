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
    return fetch(this.url, {
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
    return fetch(this.url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this.url}/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
      body: JSON.stringify({
        _id: cardId,
      }),
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this.url}/${cardId}/likes`, {
      method: `${isLiked ? "PUT" : "DELETE"}`,
      headers: this.headers,
      body: JSON.stringify({
        _id: cardId,
      }),
    }).then(this._checkResponse);
  }
}

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-42/cards",
  userUrl: "https://mesto.nomoreparties.co/v1/cohort-42/users/me",
  headers: {
    authorization: "7b060f74-b72c-47c7-a5e8-ffbce8b574c7",
    "Content-Type": "application/json",
  },
});

export default api;
