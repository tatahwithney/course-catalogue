const express = require("express");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));

// View engine
app.set("view engine", "ejs");

// Home route
app.get("/", (req, res) => {
    res.render("home");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});