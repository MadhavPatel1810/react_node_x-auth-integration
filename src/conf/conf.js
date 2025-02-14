const conf = {
  APIUrl: String(import.meta.env.VITE_REACT_APP_API_URL),
  cookiePath: String(import.meta.env.VITE_REACT_APP_COOKIE_PATH),
  cookieDomain: String(import.meta.env.VITE_REACT_APP_COOKIE_DOMAIN),
  cookieExpires: String(import.meta.env.VITE_REACT_APP_COOKIE_EXPIRES),
  twitterClientId: String(import.meta.env.VITE_REACT_APP_TWITTER_CLIENT_ID),
  twitterRedirectUrl: String(
    import.meta.env.VITE_REACT_APP_TWITTER_REDIRECT_URL
  ),
  twitterClientSecret: String(
    import.meta.env.VITE_REACT_APP_TWITTER_CLIENT_SECRET
  ),
};
export default conf;
