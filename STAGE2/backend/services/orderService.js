const OrderModel = require("../models/orderModel");
const PaymentModel = require("../models/paymentModel");
const CartModel = require("../models/cartModel");

function createOrder(userId) {
    const cart = CartModel.getCart(userId);

    if (!cart || cart.length === 0) {
        return {
            status: 400,
            message: "Cart is empty"
        };
    }

    let totalAmount = 0;

    cart.forEach(item => {
        totalAmount += item.price * item.quantity;
    });

    const temporaryOrderId = Date.now();

    const payment = PaymentModel.processPayment(
        temporaryOrderId,
        totalAmount,
        "Fake Card"
    );

    const order = OrderModel.createOrder(userId, cart, payment);

    CartModel.clearCart(userId);

    return {
        status: 201,
        message: "Order created successfully with fake payment",
        order
    };
}

function getUserOrders(userId) {
    return OrderModel.getOrdersByUser(userId);
}

function getAllOrders() {
    return OrderModel.getAllOrders();
}

function approveOrder(orderId) {
    const order = OrderModel.approveOrder(orderId);

    if (order === null) {
        return {
            status: 404,
            message: "Order not found"
        };
    }

    if (order === false) {
        return {
            status: 400,
            message: "Only pending orders can be approved"
        };
    }

    return {
        status: 200,
        message: "Order approved successfully",
        order
    };
}

function rejectOrder(orderId, reason) {
    const order = OrderModel.rejectOrder(orderId, reason);

    if (order === null) {
        return {
            status: 404,
            message: "Order not found"
        };
    }

    if (order === false) {
        return {
            status: 400,
            message: "Only pending orders can be rejected"
        };
    }

    return {
        status: 200,
        message: "Order rejected successfully",
        order
    };
}

function cancelOrder(orderId) {
    const order = OrderModel.cancelOrder(orderId);

    if (order === null) {
        return {
            status: 404,
            message: "Order not found"
        };
    }

    if (order === false) {
        return {
            status: 400,
            message: "Only pending orders can be cancelled"
        };
    }

    return {
        status: 200,
        message: "Order cancelled successfully",
        order
    };
}

module.exports = {
    createOrder,
    getUserOrders,
    getAllOrders,
    approveOrder,
    rejectOrder,
    cancelOrder
};