const API_URL = "http://localhost:3000/api";

const userId = localStorage.getItem("userId");
const userName = localStorage.getItem("userName");
const userEmail = localStorage.getItem("userEmail");

if (!userId) {
    alert("Please login first");
    window.location.href = "index.html";
}

function showSection(section) {
    document.getElementById("products-section").style.display = "none";
    document.getElementById("cart-section").style.display = "none";
    document.getElementById("profile-section").style.display = "none";

    if (section === "products") {
        document.getElementById("products-section").style.display = "block";
        loadProducts();
    }

    if (section === "cart") {
    document.getElementById("cart-section").style.display = "block";
    loadCart();
    loadOrders();
}

    if (section === "profile") {
        document.getElementById("profile-section").style.display = "block";
        loadProfile();
    }
}

function loadProfile() {
    fetch(`${API_URL}/cart/${userId}`)
        .then(res => res.json())
        .then(cart => {
            let totalItems = 0;
            let totalPrice = 0;

            cart.forEach(item => {
                totalItems += item.quantity;
                totalPrice += item.price * item.quantity;
            });

            fetch(`${API_URL}/orders/${userId}`)
                .then(res => res.json())
                .then(orders => {
                    let orderHistory = "";

                    if (orders.length === 0) {
                        orderHistory = "<p>No order history yet.</p>";
                    } else {
                        orders.forEach(order => {
                            orderHistory += `
                                <div class="cart-item">
                                    <p><strong>Order #${order.id}</strong></p>
                                    <p>Status: ${order.status}</p>
                                    <p>Total: $${order.payment.amount}</p>
                                    ${order.reason ? `
                                        <p style="color:red;">
                                            <strong>Reject Reason:</strong> ${order.reason}
                                        </p>
                                    ` : ""}
                                </div>
                            `;
                        });
                    }

                    document.getElementById("profile-info").innerHTML = `
                        <div class="profile-card">
                            <img src="https://i.pravatar.cc/100?u=${userId}" style="border-radius:50%; margin-bottom:10px;">
                            <h3>👤 ${userName}</h3>
                            <p><strong>Email:</strong> ${userEmail}</p>
                            <p><strong>User ID:</strong> ${userId}</p>

                            <hr>

                            <p>🛒 Total Items in Cart: <strong>${totalItems}</strong></p>
                            <p>💰 Total Cart Value: <strong>$${totalPrice}</strong></p>

                            <hr>

                            <h3>Order History</h3>
                            ${orderHistory}
                        </div>
                    `;
                });
        });
}

function loadProducts() {
    fetch(`${API_URL}/products`)
        .then(res => res.json())
        .then(products => {
            const productList = document.getElementById("product-list");
            productList.innerHTML = "";

            products.forEach(product => {
                productList.innerHTML += `
                    <div class="product-card">
                        <h3>${product.name}</h3>
                        <p>Price: $${product.price}</p>
                        <p>Stock: ${product.stock}</p>
                        <button onclick="addToCart(${product.id})"
                            ${product.stock <= 0 ? "disabled" : ""}>
                            ${product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
                        </button>
                    </div>
                `;
            });
        });
}

function addToCart(productId) {
    fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            productId: productId,
            userId: userId
        })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        loadProducts();
        loadCart();
    });
}

function loadCart() {
    fetch(`${API_URL}/cart/${userId}`)
        .then(res => res.json())
        .then(cart => {
            const cartList = document.getElementById("cart-list");
            cartList.innerHTML = "";

            if (cart.length === 0) {
                cartList.innerHTML = "<p>Your cart is empty.</p>";
                return;
            }

            let total = 0;

            cart.forEach(item => {
                total += item.price * item.quantity;

                cartList.innerHTML += `
                    <div class="cart-item">
                        <p>${item.name} - $${item.price} - Quantity: ${item.quantity}</p>
                        <button onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                `;
            });

            cartList.innerHTML += `<h3>Total: $${total}</h3>`;
        });
}

function removeFromCart(productId) {
    fetch(`${API_URL}/cart`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            productId: productId,
            userId: userId
        })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        loadProducts();
        loadCart();
    });
}

function goBack() {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    window.location.href = "index.html";
}


function placeOrder() {
    fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: userId
        })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        loadCart();
        loadOrders();
    });
}

function loadOrders() {
    fetch(`${API_URL}/orders/${userId}`)
        .then(res => res.json())
        .then(orders => {
            const orderList = document.getElementById("order-list");
            orderList.innerHTML = "";

            const pendingOrders = orders.filter(order => order.status === "Pending Approval");

            if (pendingOrders.length === 0) {
                orderList.innerHTML = "<p>No pending orders.</p>";
                return;
            }

            pendingOrders.forEach(order => {
                orderList.innerHTML += `
                    <div class="cart-item">
                        <p>Order #${order.id}</p>
                        <p>Status: ${order.status}</p>
                        <p>Do you want to cancel this order?</p>
                        <button onclick="cancelOrder(${order.id})">Cancel Order</button>
                    </div>
                `;
            });
        });
}
function cancelOrder(orderId) {
    const confirmCancel = confirm("Do you want to cancel this order?");

    if (!confirmCancel) {
        return;
    }

    fetch(`${API_URL}/orders/${orderId}/cancel`, {
        method: "PUT"
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        loadOrders();
        loadProfile();
    });
}

showSection("products");