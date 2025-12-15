# 📝 Notes App with Authentication

A full-stack **Notes Application** built with **Bun, React, Tailwind CSS, Prisma, and JWT authentication**. Each user can securely register, log in, and manage **their own private notes**.

---

## 🚀 Project Overview

This project demonstrates a complete authentication and authorization flow combined with a CRUD-based notes system. Users can only access notes that belong to them, ensuring proper data isolation and security.

---

## ✨ Features

* 🔐 User Registration & Login (JWT-based authentication)
* 🧾 CRUD operations for notes

  * Title
  * Content
  * Category
  * Created date
* 👤 Users can **ONLY see their own notes**
* 🔎 Search notes by title or content
* 🗂️ Filter notes by category
* ✍️ Rich text editor for note content (e.g. React Quill)
* 🚪 Logout functionality
* 🛡️ Protected routes (frontend & backend)

---

## 🧩 Tech Stack

### Frontend

* React
* Tailwind CSS
* Axios
* React Context API (AuthContext)

### Backend

* Bun runtime
* REST API
* JWT (JSON Web Tokens)
* bcrypt (password hashing)
* Prisma ORM

### Database

* SQLite / PostgreSQL (via Prisma)

---

## 🗂️ Project Structure (Simplified)

```
src/
│── components/
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   ├── NotesList.tsx
│   ├── NoteCard.tsx
│   ├── NoteEditor.tsx
│   ├── SearchBar.tsx
│   ├── Navbar.tsx
│── context/
│   └── AuthContext.tsx
│── routes/
│   └── ProtectedRoute.tsx
│── pages/
│── index.tsx
│── index.html
```

---

## 🧠 Authentication Flow

1. User registers with email & password
2. Password is hashed using **bcrypt**
3. JWT token is generated on login
4. Token is stored (localStorage or HTTP-only cookie)
5. Protected routes verify JWT
6. Backend validates user before returning notes

---

## 🗃️ Database Schema (Prisma)

```prisma
model User {
  id       Int     @id @default(autoincrement())
  email    String  @unique
  password String
  notes    Note[]
}

model Note {
  id       Int    @id @default(autoincrement())
  title    String
  content  String
  category String
  userId   Int
  user     User   @relation(fields: [userId], references: [id])
}
```

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd notes-app
```

### 2️⃣ Install Dependencies

```bash
bun install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your_secret_key"
```

---

## 🗄️ Prisma Setup

```bash
bunx prisma generate
bunx prisma migrate dev
```

---

## ▶️ Run the Project

### Development

```bash
bun dev
```

### Production

```bash
bun start
```

Server will run at:

```
http://localhost:3000
```

---

## 🧪 Security & Enhancements

* Input validation (email format, password strength)
* JWT expiration handling
* Protected API routes with middleware
* Rate limiting (recommended)
* Remember-me functionality

---

## 🧑‍💻 Learning Outcomes

* JWT authentication & authorization
* Secure password handling with bcrypt
* Prisma relationships & queries
* Protected routes in React
* State management using Context API

---

## 📄 License

This project is for **learning and educational purposes**.

---

## 🙌 Author

**Junaid Iqbal**
BS Computer Science Student

---

Happy Coding! 🚀
