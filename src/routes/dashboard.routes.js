const express = require("express");
const router = express.Router();

const { authenticate, authorize } = require("../middlewares/auth.middleware");
const dashboardController = require("../controllers/dashboard.controller");

router.use(authenticate);

router.get("/summary", authorize("VIEWER", "ANALYST", "ADMIN"),dashboardController.getSummary);

module.exports = router;