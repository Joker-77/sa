/* eslint-disable import/no-named-as-default */
/* eslint-disable class-methods-use-this */
import api from "./Api";
import TokenService from "./TokenService";
class AuthService {
  login(username, password) {
    return api
      .post("/authentication/login", {
        username,
        password,
      })
      .then((response) => {
        if (response && response.data) {
          let user = {
            access: response.data.access,
            refresh: response.data.refresh,
          };
          TokenService.setUser(user);
        }
        return response.data;
      });
  }

  logout() {
    TokenService.removeUser();
  }

  getCurrentUser() {
    return TokenService.getUser();
  }
}
export default new AuthService();
