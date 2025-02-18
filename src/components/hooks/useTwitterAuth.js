import { useState } from "react";
import { useDispatch } from "react-redux";
import conf from "@/conf/conf";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import routesConstants from "@/routes/routesConstants";
import Cookies, { cookieKeys } from "@/services/cookies";
import { getTwitterToken } from "@/modules/login/slice/loginSlice";

export const useTwitterAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const base64UrlEncode = (buffer) => {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  };

  const generateCodeVerifier = () => {
    const newArray = new Uint8Array(32);
    window.crypto.getRandomValues(newArray);
    return base64UrlEncode(newArray);
  };

  const generateCodeChallenge = async (verifier) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    return base64UrlEncode(digest);
  };

  const loginWithTwitter = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const codeVerifier = generateCodeVerifier();
      const codeChallenge = await generateCodeChallenge(codeVerifier);
      // Store the code verifier in cookies
      Cookies.set(cookieKeys?.CODE_VERIFIER, codeVerifier);
      const params = new URLSearchParams({
        response_type: "code",
        client_id: conf?.twitterClientId,
        redirect_uri: conf?.twitterRedirectUrl,
        state: "madhavpatel_1810",
        code_challenge: codeChallenge,
        code_challenge_method: "S256",
        scope: "tweet.read users.read",
      });
      window.location.href = `https://x.com/i/oauth2/authorize?${params.toString()}`;
    } catch (error) {
      setError(error);
      console.error("Error during Twitter login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCallback = async (code) => {
    setIsLoading(true);
    setError(null);
    try {
      const codeVerifier = Cookies.get(cookieKeys?.CODE_VERIFIER);
      dispatch(getTwitterToken({ code, codeVerifier })).then((status) => {
        if (status?.payload?.access_token) {
          navigate(routesConstants?.PROFILE);
        } else {
          toast.error("Failed to login with Twitter");
          return;
        }
      });
    } catch (error) {
      setError(error);
      console.error("Error during Twitter callback:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return { loginWithTwitter, handleCallback, isLoading, error };
};
