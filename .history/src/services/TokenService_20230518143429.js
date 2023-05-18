class TokenService {
  static getLocalRefreshToken = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return currentUser?.refresh;
  };

  getLocalAccessToken = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return currentUser?.access;
  };

  updateLocalAccessToken = (coursesToken) => {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    currentUser.access = coursesToken;
    localStorage.setItem("coursesToken", JSON.stringify(coursesToken));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  };

  setcurrentUser = (currentUser) => {
    console.log("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("coursesToken", JSON.stringify(currentUser?.access));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  };

  removecurrentUser() {
    localStorage.removeItem("coursesToken");
    localStorage.removeItem("currentUser");
  }
}

export default new TokenService();
