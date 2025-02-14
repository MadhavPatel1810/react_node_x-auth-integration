import axios from "axios";
import conf from "@/conf/conf";
import Cookies, { cookieKeys } from "./cookies";

const API_URL = `${conf.APIUrl}/api`;
class Axios {
  constructor(baseURL) {
    this.axios = axios.create({
      baseURL,
    });
    this.axios.interceptors.request.use(this._requestMiddleware);
    this.axios.interceptors.response.use(
      this._responseMiddleware,
      this._responseErr
    );
    this.isRefreshing = false;
    this.failedQueue = [];
  }

  _requestMiddleware = (req) => {
    // Send Bearer token on every request
    const token = Cookies.get(cookieKeys?.TOKEN);
    if (token)
      req.headers.authorization = token.startsWith("Token")
        ? token
        : "Bearer " + token;
    return req;
  };

  _responseMiddleware = (response) => {
    //  Do something on every success full response.
    const { data } = response;
    if (data?.data?.token) {
      Cookies.set(cookieKeys?.TOKEN, data.data.token);
    }
    return { data };
  };

  _responseErr = async (error) => {
    //if error comes than handle here
    if (error?.response?.status === 401) {
      Cookies?.clear();
      window.location.reload();
      // store.dispatch(logout());
      return await Promise.reject(error);
    }
    return await Promise.reject(error);
  };
}

const xAuthApi = new Axios(API_URL).axios;
export { xAuthApi };
