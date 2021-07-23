const express = require("express");
const authController = require("./../controllers/authController");
const categoryController = require("./../controllers/categoryController");
const router = express.Router();

router
  .route("/")
  .get(categoryController.getAllCategories)
  .post(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    categoryController.createCategory
  );

router
  .route("/:id")
  .get(categoryController.getCategory)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    categoryController.updateCategory
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    categoryController.deleteCategory
  );

module.exports = router;
