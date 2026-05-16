const db = require("../database/database");

function processPayment(orderId, amount, method = "Fake Card") {
    const stmt = db.prepare(`
        INSERT INTO payments (orderId, amount, method, status)
        VALUES (?, ?, ?, ?)
    `);

    const result = stmt.run(orderId, amount, method, "Completed");

    return {
        id: result.lastInsertRowid,
        orderId,
        amount,
        method,
        status: "Completed"
    };
}

function getPaymentByOrderId(orderId) {
    return db.prepare(`
        SELECT * FROM payments
        WHERE orderId = ?
    `).get(orderId);
}

module.exports = {
    processPayment,
    getPaymentByOrderId
};