import { Helmet } from "react-helmet";
import twitterLogo from "@/assets/images/png/twitter.png";
import { useTwitterAuth } from "@/components/hooks/useTwitterAuth";
import Cookies from "@/services/cookies";
import { useEffect } from "react";

const Login = () => {
  const { loginWithTwitter, isLoading, error } = useTwitterAuth();

  useEffect(() => {
    Cookies.set("login", "true");
    console.log("Cookie set attempt");
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>xAuth | Login</title>
      </Helmet>
      <div className="xauth-page">
        {/* Animated Background Logos */}
        <div className="xauth-background">
          <div className="xauth-logo xauth-logo-x">𝕏</div>
          <div className="xauth-logo xauth-logo-twitter">
            <img src={twitterLogo} alt="Twitter Logo" />
          </div>
        </div>

        {/* Main Content */}
        <div className="xauth-content">
          <h1 className="xauth-title">
            Explore <span className="xauth-highlight">Sign-In with X</span>
          </h1>
          <p className="xauth-tagline">
            A React.js project to integrate and explore the power of{" "}
            <span className="xauth-highlight">X (Twitter)</span> authentication.
          </p>

          {/* Features List */}
          <div className="set_content justify-content-center">
            <ul className="xauth-features">
              <li>🚀 Seamless integration with X (Twitter) API</li>
              <li>🔐 Secure OAuth 2.0 authentication flow</li>
              <li>💻 Built with modern React.js and hooks</li>
              <li>📱 Fully responsive and cross-platform</li>
            </ul>
          </div>

          {/* Sign-in Button */}
          <div className="set_content justify-content-center">
            <button
              className="xauth-button"
              onClick={loginWithTwitter}
              disabled={isLoading}
            >
              <span className="xauth-button-text">
                {isLoading ? "Loading..." : "Sign in with X"}
              </span>
              <span className="xauth-button-icon">→</span>
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="xauth-error text-center">{error?.message}</p>}
        </div>
      </div>
    </>
  );
};

export default Login;
