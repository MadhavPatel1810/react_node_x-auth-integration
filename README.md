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
  - Tailwind CSS (optional, for styling)
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
- `vite`: ^4.0.0
- `axios`: ^1.5.0
- `react-router-dom`: ^6.14.0

### Backend
- `express`: ^4.18.2
- `cors`: ^2.8.5
- `axios`: ^1.5.0
- `dotenv`: ^16.3.1 (for environment variables)

---

## How to Run the Project
### Frontend
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/repo-name.git
