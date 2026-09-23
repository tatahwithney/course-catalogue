const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const courseRoutes = require("./routes/courseRoutes");
const pageRoutes = require("./routes/pageRoutes");

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.urlencoded({ extended: true }));

// View engine
app.set("view engine", "ejs");

// Page routes
app.use("/", pageRoutes);

// Course routes
app.use("/courses", courseRoutes);

// MongoDB connection
mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });