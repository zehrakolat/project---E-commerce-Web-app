const express = require("express");
const cors = require("cors");

const authController = require("./controllers/authController");
const productController = require("./controllers/productController");
const cartController = require("./controllers/cartController");
const orderController = require("./controllers/orderController"); // 🔥 YENİ

const app = express();

app.use(cors());
app.use(express.json());

/* ================= AUTH ================= */
app.post("/api/register", authController.register);
app.post("/api/login", authController.login);
app.post("/api/forgot-password", authController.forgotPassword);

/* ================= PRODUCTS ================= */
app.get("/api/products", productController.getProducts);
app.post("/api/products", productController.addProduct);
app.delete("/api/products/:id", productController.deleteProduct);

/* ================= CART ================= */
app.post("/api/cart", cartController.addToCart);
app.get("/api/cart/:userId", cartController.getCart);
app.delete("/api/cart", cartController.removeFromCart);

/* ================= ORDERS (STAGE 2) ================= */

// create order + fake payment
app.post("/api/orders", orderController.createOrder);

// get orders of a user
app.get("/api/orders/:userId", orderController.getUserOrders);

// admin: get all orders
app.get("/api/admin/orders", orderController.getAllOrders);

// admin: approve order
app.put("/api/admin/orders/:id", orderController.approveOrder);
app.put("/api/admin/orders/:id/reject", orderController.rejectOrder);

// user: cancel order
app.put("/api/orders/:id/cancel", orderController.cancelOrder);

/* ================= HEALTH ================= */
app.get("/api/health", (req, res) => {
    res.json({ message: "Backend is running" });
});

/* ================= SERVER ================= */
app.listen(3000, () => {
    console.log("Backend server is running on port 3000");
});