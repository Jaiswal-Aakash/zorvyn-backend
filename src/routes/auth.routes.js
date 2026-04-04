const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();
const {register,login} = require("../controllers/auth.controller");

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100000,
    skip: (req) => req.ip === "127.0.0.1" || req.ip === "::1",
    message: "Too many requests, please try again later.",
});

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);

module.exports = router;

