const OrderModel = require("../models/orderModel");
const PaymentModel = require("../models/paymentModel");
const CartModel = require("../models/cartModel");

function createOrder(req, res) {
    const { userId } = req.body;

    const cart = CartModel.getCart(userId);

    if (!cart || cart.length === 0) {
        return res.status(400).json({
            message: "Cart is empty"
        });
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

    res.status(201).json({
        message: "Order created successfully with fake payment",
        order: order
    });
}

function getUserOrders(req, res) {
    const { userId } = req.params;
    const orders = OrderModel.getOrdersByUser(userId);

    res.status(200).json(orders);
}

function getAllOrders(req, res) {
    const orders = OrderModel.getAllOrders();

    res.status(200).json(orders);
}

function approveOrder(req, res) {
    const { id } = req.params;

    const order = OrderModel.approveOrder(id);

    if (!order) {
        return res.status(404).json({
            message: "Order not found"
        });
    }

    res.status(200).json({
        message: "Order approved successfully",
        order: order
    });
}

function rejectOrder(req, res) {
    const { id } = req.params;
    const { reason } = req.body;

    const order = OrderModel.rejectOrder(id, reason);

    if (!order) {
        return res.status(404).json({
            message: "Order not found"
        });
    }

    res.status(200).json({
        message: "Order rejected successfully",
        order: order
    });
}

function cancelOrder(req, res) {
    const { id } = req.params;

    const order = OrderModel.cancelOrder(id);

    if (order === null) {
        return res.status(404).json({
            message: "Order not found"
        });
    }

    if (order === false) {
        return res.status(400).json({
            message: "Only pending orders can be cancelled"
        });
    }

    res.status(200).json({
        message: "Order cancelled successfully",
        order: order
    });
}

module.exports = {
    createOrder,
    getUserOrders,
    getAllOrders,
    approveOrder,
    rejectOrder,
    cancelOrder
};