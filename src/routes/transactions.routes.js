const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middlewares/auth.middleware");
const transactionController = require("../controllers/transaction.controller");
router.use(authenticate);


router.get("/", authorize("VIEWER", "ANALYST", "ADMIN"), transactionController.getAllTransactions);
router.post("/", authorize("ANALYST", "ADMIN"), transactionController.createTransaction);
router.put("/:id", authorize("ADMIN"), transactionController.updateTransaction);
router.delete("/:id", authorize("ADMIN"), transactionController.deleteTransaction);

module.exports = router;
