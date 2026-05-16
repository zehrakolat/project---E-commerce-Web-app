const OrderService = require("../services/orderService");

function createOrder(req, res) {
    const { userId } = req.body;

    const result = OrderService.createOrder(userId);

    res.status(result.status).json({
        message: result.message,
        order: result.order
    });
}

function getUserOrders(req, res) {
    const { userId } = req.params;

    const orders = OrderService.getUserOrders(userId);

    res.status(200).json(orders);
}

function getAllOrders(req, res) {
    const orders = OrderService.getAllOrders();

    res.status(200).json(orders);
}

function approveOrder(req, res) {
    const { id } = req.params;

    const result = OrderService.approveOrder(id);

    res.status(result.status).json({
        message: result.message,
        order: result.order
    });
}

function rejectOrder(req, res) {
    const { id } = req.params;
    const { reason } = req.body;

    const result = OrderService.rejectOrder(id, reason);

    res.status(result.status).json({
        message: result.message,
        order: result.order
    });
}

function cancelOrder(req, res) {
    const { id } = req.params;

    const result = OrderService.cancelOrder(id);

    res.status(result.status).json({
        message: result.message,
        order: result.order
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