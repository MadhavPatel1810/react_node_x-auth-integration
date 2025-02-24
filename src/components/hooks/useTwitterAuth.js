import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import conf from "@/conf/conf";
import { toast } from "react-toastify";
import routesConstants from "@/routes/routesConstants";
import {
  getAccessToken,
  getRequestToken,
} from "@/modules/login/slice/loginSlice";

export const useTwitterAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const loginWithTwitter = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const payload = {
        oauth_callback: conf?.twitterRedirectUrl,
      };
      dispatch(getRequestToken({ payload })).then(({ payload }) => {
        if (payload?.oauth_token) {
          const authUrl = `https://api.x.com/oauth/authorize?oauth_token=${payload?.oauth_token}&oauth_token_secret=${payload?.oauth_token_secret}&oauth_callback_confirmed=${payload?.oauth_callback_confirmed}`;
          window.location.href = authUrl;
        } else {
          toast.error("Failed to generate an OAuth token. Please try again.");
        }
        setIsLoading(false);
      });
    } catch (error) {
      setError(error);
      console.error("Error during Twitter login:", error);
      setIsLoading(false);
    }
  };

  const handleCallback = async ({ oauth_token, oauth_verifier }) => {
    setIsLoading(true);
    setError(null);
    try {
      dispatch(getAccessToken({ oauth_token, oauth_verifier })).then(
        (status) => {
          if (status?.payload?.oauth_token) {
            navigate(routesConstants?.PROFILE);
          } else {
            toast.error("Failed to login with Twitter");
            return;
          }
          setIsLoading(false);
        }
      );
    } catch (error) {
      setError(error);
      setIsLoading(false);
      console.error("Error during Twitter callback:", error);
    }
  };

  return { loginWithTwitter, handleCallback, isLoading, error };
};
