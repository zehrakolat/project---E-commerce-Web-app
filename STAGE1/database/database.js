// Simple in-memory database

const database = {
    users: [],
    products: [
        { id: 1, name: "Laptop", price: 1500 },
        { id: 2, name: "Phone", price: 900 },
        { id: 3, name: "Headphones", price: 100 }
    ],
    carts: {}
};

module.exports = database;