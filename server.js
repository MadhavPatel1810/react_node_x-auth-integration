require("dotenv").config({ path: "./.env" });
const express = require("express");
const cors = require("cors");
const { TwitterApi } = require("twitter-api-v2");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/x/token", async (req, res) => {
  const { code, codeVerifier } = req.body;
  if (!code) {
    return res.status(400).json({ error: "Authorization code is missing" });
  }
  try {
    const client = new TwitterApi({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    });
    const { client: loggedClient, accessToken } = await client.loginWithOAuth2({
      code,
      codeVerifier,
      redirectUri: process.env.REDIRECT_URI,
    });
    res.json({ access_token: accessToken, client: loggedClient });
  } catch (error) {
    console.error("Error exchanging code for token:", error.message);
    res.status(500).json({ error: "Failed to exchange code for token" });
  }
});

app.post("/api/x/user", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(400).json({ error: "Access token is required" });
    }
    const client = new TwitterApi(token);
    const { data: userWithFields } = await client.v2.me({
      "user.fields": ["profile_image_url", "name", "username", "id"],
    });
    res.json({
      user: userWithFields,
    });
  } catch (error) {
    if (error.code === 429) {
      const resetTimestamp = error.response.headers["x-rate-limit-reset"];
      const resetTime = new Date(resetTimestamp * 1000);
      console.error(
        `Rate limit exceeded. Resets at: ${resetTime.toLocaleString()}`
      );
      return res.status(429).json({
        error: "Rate limit exceeded",
        reset_at: resetTime.toISOString(),
      });
    }
    console.error("Error fetching user data from Twitter:", error.message);
    res.status(500).json({ error: "Failed to fetch user data from Twitter" });
  }
});

const PORT = 5050;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
