#  Blog Platform

A full-stack blog platform built using the MERN stack (MongoDB, Express.js, React.js, Node.js).  
This application allows users to register, log in, create blog posts, edit/delete their own posts, comment on posts, and search for content.

---

##  Features

###  Authentication & User Management
- User registration with unique username/email
- Secure password hashing using bcrypt
- Login with JWT-based authentication
- Authentication state persistence using localStorage
- Protected routes (Create, Edit, Delete post)
- Logout functionality

### Blog Post Management (CRUD)
- Create new blog posts
- View all posts (sorted by most recent)
- View single post details
- Edit own posts
- Delete own posts (with confirmation)

### Additional Features
- User profile page (view own posts)
- Search posts by title/author
- Basic commenting system
- Custom 404 page
- Loading indicators during API calls
- Success & error feedback messages

---

## Tech Stack

### Frontend
- React.js
- React Hooks (useState, useEffect)
- react-router-dom
- Axios / Fetch API
- CSS

### Backend
- Node.js
- Express.js
- JWT (jsonwebtoken)
- bcrypt.js
- CORS
- dotenv

### Database
- MongoDB 
- Mongoose

---

## Project Structure

```
BLOG/
│
├── client/        # React frontend
│   ├── src/
│   ├── components/
│   ├── pages/
│
├── server/        # Express backend
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── schema/
│   └── server.js
│
└── .env
```

---

## Installation & Setup

1. Clone Repository
```bash
git clone <your-repository-url>
cd BLOG
```

---

2. Setup Backend
```bash
cd server
npm install
```

Create a `.env` file inside the server folder:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Start backend server:
```bash
npm start
```

---

3. Setup Frontend
Open a new terminal:
```bash
cd client
npm install
npm start
```

Frontend runs on:
```
http://localhost:3000
```

Backend runs on:
```
http://localhost:5000
```

---

## Authentication Flow

1. User registers → Password hashed using bcrypt.
2. User logs in → JWT token generated.
3. Token stored in localStorage.
4. Protected routes verify token via backend middleware.
5. Only post authors can edit/delete their posts.

---

## API Endpoints Overview

### Auth Routes
```
POST   /api/auth/register
POST   /api/auth/login
```

### Post Routes
```
GET    /api/posts
GET    /api/posts/:id
POST   /api/posts
PUT    /api/posts/:id
DELETE /api/posts/:id
```

### Comment Routes
```
POST   /api/comments/:postId
GET    /api/comments/:postId
```

### Search Route
```
GET    /api/search?query=keyword
```

---

## Security Measures

- Password hashing using bcrypt
- JWT-based stateless authentication
- Protected routes using middleware
- Environment variables for sensitive data
- Author-only edit/delete authorization

---

## UI/UX Features

- Responsive design
- Clean navigation bar
- Conditional navigation links (based on login status)
- Form validation
- Loading spinners
- Success and error messages
- Minimalistic styling

---

## Key Learnings

- Implementing JWT authentication
- Building RESTful APIs with Express
- Structuring scalable MERN applications
- Managing authentication state in React
- Handling asynchronous operations properly

---