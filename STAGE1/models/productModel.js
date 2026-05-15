const products = [
    { id: 1, name: "Laptop", price: 1500, stock: 5 },
    { id: 2, name: "Phone", price: 900, stock: 3 },
    { id: 3, name: "Headphones", price: 100, stock: 10 }
];

function getAllProducts() {
    return products;
}

function findProductById(id) {
    return products.find(product => product.id === Number(id));
}

function addProduct(name, price, stock) {
    const product = {
        id: products.length + 1,
        name: name,
        price: Number(price),
        stock: Number(stock)
    };

    products.push(product);
    return product;
}

function deleteProduct(id) {
    const index = products.findIndex(product => product.id === Number(id));

    if (index === -1) {
        return null;
    }

    const deletedProduct = products.splice(index, 1);
    return deletedProduct[0];
}

function decreaseStock(productId) {
    const product = findProductById(productId);

    if (!product || product.stock <= 0) {
        return false;
    }

    product.stock -= 1;
    return true;
}

module.exports = {
    getAllProducts,
    findProductById,
    addProduct,
    deleteProduct,
    decreaseStock
};