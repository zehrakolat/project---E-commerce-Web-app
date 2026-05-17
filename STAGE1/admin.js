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

function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}

loadAdminProducts();