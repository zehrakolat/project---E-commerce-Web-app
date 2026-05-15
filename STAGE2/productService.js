const ProductModel = require("../models/productModel");

function getProducts() {
    return ProductModel.getProducts();
}

function addProduct(name, price, stock) {
    const product = ProductModel.addProduct(name, price, stock);

    return {
        status: 201,
        message: "Product added successfully",
        product
    };
}

function deleteProduct(id) {
    const deleted = ProductModel.deleteProduct(id);

    if (!deleted) {
        return {
            status: 404,
            message: "Product not found"
        };
    }

    return {
        status: 200,
        message: "Product deleted successfully"
    };
}

function updateStock(id, stock) {
    const product = ProductModel.updateStock(id, stock);

    if (!product) {
        return {
            status: 404,
            message: "Product not found"
        };
    }

    return {
        status: 200,
        message: "Stock updated successfully",
        product
    };
}

module.exports = {
    getProducts,
    addProduct,
    deleteProduct,
    updateStock
};