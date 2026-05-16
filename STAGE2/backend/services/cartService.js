const CartModel = require("../models/cartModel");
const ProductModel = require("../models/productModel");

function addToCart(userId, productId) {
    const product = ProductModel.getProductById(productId);

    if (!product) {
        return {
            status: 404,
            message: "Product not found"
        };
    }

    if (product.stock <= 0) {
        return {
            status: 400,
            message: "Product is out of stock"
        };
    }

    CartModel.addToCart(userId, product);

    ProductModel.decreaseStock(productId, 1);

    return {
        status: 200,
        message: "Product added to cart"
    };
}

function getCart(userId) {
    return CartModel.getCart(userId);
}

function removeFromCart(userId, productId) {
    const removedItem = CartModel.removeFromCart(userId, productId);

    if (!removedItem) {
        return {
            status: 404,
            message: "Product not found in cart"
        };
    }

    ProductModel.increaseStock(productId, 1);

    return {
        status: 200,
        message: "Product removed from cart"
    };
}

module.exports = {
    addToCart,
    getCart,
    removeFromCart
};