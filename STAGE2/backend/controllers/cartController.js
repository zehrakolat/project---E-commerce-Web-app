const CartService = require("../services/cartService");

function addToCart(req, res) {
    const { userId, productId } = req.body;

    const result = CartService.addToCart(userId, productId);

    res.status(result.status).json({
        message: result.message
    });
}

function getCart(req, res) {
    const { userId } = req.params;

    const cart = CartService.getCart(userId);

    res.status(200).json(cart);
}

function removeFromCart(req, res) {
    const { userId, productId } = req.body;

    const result = CartService.removeFromCart(userId, productId);

    res.status(result.status).json({
        message: result.message
    });
}

module.exports = {
    addToCart,
    getCart,
    removeFromCart
};