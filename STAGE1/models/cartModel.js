 const carts = {};

function addToCart(userId, product) {
    if (!carts[userId]) {
        carts[userId] = [];
    }

    const userCart = carts[userId];

    const existingItem = userCart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
        return existingItem;
    }

    const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
    };

    userCart.push(cartItem);
    return cartItem;
}

function getCart(userId) {
    return carts[userId] || [];
}

function removeFromCart(userId, productId) {
    const userCart = carts[userId];

    if (!userCart) {
        return null;
    }

    const item = userCart.find(item => item.id === Number(productId));

    if (!item) {
        return null;
    }

    if (item.quantity > 1) {
        item.quantity -= 1;
        return item;
    }

    const index = userCart.findIndex(item => item.id === Number(productId));
    const removedItem = userCart.splice(index, 1);

    return removedItem[0];
}
function clearCart(userId) {
    carts[userId] = [];
}

module.exports = {
    addToCart,
    getCart,
    removeFromCart,
    clearCart
};