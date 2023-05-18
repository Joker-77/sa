class TokenService {
  getLocalRefreshToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.refresh;
  };

  getLocalAccessToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.access;
  };

  updateLocalAccessToken = (token) => {
    let user = JSON.parse(localStorage.getItem("user"));
    user.access = token;
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(user));
  };

  setUser = (user) => {
    console.log("user", JSON.stringify(user));
    localStorage.setItem("token", JSON.stringify(user?.access));
    localStorage.setItem("user", JSON.stringify(user));
  };

  removeUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
}

export default new TokenService();
