const Database = require("better-sqlite3");

const db = new Database("database.db");

db.exec(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    securityAnswer TEXT,
    role TEXT DEFAULT 'customer'
);

CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    stock INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS carts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    productId INTEGER NOT NULL,
    quantity INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    status TEXT NOT NULL,
    reason TEXT,
    totalAmount REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    orderId INTEGER NOT NULL,
    productId INTEGER NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    quantity INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    orderId INTEGER NOT NULL,
    amount REAL NOT NULL,
    method TEXT NOT NULL,
    status TEXT NOT NULL
);
`);

const admin = db.prepare(
    "SELECT * FROM users WHERE email = ?"
).get("admin@test.com");

if (!admin) {
    db.prepare(`
        INSERT INTO users
        (name, email, password, securityAnswer, role)
        VALUES (?, ?, ?, ?, ?)
    `).run(
        "Admin",
        "admin@test.com",
        "admin123",
        "admin",
        "admin"
    );
}

const productCount = db.prepare(
    "SELECT COUNT(*) AS count FROM products"
).get();

if (productCount.count === 0) {

    db.prepare(`
        INSERT INTO products (name, price, stock)
        VALUES (?, ?, ?)
    `).run("Laptop", 1500, 5);

    db.prepare(`
        INSERT INTO products (name, price, stock)
        VALUES (?, ?, ?)
    `).run("Phone", 900, 3);

    db.prepare(`
        INSERT INTO products (name, price, stock)
        VALUES (?, ?, ?)
    `).run("Headphones", 100, 10);
}

module.exports = db;