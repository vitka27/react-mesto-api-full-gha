class Api {
  constructor(parameter) {
    this._baseUrl = parameter.baseUrl;
    this._headers = parameter.headers;
    this._key = parameter.headers.authorization;
  }

  _checkResponse(response) {
    return response.ok
      ? response.json()
      : Promise.reject(console.log(`Ошибка: ${response.status}`));
  }

  getCards() {
    return fetch(this._baseUrl + "/cards", {
      headers: {
        authorization: this._key,
      },
    }).then((response) => this._checkResponse(response));
  }

  getUser() {
    return fetch(this._baseUrl + "/users/me ", {
      headers: {
        authorization: this._key,
      },
    }).then((response) => this._checkResponse(response));
  }

  setUserInfo(data) {
    return fetch(this._baseUrl + "/users/me ", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((response) => this._checkResponse(response));
  }

  setUserAvatar(data) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.link,
      }),
    }).then((response) => this._checkResponse(response));
  }

  setCardData(data) {
    return fetch(this._baseUrl + "/cards ", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        link: data.link,
      }),
    }).then((response) => this._checkResponse(response));
  }

  setLike(cardID) {
    return fetch(this._baseUrl + "/cards/" + cardID + "/likes", {
      method: "PUT",
      headers: {
        authorization: this._key,
      },
    }).then((response) => this._checkResponse(response));
  }

  delLike(cardID) {
    return fetch(this._baseUrl + "/cards/" + cardID + "/likes", {
      method: "DELETE",
      headers: {
        authorization: this._key,
      },
    }).then((response) => this._checkResponse(response));
  }

  changeLikeCardStatus(cardID, isLiked) {
    if (isLiked) {
      return this.setLike(cardID);
    } else {
      return this.delLike(cardID);
    }
  }

  delPost(cardID) {
    return fetch(this._baseUrl + "/cards/" + cardID, {
      method: "DELETE",
      headers: {
        authorization: this._key,
      },
    }).then((response) => this._checkResponse(response));
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-66",
  headers: {
    authorization: "3ae990f3-38d7-4220-b0b2-495ee3de689b",
    "Content-Type": "application/json",
  },
});

export default api;
