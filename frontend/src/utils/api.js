class Api {
  constructor(parameter) {
    this._baseUrl = parameter.baseUrl;
    // this._headers = parameter.headers;
    // this._key = parameter.headers.authorization;
  }

  _checkResponse(response) {
    return response.ok
      ? response.json()
      : Promise.reject(console.log(`Ошибка: ${response.status}`));
  }

  getCards(token) {
    return fetch(this._baseUrl + "/cards", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((response) => this._checkResponse(response));
  }

  getUser(token) {
    return fetch(this._baseUrl + "/users/me ", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((response) => this._checkResponse(response));
  }

  setUserInfo(data, token) {
    return fetch(this._baseUrl + "/users/me ", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((response) => this._checkResponse(response));
  }

  setUserAvatar(data, token) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: data.link,
      }),
    }).then((response) => this._checkResponse(response));
  }

  setCardData(data, token) {
    return fetch(this._baseUrl + "/cards ", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.title,
        link: data.link,
      }),
    }).then((response) => this._checkResponse(response));
  }

  setLike(cardID, token) {
    return fetch(this._baseUrl + "/cards/" + cardID + "/likes", {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((response) => this._checkResponse(response));
  }

  delLike(cardID, token) {
    return fetch(this._baseUrl + "/cards/" + cardID + "/likes", {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((response) => this._checkResponse(response));
  }

  changeLikeCardStatus(cardID, isLiked, token) {
    if (isLiked) {
      return this.setLike(cardID, token);
    } else {
      return this.delLike(cardID, token);
    }
  }

  delPost(cardID, token) {
    return fetch(this._baseUrl + "/cards/" + cardID, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((response) => this._checkResponse(response));
  }
}

const api = new Api({
  baseUrl: "http://localhost:3003",
  // headers: {
  //   authorization: "3ae990f3-38d7-4220-b0b2-495ee3de689b",
  //   "Content-Type": "application/json",
  // },
});

export default api;
