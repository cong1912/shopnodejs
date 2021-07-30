const express = require("express");
const authController = require("./../controllers/authController");
const discountController = require("./../controllers/discountController");
const router = express.Router();

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    discountController.getAllDiscounts
  )
  .post(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    discountController.createDiscount
  );

router
  .route("/:id")
  .get(discountController.getDiscount)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    discountController.updateDiscount
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    discountController.deleteDiscount
  );

module.exports = router;
