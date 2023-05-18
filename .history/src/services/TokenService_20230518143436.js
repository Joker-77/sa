class TokenService {
  static getLocalRefreshToken = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return currentUser?.refresh;
  };

  static getLocalAccessToken = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return currentUser?.access;
  };

  static updateLocalAccessToken = (coursesToken) => {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    currentUser.access = coursesToken;
    localStorage.setItem("coursesToken", JSON.stringify(coursesToken));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  };

  static setcurrentUser = (currentUser) => {
    console.log("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("coursesToken", JSON.stringify(currentUser?.access));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  };

  static removecurrentUser() {
    localStorage.removeItem("coursesToken");
    localStorage.removeItem("currentUser");
  }
}

export default new TokenService();
