# 🌐 WhereIsIt – Lost & Found Platform

A full-stack web application designed to connect people who have **lost** personal belongings with those who may have **found** them. Users can post, search, manage, and recover lost or found items through an intuitive and responsive interface.

---

## 🚀 Live Links

- 🔗 **Client Live Site**: [whereisit-43e1b.web.app](https://whereisit-43e1b.web.app/)
- 🛠️ **Server Live API**: [whereisit-server-side-eta.vercel.app](https://whereisit-server-side-eta.vercel.app/)

---

## 📌 Project Purpose

To build a secure, responsive, and user-friendly platform that handles:
- User authentication (email/password + Google)
- Posting and browsing lost/found items
- Claiming and recovering items
- Managing personal item listings
- Fully functional admin-style dashboard for users

---

## ⚙️ Key Features

- 🔐 **Authentication** (Firebase + JWT):
  - Email/password & Google sign-in
  - JWT-secured private routes

- 📝 **CRUD Operations**:
  - Add, update, delete lost/found items
  - View and recover items

- 🧠 **Smart UI/UX**:
  - Framer Motion animations
  - Responsive design for mobile, tablet & desktop
  - Modal interactions for recovery process
  - Conditional routing based on login status

- 🔎 **Search Functionality**:
  - Filter items by title or location

- 📁 **Item Management**:
  - Users can manage and edit their own posts
  - View recovered items in card/table toggle layout

- 🔄 **Dynamic Routing**:
  - Titles change per page
  - Error handling with custom 404 page
  - Reloading on protected routes preserved

- 🌈 **Extras**:
  - SweetAlert/Toast feedback on all actions
  - Loading spinner while data fetches
  - Environment variable protection for Firebase & MongoDB

---

## 🧰 Tech Stack

### Client:
- React.js (Vite)
- Tailwind CSS
- React Router DOM
- Firebase Auth
- Axios
- Framer Motion
- React Datepicker
- react-hot-toast / sweetalert2

### Server:
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- dotenv
- CORS

---

## 🧾 NPM Packages Used

```bash
"axios"
"react-router-dom"
"firebase"
"framer-motion"
"react-datepicker"
"react-hot-toast"
"sweetalert2"
"jsonwebtoken"
"cors"
"dotenv"
"mongoose"
"express"

