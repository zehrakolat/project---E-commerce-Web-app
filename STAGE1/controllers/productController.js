const ProductModel = require("../models/productModel");

function getProducts(req, res) {
    const products = ProductModel.getAllProducts();
    res.status(200).json(products);
}

function addProduct(req, res) {
    const { name, price, stock } = req.body;

    if (!name || !price || stock === undefined) {
        return res.status(400).json({
            message: "Product name, price and stock are required"
        });
    }

    const product = ProductModel.addProduct(name, price, stock);

    res.status(201).json({
        message: "Product added successfully",
        product: product
    });
}

function deleteProduct(req, res) {
    const { id } = req.params;

    const deletedProduct = ProductModel.deleteProduct(id);

    if (!deletedProduct) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.status(200).json({
        message: "Product deleted successfully",
        product: deletedProduct
    });
}

module.exports = {
    getProducts,
    addProduct,
    deleteProduct
};