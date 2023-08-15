/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable prefer-template */
/* eslint-disable dot-notation */
/* eslint-disable no-param-reassign */
/* eslint-disable */
import axios from "axios";
import TokenService from "./TokenService";

const API_URL = "https://back.trendfuture.shop/api";
// const API_URL = "https://www.trendfuture.shop/api/welcome2";

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
});

instance.interceptors.request.use(
  (config) => {
    // const token = TokenService.getLocalAccessToken();
    let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI1IiwianRpIjoiNzhhNDU1ODFjZGIxNjdiNmZiNDg1YjE0OGZmODk2YTBlMmIyMzE1YWEzZjBmNGY5YTUwMmM0MmE3M2I1YmU2ZGNkMGVjNTYxZTAyYzA2NjciLCJpYXQiOjE2OTIxMTQzOTguMzIxMjQ3LCJuYmYiOjE2OTIxMTQzOTguMzIxMjUyLCJleHAiOjE3MjM3MzY3OTguMTU3MDc0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.pM1nG49yL-rCECuVVGUlM3xvOrI8ftxzij7-kFkpA42rKP3rBZzrP492wImB24FxaS4K-RiPnHpGV8ztnE7It2qs6kf8ugTEWllQQw5zOdC_JlR22Ogff9jFL3d1ccLWLZ7DCmjdZL_a7UKA0FmPZ6AXUHhvG63yFOaqrSsfFLdhY9dngEbXF9G7ZLGO4aknNAiDftJUs25jIpSenL3-CQ06s4Vg3UN3Xefi4RbGu4inCBan6qxW0ehSdwYtDowifGMytfNYkUoHOLeIuOhepI5GDQQ-UZTtFKWHgwgqwyqgcg5caNyW1jt-9Z2GuGxB5FV12HhdfvhLoKS_mN8lWXXxAnV64wpuRtEPzlCXs59bD3O9cVGLW3xIpXiInCmKyCOmX4jAnGu_jYS5FacDR_PDcxIKyQ9bcDsggrTqgGNuUWc3WNxky0cdsdIjYLojDyYyICQKM27Ie7igYMlz0_SalKkztMz5Ls4NEUACAz8LxefNSYhA7YmnaRtNl2TxsebN9r6T0WoHKqQTNDL8WjaQre1VnIMoBaaueQ6TSiUetd5as53LRSoYeOmUDCTEEx2iC7RXBlyIvfPNZiSUASJ1Nl5ZNwBfJwj4Dv_Wn92y_rDbg1YSreJte4426BEE6JPPC6a_o5Vs8q-tVASPqtNxfd7ByMeWdGwrMZ_E_Po";
    if (token) {
      config.headers["Authorization"] = "Bearer " + token; // for Spring Boot back-end
      //   config.headers['x-access-token'] = token // for Node.js Express back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    console.log(err)
    if (originalConfig.url !== "/login" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          // const rs = await instance.post("/authentication/refresh", {
          //   refresh: TokenService.getLocalRefreshToken(),
          // });
          // const accessToken = rs.data.access;
          // TokenService.updateLocalAccessToken(accessToken);
          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);

export default instance;