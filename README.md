# 🎵 Music Manager App

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![React](https://img.shields.io/badge/React-Redux-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)

---

A **full-stack music library manager** built with **React**, **Redux Toolkit**, **Redux Saga**, **Node.js**, **Express**, and **MongoDB Atlas** — fulfilling the **Addis Software** project requirements.

---

## 📌 Project Overview

**Music Manager App** lets you:
- 🎶 **Add**, **edit**, and **delete** songs
- 🎸 Filter songs by **genre**, **search**, or **artist/album**
- 🔍 Live search and pagination
- 📡 Syncs with a **MongoDB** backend API
- ⚙️ Uses **Redux Toolkit** for state and **Redux Saga** for async side effects
- 🧩 Styled with **Emotion** and **Radix UI**

---

## 🧠 How AI Helped

To streamline development, AI (OpenAI’s ChatGPT) was used to:
- ⚙️ Design the **initial project structure** and folder conventions
- 🪝 Draft **React**, **Redux Toolkit**, and **Saga** boilerplates
- 📝 Assist with **Mongoose models**, **API routes**, and **error handling**
- 🎨 Suggest **Radix UI** + **Emotion CSS** patterns for clean, reusable styling
- 🔑 Write and review this **README.md**

---

## ⚙️ Tech Stack

| Layer       | Tech                         |
|-------------|------------------------------|
| Frontend    | React, Emotion, Radix UI     |
| State Mgmt  | Redux Toolkit, Redux Saga    |
| Backend     | Node.js, Express, Mongoose   |
| Database    | MongoDB Atlas                |
| Dev Tools   | Nodemon, ESLint, Vite/Webpack|

---

## 🚀 Getting Started

### 1️⃣ Clone this repo

```bash
git clone https://github.com/your-username/music-manager-app.git
cd music-manager-app

2️⃣ Install dependencies

# Frontend
npm install

# Backend
cd music-manager-app-backend
npm install

3️⃣ Add your .env file

MONGO_URI=your-mongodb-atlas-connection-string
PORT=5000

4️⃣ Run both servers

# Backend API server
cd music-manager-app-backend
npm run dev

# Frontend React app
npm start

5️⃣ Open the app
Go to http://localhost:3000

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| GET    | `/api/songs`     | Fetch all songs     |
| POST   | `/api/songs`     | Add a new song      |
| PUT    | `/api/songs/:id` | Update a song by ID |
| DELETE | `/api/songs/:id` | Delete a song by ID |


ID

🗃️ Features
🎉 Add Song: Add song info to MongoDB

✏️ Edit Song: Inline edit via modal

🗑️ Delete Song: Confirm delete with Radix AlertDialog

🔍 Search & Filter: Live updates by genre or text

📄 Pagination: Configurable rows per page

🔌 Redux Saga: Handles API calls and errors