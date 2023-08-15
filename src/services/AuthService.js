/* eslint-disable */
import api from "./Api";
import TokenService from "./TokenService";

class AuthService {
  login(payload) {
    console.log("auth", payload);
    return api
      .post("/login", payload, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((response) => {
        if (response && response.data) {
          console.log(response.data);
          let resp = response.data.data;
          let user = {
            user: resp.user,
            access: resp.token,
          };
          TokenService.setcurrentUser(user);
          console.clear()
          console.log(user)
          return user;
        }
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