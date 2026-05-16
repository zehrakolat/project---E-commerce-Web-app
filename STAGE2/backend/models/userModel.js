const db = require("../database/database");

function createUser(name, email, password, securityAnswer) {

    const stmt = db.prepare(`
        INSERT INTO users
        (name, email, password, securityAnswer, role)
        VALUES (?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
        name,
        email,
        password,
        securityAnswer,
        "customer"
    );

    return {
        id: result.lastInsertRowid,
        name,
        email,
        role: "customer"
    };
}

function findUserByEmail(email) {

    const stmt = db.prepare(`
        SELECT * FROM users
        WHERE email = ?
    `);

    return stmt.get(email);
}

function updatePassword(email, securityAnswer, newPassword) {

    const user = findUserByEmail(email);

    if (!user) {
        return null;
    }

    if (user.securityAnswer !== securityAnswer) {
        return false;
    }

    const stmt = db.prepare(`
        UPDATE users
        SET password = ?
        WHERE email = ?
    `);

    stmt.run(newPassword, email);

    return {
        ...user,
        password: newPassword
    };
}

module.exports = {
    createUser,
    findUserByEmail,
    updatePassword
};