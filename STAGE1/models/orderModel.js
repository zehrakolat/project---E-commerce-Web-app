const orders = [];

function createOrder(userId, cartItems, payment) {
    const copiedItems = cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
    }));

    const order = {
        id: orders.length + 1,
        userId: userId,
        items: copiedItems,
        payment: payment,
        status: "Pending Approval"
    };

    orders.push(order);
    return order;
}

function getOrdersByUser(userId) {
    return orders.filter(order => order.userId == userId);
}

function getAllOrders() {
    return orders;
}

function approveOrder(orderId) {
    const order = orders.find(order => order.id === Number(orderId));

    if (!order) {
        return null;
    }

    order.status = "Approved";
    return order;
}

function rejectOrder(orderId, reason) {
    const order = orders.find(order => order.id === Number(orderId));

    if (!order) {
        return null;
    }

    order.status = "Rejected";
    order.reason = reason;

    return order;
}

function cancelOrder(orderId) {
    const order = orders.find(order => order.id === Number(orderId));

    if (!order) {
        return null;
    }

    if (order.status !== "Pending Approval") {
        return false;
    }

    order.status = "Cancelled by Customer";
    return order;
}



module.exports = {
    createOrder,
    getOrdersByUser,
    getAllOrders,
    approveOrder,
    rejectOrder,
    cancelOrder
};