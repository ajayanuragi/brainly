# 🧠 Brainly – Your Second Brain for Saving & Sharing Curated Knowledge

Brainly is a full-stack MERN application designed to help you **save**, **organize**, and **share** online content such as tweets, videos, or articles. Think of it as your personal “second brain” — a space to collect insights, tag them by topic, and optionally share your curated knowledge with the world via a secure public link.

---

## ✨ Features

- 🔐 **JWT Authentication** – Secure signup/login
- 📌 **Save Embedded Content** – Tweets, YouTube videos, articles, and more
- 🏷️ **Categorize with Tags** – Group your content meaningfully
- 📚 **Personal Brain** – View and manage your saved links
- 🔗 **Shareable Brain** – Create a public share link to your content
- ⚡️ Fast, responsive UI built with React + Vite

---

## 🧱 Tech Stack

| Layer     | Technology                       |
|-----------|----------------------------------|
| Frontend  | React, TypeScript, Vite          |
| Backend   | Node.js, Express, TypeScript     |
| Database  | MongoDB (Mongoose)               |
| Auth      | JWT, bcrypt                      |

---

## 🧠 API Endpoints

### 🔐 Auth

| Method | Endpoint           | Auth | Description           |
|--------|--------------------|------|-----------------------|
| POST   | `/api/auth/signup` | ❌   | Register new user     |
| POST   | `/api/auth/signin` | ❌   | Login and receive JWT |

---

### 📌 Content Management

| Method | Endpoint            | Auth | Description                     |
|--------|---------------------|------|---------------------------------|
| POST   | `/api/content`      | ✅   | Save a content item             |
| GET    | `/api/content`      | ✅   | Retrieve all user's content     |
| DELETE | `/api/content/:id`  | ✅   | Delete content by ID            |

---

### 🔗 Brain Sharing

| Method | Endpoint                 | Auth | Description                               |
|--------|--------------------------|------|-------------------------------------------|
| POST   | `/api/brain/share`       | ✅   | Enable or disable sharing of user content |
| GET    | `/api/brain/:shareLink`  | ❌   | Fetch shared content via public link      |

---

