const express = require("express");
const authController = require("./../controllers/authController");
const productController = require("./../controllers/productController");
const Product = require("./../models/productModel");
const router = express.Router({ mergeParams: true });

router.use(authController.protect);
router
  .route("/")
  .get(productController.getAllProducts)
  .post(
    authController.restrictTo("admin", "lead-guide"),
    productController.setCategoryIds,
    productController.createProduct
  );
router.route("/:id").get(productController.getProduct);
//   .delete(
//     authController.restrictTo("admin", "lead-guide"),
//     productController.deleteProduct
//   )
//   .patch(
//     authController.restrictTo("admin", "lead-guide"),
//     productController.updateProduct
//   );
module.exports = router;
