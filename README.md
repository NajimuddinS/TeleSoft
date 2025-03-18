# 📚 Library Management System

## 🚀 Overview

The **Library Management System** is a web application that allows users to browse and manage a collection of books. Users can register, log in, search for books, and view book details, while admins have additional privileges to add, edit, and delete books.

## 🔗 Links

- **GitHub Repository**: [TeleSoft](https://github.com/NajimuddinS/TeleSoft)
- **Live Demo**: [TeleSoft Library](https://tele-soft.vercel.app/)

---

## 📌 Pages & Features

### 1️⃣ **Register / Login Page**

📍 **Route**: `/login` or `/register`
👥 **Accessible by**: Everyone\
📌 **Purpose**: Allows users and admins to log in or sign up.

#### 🔹 Features

✔ Username & Password fields – Users enter credentials.\
✔ Login Button – If correct:

- Normal users go to the Dashboard.
- Admins go to the Dashboard (with an "Add Book" option).\
  ✔ Error Messages – Displays errors for incorrect credentials.\
  ✔ Store Role in Local Storage – Saves `role: "user"` or `role: "admin"`.\
  ✔ Signup Page – Allows new users to register.

---

### 2️⃣ **Dashboard (Home Page)**

📍 **Route**: `/dashboard`
👥 **Accessible by**: Logged-in users and admins\
📌 **Purpose**: Displays a list of books.

#### 🔹 Features

✔ **Book List** – Shows books with title, author, and genre.\
✔ **Filters** – Users can filter books by:

- Genre
- Author
- Publication Year\
  ✔ **Search Bar** – Search books by title.\
  ✔ **Navigation Bar** – Includes `Dashboard`, `Logout`, and `Add Book` (only for admins).\
  ✔ **Access Control** – Redirects non-logged-in users to Login Page.\
  ✔ **Click on Book** – Navigates to **Book Details Page**.

---

### 3️⃣ **Add Book Page** (Admin Only)

📍 **Route**: `/add-book`
👥 **Accessible by**: Only logged-in admins\
📌 **Purpose**: Allows admins to add new books to the library.

#### 🔹 Features

✔ **Input Fields** – Enter book’s `title`,`description`, `author`, `publication year`.\
✔ **Book Cover Upload** – Allow users to upload an image.\
✔ **Submit Button** – Saves the book and redirects to Dashboard.\
✔ **Form Validation** – Ensures all fields are filled before submission.\
✔ **Navigation Restriction** – Non-admins are redirected to Login.

---

### 4️⃣ **Book Details Page**

📍 **Route**: `/book/:id`
👥 **Accessible by**: Everyone\
📌 **Purpose**: Displays detailed information about a book.

#### 🔹 Features

✔ **Book Details** – Displays `title`, `author`, `genre`, `year`.\
✔ **Description** – Shows a short summary of the book.\
✔ **Back Button** – Navigates back to the Dashboard.\
✔ **Edit/Delete Option** – Available for admins.

---

## 🛠️ Tech Stack

- **Frontend**: React, CSS, JavaScript
- **Backend**: Node.js, Express. MongoDB
- **Hosting**: Vercel

---

## 🔑 Access Control

| Page         | Route        | Accessible By          |
| ------------ | ------------ | ---------------------- |
| Dashboard    | `/dashboard` | Logged-in Users/Admins |
| Login        | `/login`     | Everyone               |
| Register     | `/register`  | Everyone               |
| Add Book     | `/add-book`  | Admins Only            |
| Book Details | `/book/:id`  | Everyone               |

---

## 🚀 Future Enhancements

✅ Implement **User Registration** – Signup page for new users.\
✅ Enable **Editing & Deleting Books** – Let admins modify or remove books.\
✅ Add **User Profile Page** – Show borrowed books and user details.\
✅ Implement **Borrow/Return Books Feature** – Allow users to borrow and return books.

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 📧 Contact

For queries or contributions, feel free to reach out at **[najimuddins@example.com](mailto\:najimuddins@example.com)** or visit the [GitHub Repository](https://github.com/NajimuddinS/TeleSoft).

---

### ⭐ Don't forget to star the repository if you found this project useful!

