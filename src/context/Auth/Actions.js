/* eslint-disable */
import AuthService from "services/AuthService";
import TokenService from "services/TokenService";

export async function loginUser(dispatch, email, password) {
  try {
    let payload = {
      username: email,
      password: password,
    };
    dispatch({
      type: "REQUEST_LOGIN",
    });
    let data = await AuthService.login(payload);
    console.log("data", data);
    if (data.access) {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: data,
      });
      return data;
    }
    dispatch({
      type: "LOGIN_ERROR",
      error: data,
    });
    return;
  } catch (error) {
    dispatch({
      type: "LOGIN_ERROR",
      error: error,
    });
  }
}

export async function logout(dispatch) {
  dispatch({
    type: "LOGOUT",
  });
  TokenService.removecurrentUser();
}
