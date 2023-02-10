class Api {
  constructor({ baseUrl, ...options }) {
    this._baseUrl = baseUrl;
    this._options = options;

    const token = localStorage.getItem("token");
    if (token) {
      if (!this._options.headers) this._options.headers = {};
      this._options.headers.authorization = "Bearer " + token;
    }
  }

  setToken(token) {
    localStorage.setItem("token", token);
    if (!this._options.headers) this._options.headers = {};
    this._options.headers.authorization = "Bearer " + token;
  }

  removeToken() {
    localStorage.removeItem("token");
    if (this._options?.headers?.authorization) {
      delete this._options?.headers?.authorization;
    }
  }

  async _fetch(path, method = "GET", body) {
    const opt = { ...this._options, method };
    if (body)
      if (typeof body === "string") opt.body = body;
      else opt.body = JSON.stringify(body);

    const response = await fetch(this._baseUrl + path, opt);
    const json = await response.json();

    if (response.ok) return json;

    throw new Error(json.message);
  }

  getUser() {
    return this._fetch("/users/me");
  }

  patchUser(data) {
    return this._fetch("/users/me", "PATCH", data);
  }

  setAvatar(data) {
    return this._fetch("/users/me/avatar", "PATCH", data);
  }

  addCard(data) {
    return this._fetch("/cards", "POST", data);
  }

  removeCard(id) {
    return this._fetch("/cards/" + id, "DELETE");
  }

  getCards() {
    return this._fetch("/cards");
  }

  setLikeStatus(cardId, status) {
    if (status) return this._fetch("/cards/" + cardId + "/likes", "PUT");
    return this._fetch("/cards/" + cardId + "/likes", "DELETE");
  }

  check() {
    return this._fetch("/users/me", "GET");
  }

  login(data) {
    return this._fetch("/signin", "POST", data);
  }

  register(data) {
    return this._fetch("/signup", "POST", data);
  }
}

const baseUrl = process.env.REACT_APP_API_BASEURL ?? "http://localhost:4000";
export const mestoApi = new Api({
  baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
