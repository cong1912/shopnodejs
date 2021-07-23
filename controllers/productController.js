const Product = require("./../models/productModel");
const factory = require("./handlerFactory");

exports.setCategoryIds = (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productId;
  next();
};
exports.getAllProducts = factory.getAll(Product);
exports.getProduct = factory.getOne(Product);
exports.createProduct = factory.createOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);
