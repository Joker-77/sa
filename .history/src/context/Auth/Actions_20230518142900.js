/* eslint-disable object-shorthand */
/* eslint-disable consistent-return */
/* eslint-disable prefer-const */
// Context/actions.js
import AuthService from "services/AuthService";

export async function loginUser(dispatch, username, password) {
  try {
    dispatch({ type: "REQUEST_LOGIN" });
    let data = await AuthService.loginUser(username, password);
    if (data.user) {
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
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
 لإ
}
