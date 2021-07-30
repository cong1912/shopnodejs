const express = require("express");
const discountController = require("./../controllers/discountController");
const checkoutController = require("./../controllers/checkoutController");
const router = express.Router();

router.post("/", checkoutController.store);

module.exports = router;
