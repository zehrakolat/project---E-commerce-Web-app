const ProductModel = require("../models/productModel");
const CartModel = require("../models/cartModel");

function addToCart(req, res) {
    const { productId, userId } = req.body;

    const product = ProductModel.findProductById(productId);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    if (product.stock <= 0) {
        return res.status(400).json({
            message: "Product is out of stock"
        });
    }

    const cartItem = CartModel.addToCart(userId, product);
    ProductModel.decreaseStock(productId);

    res.status(200).json({
        message: "Product added to cart",
        cartItem: cartItem
    });
}

function getCart(req, res) {
    const { userId } = req.params;
    const cart = CartModel.getCart(userId);

    res.status(200).json(cart);
}

function removeFromCart(req, res) {
    const { productId, userId } = req.body;

    const removedItem = CartModel.removeFromCart(userId, productId);

    if (!removedItem) {
        return res.status(404).json({
            message: "Product not found in cart"
        });
    }

    res.status(200).json({
        message: "Product removed from cart",
        removedItem: removedItem
    });
}

module.exports = {
    addToCart,
    getCart,
    removeFromCart
};