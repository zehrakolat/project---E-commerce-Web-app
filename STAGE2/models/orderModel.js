const db = require("../database/database");

function createOrder(userId, cartItems, payment) {
    const totalAmount = payment.amount;

    const orderStmt = db.prepare(`
        INSERT INTO orders (userId, status, reason, totalAmount)
        VALUES (?, ?, ?, ?)
    `);

    const orderResult = orderStmt.run(
        userId,
        "Pending Approval",
        null,
        totalAmount
    );

    const orderId = orderResult.lastInsertRowid;

    const itemStmt = db.prepare(`
        INSERT INTO order_items
        (orderId, productId, name, price, quantity)
        VALUES (?, ?, ?, ?, ?)
    `);

    cartItems.forEach(item => {
        itemStmt.run(
            orderId,
            item.id,
            item.name,
            item.price,
            item.quantity
        );
    });

    db.prepare(`
        UPDATE payments
        SET orderId = ?
        WHERE id = ?
    `).run(orderId, payment.id);

    return getOrderById(orderId);
}

function getOrderById(orderId) {
    const order = db.prepare(`
        SELECT * FROM orders
        WHERE id = ?
    `).get(orderId);

    if (!order) {
        return null;
    }

    const items = db.prepare(`
        SELECT 
            productId AS id,
            name,
            price,
            quantity
        FROM order_items
        WHERE orderId = ?
    `).all(orderId);

    const payment = db.prepare(`
        SELECT * FROM payments
        WHERE orderId = ?
    `).get(orderId);

    return {
        ...order,
        items,
        payment
    };
}

function getOrdersByUser(userId) {
    const orders = db.prepare(`
        SELECT * FROM orders
        WHERE userId = ?
    `).all(userId);

    return orders.map(order => getOrderById(order.id));
}

function getAllOrders() {
    const orders = db.prepare(`
        SELECT * FROM orders
    `).all();

    return orders.map(order => getOrderById(order.id));
}

function approveOrder(orderId) {
    const order = getOrderById(orderId);

    if (!order) {
        return null;
    }

    if (order.status !== "Pending Approval") {
        return false;
    }

    db.prepare(`
        UPDATE orders
        SET status = ?
        WHERE id = ?
    `).run("Approved", orderId);

    return getOrderById(orderId);
}

function rejectOrder(orderId, reason) {
    const order = getOrderById(orderId);

    if (!order) {
        return null;
    }

    if (order.status !== "Pending Approval") {
        return false;
    }

    db.prepare(`
        UPDATE orders
        SET status = ?, reason = ?
        WHERE id = ?
    `).run("Rejected", reason, orderId);

    return getOrderById(orderId);
}

function cancelOrder(orderId) {
    const order = getOrderById(orderId);

    if (!order) {
        return null;
    }

    if (order.status !== "Pending Approval") {
        return false;
    }

    db.prepare(`
        UPDATE orders
        SET status = ?
        WHERE id = ?
    `).run("Cancelled by Customer", orderId);

    return getOrderById(orderId);
}

module.exports = {
    createOrder,
    getOrdersByUser,
    getAllOrders,
    approveOrder,
    rejectOrder,
    cancelOrder
};