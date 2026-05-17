const API_URL = "http://localhost:3000/api";

// LOGIN
const loginForm = document.getElementById("login-form");

if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })
        .then(res => res.json())
        .then(data => {
            document.getElementById("message").innerText = data.message;

            if (data.message === "Login successful") {
                localStorage.setItem("userId", data.user.id);
                localStorage.setItem("userName", data.user.name);
                localStorage.setItem("userEmail", data.user.email);
                localStorage.setItem("userRole", data.user.role);

                if (data.user.role === "admin") {
                    window.location.href = "admin.html";
                } else {
                    window.location.href = "products.html";
                }
            }
        })
        .catch(() => {
            document.getElementById("message").innerText =
                "Connection error (backend is not running)";
        });
    });
}

// REGISTER
const registerForm = document.getElementById("register-form");

if (registerForm) {
    registerForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("reg-email").value;
        const password = document.getElementById("reg-password").value;

        fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        })
        .then(res => res.json())
        .then(data => {
            alert(data.message);

            if (data.message === "Registration successful") {
                window.location.href = "index.html";
            }
        })
        .catch(() => {
            alert("Connection error (backend is not running)");
        });
    });
}