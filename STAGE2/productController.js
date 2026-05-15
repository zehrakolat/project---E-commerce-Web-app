const ProductService = require("../services/productService");

function getProducts(req, res) {
    const products = ProductService.getProducts();

    res.status(200).json(products);
}

function addProduct(req, res) {
    const { name, price, stock } = req.body;

    const result = ProductService.addProduct(name, price, stock);

    res.status(result.status).json({
        message: result.message,
        product: result.product
    });
}

function deleteProduct(req, res) {
    const { id } = req.params;

    const result = ProductService.deleteProduct(id);

    res.status(result.status).json({
        message: result.message
    });
}

function updateStock(req, res) {
    const { id } = req.params;
    const { stock } = req.body;

    const result = ProductService.updateStock(id, stock);

    res.status(result.status).json({
        message: result.message,
        product: result.product
    });
}

module.exports = {
    getProducts,
    addProduct,
    deleteProduct,
    updateStock
};