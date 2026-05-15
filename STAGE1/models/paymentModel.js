const payments = [];

function processPayment(orderId, amount, method = "Fake Card") {
    const payment = {
        id: payments.length + 1,
        orderId: orderId,
        amount: amount,
        method: method,
        status: "Completed"
    };

    payments.push(payment);
    return payment;
}

function getPaymentByOrderId(orderId) {
    return payments.find(payment => payment.orderId === Number(orderId));
}

module.exports = {
    processPayment,
    getPaymentByOrderId
};