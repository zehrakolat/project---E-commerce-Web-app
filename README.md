# 🛒 E-Commerce Web App (Stage 1)

## 📌 Project Description
This project is a simple e-commerce web application with user and admin roles.  
It includes product management, cart functionality, and stock control.

---

## 🚀 Features

### 👤 Customer
- Register & Login
- View products
- Add to cart
- Remove from cart
- View profile & cart summary

### 🛠 Admin
- Add new products
- Delete products
- Manage stock levels

---

## 🧱 Architecture

- Backend: Node.js + Express
- Frontend: HTML, CSS, JavaScript
- Data: In-memory storage


# 🛒 E-Commerce Web Application (Stage 2)

## 📌 Project Description

This project is a full-stack E-Commerce Web Application developed for the Software Architecture course project.  
Stage 2 extends the initial Stage 1 prototype by introducing a layered backend architecture, persistent SQLite database integration, order management workflows, payment simulation, stock management, and advanced admin/customer operations.

The system supports both Customer and Admin roles and demonstrates the practical implementation of software architecture concepts using the 4+1 Architectural View Model.

---

# 🚀 Features

## 👤 Customer Features

- Register & Login
- Forgot Password with Security Answer
- View Products
- Add Products to Cart
- Remove Products from Cart
- Place Orders
- Cancel Pending Orders
- View Profile Information
- View Order History and Order Status

---

## 🛠️ Admin Features

- Add New Products
- Delete Products
- Update Product Stock
- View Pending Orders
- View Order Details
- Approve Orders
- Reject Orders with Reject Reason

---

# 🧱 Architecture

The system follows a layered backend architecture:

```text
Frontend (HTML/CSS/JavaScript)
        ↓
Controllers
        ↓
Services
        ↓
Models
        ↓
SQLite Databas
