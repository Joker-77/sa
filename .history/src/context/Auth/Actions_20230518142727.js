/* eslint-disable object-shorthand */
/* eslint-disable consistent-return */
/* eslint-disable prefer-const */
// Context/actions.js

import AuthService from "services/AuthService";

const ROOT_URL = "https://secret-hamlet-03431.herokuapp.com";

export async function loginUser(dispatch, username, password) {
  try {
    dispatch({ type: "REQUEST_LOGIN" });
    let response = await AuthService.loginUser(username, password);
    let data = await response.json();
    if (data.user) {
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      localStorage.setItem("currentUser", JSON.stringify(data));
      return data;
    }

    dispatch({ type: "LOGIN_ERROR", error: data.errors[0] });
    return;
  } catch (error) {
    dispatch({ type: "LOGIN_ERROR", error: error });
  }
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
  localStorage.removeItem("token");
}
