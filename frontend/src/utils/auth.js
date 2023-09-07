class ApiAuthentication {
  constructor(parameter) {
    this._baseUrl = parameter.baseUrl;
    this._headers = parameter.headers;
  }

  _checkResponse(response) {
    return response.ok
      ? response.json()
      : Promise.reject(console.log(`Ошибка: ${response.status}`));
  }

  register({ email, password }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then((response) => this._checkResponse(response));
  }

  authorize({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then((response) => this._checkResponse(response));
  }

  checkToken(localToken) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localToken}`,
      },
    }).then((response) => this._checkResponse(response));
  }
}

const apiAuth = new ApiAuthentication({
  baseUrl: "https://api.amg.nomoredomainsicu.ru",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiAuth;

// export const BASE_URL = "https://auth.nomoreparties.co";

// export const register = ({ email, password }) => {
//   console.log(email, password);
//   return fetch(`${BASE_URL}/signup`, {
//     method: "POST",
//     headers: {
//       // 'Accept': 'application/json',
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password }),
//   })
//     .then((response) => {
//       // console.log(response.json());
//       try {
//         if (response.status === 200) {
//           return response.json();
//         }
//       } catch (e) {
//         return e;
//       }
//     })
//     .then((res) => {
//       console.log("register");
//       return res;
//     })
//     .catch((err) => console.log(err));
// };

// export const authorize = ({ email, password }) => {
//   console.log(email, password);
//   return fetch(`${BASE_URL}/signin`, {
//     method: "POST",
//     headers: {
//       // 'Accept': 'application/json',
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password }),
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       if (data.token) {
//         localStorage.setItem("jwt", data.token);
//         console.log(data.token);
//         return data;
//       }
//     })
//     .catch((err) => console.log(err));
// };

// отправляем запрос на роут аутентификации
// return fetch('https://api.mywebsite.com/posts', {
//   method: 'GET',
//   headers: {
//     authorization: `Bearer ${localStorage.getItem('token')}`
//   }
// });
