# react_node_x-auth-integration

# Twitter (X) Login Integration

This project demonstrates how to implement **Twitter (now X) login** using **X Auth (OAuth 1.0a)** in a **React.js (Vite)** frontend and a **Node.js (Express)** backend. After logging in, the user's profile information (name, profile image, username, and ID) is displayed on the **My Profile** page.

---

## Features
- **Frontend**:
  - Sign in with X button.
  - Redirect to X Auth for authentication.
  - Display logged-in user information (profile image, name, username, and ID).
- **Backend**:
  - Handle X OAuth 1.0a token requests.
  - Implement login flow via request token, user redirection, and access token exchange.
  - Fetch user information using the X API.

---

## Authentication Flow (OAuth 1.0a)
### Step 1: Obtaining a Request Token
- Your X app must send a signed request to `POST oauth/request_token`.
- The request includes `oauth_callback`, which is the URL-encoded redirect URL where the user will be sent after authentication.
- Other parameters are handled by the OAuth signing process.

### Step 2: Redirecting the User
- Redirect the user to `GET oauth/authenticate` with the request token obtained in Step 1.
- The website should issue an HTTP 302 redirect, while mobile/desktop apps should open the URL in a browser or embedded web view.

### Step 3: Converting the Request Token to an Access Token
- Exchange the request token for an access token via `POST oauth/access_token`.
- This request must include the `oauth_verifier` obtained from Step 2.
- The request token should be passed in the `oauth_token` header.

---

## Technologies Used
- **Frontend**:
  - React.js (Vite)
  - Axios (for API calls)
  - React Router (for routing)
  - SCSS (optional, for styling)
- **Backend**:
  - Node.js
  - Express.js
  - OAuth 1.0a (X API Authentication)
  - CORS (for cross-origin requests)

---

## Packages Used
### Frontend
- `react`: ^18.2.0
- `react-dom`: ^18.2.0
- `vite`: ^5.0.8
- `axios`: ^1.7.9
- `react-router-dom`: ^6.21.1

### Backend
- `express`: ^4.21.2
- `cors`: ^2.8.5
- `oauth-1.0a`: ^2.2.6
- `dotenv`: ^16.4.7 (for environment variables)

---

## References
- [X OAuth 1.0a Documentation](https://developer.twitter.com/en/docs/authentication/oauth-1-0a)
- [React.js Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [Axios Documentation](https://axios-http.com/)

