class TokenService {
  getLocalRefreshToken = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return currentUser?.refresh;
  };

  getLocalAccessToken = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return currentUser?.access;
  };

  updateLocalAccessToken = (token) => {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    currentUser.access = token;
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  };

  setcurrentUser = (currentUser) => {
    console.log("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("token", JSON.stringify(currentUser?.access));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  };

  removecurrentUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
  }
}

export default new TokenService();
