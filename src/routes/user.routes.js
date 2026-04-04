const express = require("express");
const router = express.Router();

const { authenticate, authorize } = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");

router.use(authenticate);
router.use(authorize("ADMIN"));

router.get("/", userController.getAllUsers);

router.patch("/:id/role", userController.updateUserRole);
router.patch("/:id/status", userController.updateUserStatus);

module.exports = router;