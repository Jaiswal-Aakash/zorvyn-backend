require("dotenv").config();

const express = require("express");

const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");


const app = express();
const authRoutes = require("./routes/auth.routes");
const transactionRoutes = require("./routes/transactions.routes");
const userRoutes = require("./routes/user.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const sanitizeMiddleware = require("./middlewares/sanitize.middleware");

// middleware
app.use(express.json());

app.use(helmet());

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max:100000,
    skip: (req) => req.ip === "127.0.0.1" || req.ip === "::1",
    message: "Too many requests, please try again later.",
});

app.use(limiter);
app.use(sanitizeMiddleware);
app.use(hpp());

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);



module.exports = app;