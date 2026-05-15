const db = require("../database/database");

function getProducts() {
    return db.prepare("SELECT * FROM products").all();
}

function getProductById(id) {
    return db.prepare("SELECT * FROM products WHERE id = ?").get(id);
}

function addProduct(name, price, stock) {
    const stmt = db.prepare(`
        INSERT INTO products (name, price, stock)
        VALUES (?, ?, ?)
    `);

    const result = stmt.run(
        name,
        Number(price),
        Number(stock)
    );

    return {
        id: result.lastInsertRowid,
        name,
        price: Number(price),
        stock: Number(stock)
    };
}

function deleteProduct(id) {
    const stmt = db.prepare(`
        DELETE FROM products
        WHERE id = ?
    `);

    const result = stmt.run(id);

    return result.changes > 0;
}

function decreaseStock(productId, quantity) {
    const product = getProductById(productId);

    if (!product) {
        return false;
    }

    if (product.stock < quantity) {
        return false;
    }

    db.prepare(`
        UPDATE products
        SET stock = stock - ?
        WHERE id = ?
    `).run(
        Number(quantity),
        productId
    );

    return true;
}

function increaseStock(productId, quantity) {
    const product = getProductById(productId);

    if (!product) {
        return false;
    }

    db.prepare(`
        UPDATE products
        SET stock = stock + ?
        WHERE id = ?
    `).run(
        Number(quantity),
        productId
    );

    return true;
}

function updateStock(id, stock) {
    const product = getProductById(id);

    if (!product) {
        return null;
    }

    db.prepare(`
        UPDATE products
        SET stock = ?
        WHERE id = ?
    `).run(
        Number(stock),
        id
    );

    return getProductById(id);
}

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    deleteProduct,
    decreaseStock,
    increaseStock,
    updateStock
};