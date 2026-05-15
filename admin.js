const API_URL = "http://localhost:3000/api";
const userRole = localStorage.getItem("userRole");

if (userRole !== "admin") {
    alert("Access denied. Admin only.");
    window.location.href = "index.html";
}

function loadAdminProducts() {
    fetch(`${API_URL}/products`)
        .then(res => res.json())
        .then(products => {
            const list = document.getElementById("admin-product-list");
            list.innerHTML = "";

            products.forEach(product => {
                list.innerHTML += `
                    <div class="product-card">
                        <h3>${product.name}</h3>
                        <p>Price: $${product.price}</p>
                        <p>Stock: ${product.stock}</p>
                        <button onclick="deleteProduct(${product.id})">Delete</button>
                    </div>
                `;
            });
        });
}

document.getElementById("add-product-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("product-name").value;
    const price = Number(document.getElementById("product-price").value);
    const stock = Number(document.getElementById("product-stock").value);

    fetch(`${API_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, stock })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        loadAdminProducts();
        document.getElementById("add-product-form").reset();
    });
});

function deleteProduct(productId) {
    fetch(`${API_URL}/products/${productId}`, {
        method: "DELETE"
    })
    .then(data => {
    alert(data.message);
    loadAdminProducts();
    document.getElementById("add-product-form").reset();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
}

function loadOrders() {
    fetch(`${API_URL}/admin/orders`)
        .then(res => res.json())
        .then(orders => {
            const orderList = document.getElementById("order-list");
            orderList.innerHTML = "";

            if (orders.length === 0) {
                orderList.innerHTML = "<p>No orders yet</p>";
                return;
            }

            orders.forEach(order => {
                orderList.innerHTML += `
                    <div class="product-card">
                        <h3>Order #${order.id}</h3>
                        <p>User ID: ${order.userId}</p>
                        <p>Status: ${order.status}</p>
                        <p>Payment: ${order.payment.status}</p>
                        <p>Total: $${order.payment.amount}</p>

                        <button onclick="approveOrder(${order.id})">Approve</button>
                        <button onclick="rejectOrder(${order.id})">Reject</button>
                    </div>
                `;
            });
        });
}

function approveOrder(orderId) {
    fetch(`${API_URL}/admin/orders/${orderId}`, {
        method: "PUT"
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        loadOrders();
    });
}

function rejectOrder(orderId) {
    const reason = prompt("Enter reject reason:");

    if (!reason) {
        alert("Reject reason is required");
        return;
    }

    fetch(`${API_URL}/admin/orders/${orderId}/reject`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            reason: reason
        })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        loadOrders();
    });
}

function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}

loadAdminProducts();
loadOrders();