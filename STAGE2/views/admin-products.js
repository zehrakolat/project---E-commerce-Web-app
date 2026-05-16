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

            const list =
                document.getElementById(
                    "admin-product-list"
                );

            list.innerHTML = "";

            products.forEach(product => {

                list.innerHTML += `

                    <div class="product-card">

                        <h3>
                            ${product.name}
                        </h3>

                        <p>
                            Price: $${product.price}
                        </p>

                        <p>
                            Stock: ${product.stock}
                        </p>

                        <input 
                            type="number" 
                            id="stock-${product.id}" 
                            placeholder="New Stock"
                        >

                        <button 
                            onclick="updateStock(${product.id})">

                            Update Stock

                        </button>

                        <button 
                            onclick="deleteProduct(${product.id})">

                            Delete Product

                        </button>

                    </div>
                `;
            });
        });
}

function loadPendingOrderCount() {

    fetch(`${API_URL}/admin/orders`)

        .then(res => res.json())

        .then(orders => {

            const pendingCount = orders.filter(order =>

                order.status ===
                "Pending Approval"

            ).length;

            const ordersBtn =
                document.getElementById(
                    "orders-btn"
                );

            if (pendingCount > 0) {

                ordersBtn.innerHTML =
                    `Orders (${pendingCount})`;

            } else {

                ordersBtn.innerHTML =
                    `Orders`;
            }
        });
}

document.getElementById("add-product-form")

    .addEventListener("submit", function(e) {

        e.preventDefault();

        const name =
            document.getElementById(
                "product-name"
            ).value;

        const price = Number(

            document.getElementById(
                "product-price"
            ).value
        );

        const stock = Number(

            document.getElementById(
                "product-stock"
            ).value
        );

        fetch(`${API_URL}/products`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                price,
                stock
            })
        })

        .then(res => res.json())

        .then(data => {

            alert(data.message);

            loadAdminProducts();

            loadPendingOrderCount();

            document.getElementById(
                "add-product-form"
            ).reset();
        });
});

function deleteProduct(id) {

    fetch(`${API_URL}/products/${id}`, {

        method: "DELETE"
    })

    .then(res => res.json())

    .then(data => {

        alert(data.message);

        loadAdminProducts();
    });
}

function updateStock(productId) {

    const stock = document.getElementById(
        `stock-${productId}`
    ).value;

    fetch(`${API_URL}/products/${productId}/stock`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            stock
        })
    })

    .then(res => res.json())

    .then(data => {

        alert(data.message);

        loadAdminProducts();
    });
}

function logout() {

    localStorage.clear();

    window.location.href = "index.html";
}

loadAdminProducts();

loadPendingOrderCount();