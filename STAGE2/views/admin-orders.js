const API_URL = "http://localhost:3000/api";

const userRole = localStorage.getItem("userRole");

if (userRole !== "admin") {
    alert("Access denied. Admin only.");
    window.location.href = "index.html";
}

function createOrderCard(order) {

    const paymentStatus = order.payment
        ? order.payment.status
        : "Completed";

    const paymentAmount = order.payment
        ? order.payment.amount
        : order.totalAmount;

    let itemsHtml = "";

    if (order.items && order.items.length > 0) {

        order.items.forEach(item => {

            itemsHtml += `
                <li>
                    ${item.name}
                    x${item.quantity}
                    - $${item.price}
                </li>
            `;
        });
    }

    return `
        <div class="product-card">

            <h3>Order #${order.id}</h3>

            <p><strong>User ID:</strong> ${order.userId}</p>

            <p><strong>Status:</strong> ${order.status}</p>

            <p><strong>Payment:</strong> ${paymentStatus}</p>

            <p><strong>Total:</strong> $${paymentAmount}</p>

            <h4>Order Items</h4>

            <ul class="order-items">
                ${itemsHtml}
            </ul>

            ${order.reason ? `
                <p style="color:red;">
                    <strong>Reject Reason:</strong>
                    ${order.reason}
                </p>
            ` : ""}

            ${order.status === "Pending Approval" ? `

                <button onclick="approveOrder(${order.id})">
                    Approve
                </button>

                <button onclick="rejectOrder(${order.id})">
                    Reject
                </button>

            ` : `

                <p>
                    <strong>Final Status:</strong>
                    ${order.status}
                </p>

            `}
        </div>
    `;
}

function loadOrders() {

    fetch(`${API_URL}/admin/orders`)
        .then(res => res.json())
        .then(orders => {

            const orderList =
                document.getElementById("order-list");

            orderList.innerHTML = "";

            if (!orders || orders.length === 0) {

                orderList.innerHTML =
                    "<p>No orders yet</p>";

                return;
            }

            const pendingOrders = orders.filter(order =>
                order.status === "Pending Approval"
            );

            const historyOrders = orders.filter(order =>
                order.status !== "Pending Approval"
            );

            let pendingHtml = `
                <h2 class="section-title">
                    Pending Orders
                </h2>

                <div class="admin-grid">
            `;

            if (pendingOrders.length === 0) {

                pendingHtml += `
                    <p>No pending orders.</p>
                `;
            }

            pendingOrders.forEach(order => {

                pendingHtml += createOrderCard(order);
            });

            pendingHtml += `</div>`;

            let historyHtml = `
                <h2 class="section-title">
                    Order History
                </h2>

                <div class="admin-grid">
            `;

            if (historyOrders.length === 0) {

                historyHtml += `
                    <p>No order history.</p>
                `;
            }

            historyOrders.forEach(order => {

                historyHtml += createOrderCard(order);
            });

            historyHtml += `</div>`;

            orderList.innerHTML =
                pendingHtml + historyHtml;
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
            reason
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

loadOrders();