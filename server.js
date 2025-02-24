require("dotenv").config({ path: "./.env" });
const express = require("express");
const cors = require("cors");
const OAuth = require("oauth-1.0a");
const crypto = require("crypto");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const oauth = OAuth({
  consumer: {
    key: process.env.TWITTER_API_KEY,
    secret: process.env.TWITTER_API_SECRET,
  },
  signature_method: "HMAC-SHA1",
  hash_function: (baseString, key) =>
    crypto.createHmac("sha1", key).update(baseString).digest("base64"),
});

// Step 1: Obtain a request token
app.post("/api/x/request_token", async (req, res) => {
  const requestData = {
    url: "https://api.x.com/oauth/request_token",
    method: "POST",
    data: req?.body?.payload,
  };

  try {
    const authHeader = oauth.toHeader(oauth.authorize(requestData));
    const response = await axios.post(requestData.url, null, {
      headers: {
        Authorization: authHeader.Authorization,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const responseData = new URLSearchParams(response.data);
    res.json({
      oauth_token: responseData.get("oauth_token"),
      oauth_token_secret: responseData.get("oauth_token_secret"),
      oauth_callback_confirmed: responseData.get("oauth_callback_confirmed"),
    });
  } catch (error) {
    console.error("Error obtaining request token:", error.message);
    res.status(500).json({ error: "Failed to obtain request token" });
  }
});

// Step 3: Converting the request token to an access token 
app.post("/api/x/access_token", async (req, res) => {
  const { oauth_token, oauth_verifier } = req.body;
  if (!oauth_token || !oauth_verifier) {
    return res.status(400).json({ error: "Missing OAuth token or verifier" });
  }
  const requestData = {
    url: `https://api.x.com/oauth/access_token?oauth_token=${oauth_token}&oauth_verifier=${oauth_verifier}`,
    method: "POST",
  };
  try {
    const authHeader = oauth.toHeader(oauth.authorize(requestData));
    const response = await axios.post(requestData.url, null, {
      headers: {
        Authorization: authHeader.Authorization,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const responseData = new URLSearchParams(response.data);
    res.json({
      oauth_token: responseData.get("oauth_token"),
      oauth_token_secret: responseData.get("oauth_token_secret"),
      user_id: responseData.get("user_id"),
      screen_name: responseData.get("screen_name"),
    });
  } catch (error) {
    console.error(
      "Error exchanging request token for access token:",
      error.message
    );
    res.status(500).json({ error: "Failed to obtain access token" });
  }
});

app.get("/api/x/verify_credentials", async (req, res) => {
  const { oauth_token, oauth_token_secret } = req.query;
  if (!oauth_token || !oauth_token_secret) {
    return res.status(400).json({ error: "Missing OAuth tokens" });
  }
  const requestData = {
    url: "https://api.x.com/1.1/account/verify_credentials.json?include_email=true",
    method: "GET",
  };
  try {
    const authHeader = oauth.toHeader(
      oauth.authorize(requestData, {
        key: oauth_token,
        secret: oauth_token_secret,
      })
    );
    const response = await axios.get(requestData.url, {
      headers: {
        Authorization: authHeader.Authorization,
        "Content-Type": "application/json",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching user credentials:");
    if (error?.response) {
      console.error("Response Error:", error?.response?.data);
      res.status(error.response.status).json({ error: error?.response?.data });
    } else if (error?.request) {
      console.error("No Response:", error?.request);
      res.status(500).json({ error: "No response from X API" });
    } else {
      console.error("Request Setup Error:", error?.message);
      res.status(500).json({ error: "Failed to fetch user credentials" });
    }
  }
});

const PORT = 5050;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
