const db = require("../database/database");

function addToCart(userId, product) {
    const existingItem = db.prepare(`
        SELECT * FROM carts
        WHERE userId = ? AND productId = ?
    `).get(userId, product.id);

    if (existingItem) {
        db.prepare(`
            UPDATE carts
            SET quantity = quantity + 1
            WHERE userId = ? AND productId = ?
        `).run(userId, product.id);

        return getCart(userId).find(item => item.id === product.id);
    }

    db.prepare(`
        INSERT INTO carts (userId, productId, quantity)
        VALUES (?, ?, ?)
    `).run(userId, product.id, 1);

    return {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
    };
}

function getCart(userId) {
    return db.prepare(`
        SELECT 
            products.id,
            products.name,
            products.price,
            carts.quantity
        FROM carts
        JOIN products ON carts.productId = products.id
        WHERE carts.userId = ?
    `).all(userId);
}

function removeFromCart(userId, productId) {
    const item = db.prepare(`
        SELECT * FROM carts
        WHERE userId = ? AND productId = ?
    `).get(userId, productId);

    if (!item) {
        return null;
    }

    if (item.quantity > 1) {
        db.prepare(`
            UPDATE carts
            SET quantity = quantity - 1
            WHERE userId = ? AND productId = ?
        `).run(userId, productId);

        return item;
    }

    db.prepare(`
        DELETE FROM carts
        WHERE userId = ? AND productId = ?
    `).run(userId, productId);

    return item;
}

function clearCart(userId) {
    db.prepare(`
        DELETE FROM carts
        WHERE userId = ?
    `).run(userId);
}

module.exports = {
    addToCart,
    getCart,
    removeFromCart,
    clearCart
};