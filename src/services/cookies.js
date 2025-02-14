import conf from "@/conf/conf";
import cookies from "js-cookie";

const cookieConfig = {
  path: conf.cookiePath,
  domain: conf.cookieDomain,
  expires: +conf.cookieExpires,
};

export const cookieKeys = {
  TOKEN: "token",
  REFRESH_TOKEN: "refreshToken",
  TOKEN_VERSION: "tokenVersion",
  CODE_VERIFIER: "codeVerifier",
  LOGGED_CLIENT: "loggedClient",
  USER_DETAILS: "userDetails",
};

class Cookies {
  static get(key) {
    return JSON.parse(cookies.get(key) || null);
  }

  static set(key, value, config = cookieConfig) {
    return cookies.set(key, JSON.stringify(value), config);
  }

  static remove(key, config = cookieConfig) {
    cookies.remove(key, config);
  }

  static clear() {
    Object.values(cookieKeys).forEach((key) => {
      Cookies.remove(key);
    });
  }
}

export default Cookies;
