const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware untuk parsing JSON
app.use(bodyParser.json());

// Simulasi Database (hardcoded)
const users = [
    { username: "admin", password: "admin123" },
    { username: "user", password: "user123" },
];

// Halaman Login
app.get('/', (req, res) => {
    res.send(`
        <form action="/login" method="post">
            <label>Username:</label>
            <input type="text" name="username" required><br>
            <label>Password:</label>
            <input type="password" name="password" required><br>
            <button type="submit">Login</button>
        </form>
    `);
});

// Login Endpoint
app.post('/login', bodyParser.urlencoded({ extended: false }), (req, res) => {
    const { username, password } = req.body;

    // Cek bypass (lewati autentikasi jika username = "bypass")
    if (username === "bypass") {
        return res.send("Authentication Bypassed! Welcome, Bypasser.");
    }

    // Validasi User
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        return res.send(`Welcome, ${user.username}`);
    } else {
        return res.send("Invalid username or password.");
    }
});

// Jalankan Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
