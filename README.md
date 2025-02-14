# react_node_x-auth-integration

# Twitter (X) Login Integration

This project demonstrates how to implement **Twitter (now X) login** using **X Auth 2.0** in a **React.js (Vite)** frontend and a **Node.js (Express)** backend. After logging in, the user's profile information (name, profile image, username, and ID) is displayed on the **My Profile** page.

---

## Features
- **Frontend**: 
  - Sign in with Twitter (X) button.
  - Redirect to X Auth 2.0 for authentication.
  - Display logged-in user information (profile image, name, username, and ID).
- **Backend**:
  - Handle X Auth 2.0 token generation.
  - Fetch user information using the X API.

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
  - X Auth 2.0 API
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
- `twitter-api-v2`: ^1.19.1
- `dotenv`: ^16.4.7 (for environment variables)

---

## References
- [X Auth 2.0 Documentation](https://developer.twitter.com/en/docs/authentication/oauth-2-0)
- [React.js Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [Axios Documentation](https://axios-http.com/)

---
