const Discount = require("./../models/discountModel");
const factory = require("./handlerFactory");

exports.getAllDiscounts = factory.getAll(Discount);
exports.getDiscount = factory.getOne(Discount);
exports.createDiscount = factory.createOne(Discount);
exports.updateDiscount = factory.updateOne(Discount);
exports.deleteDiscount = factory.deleteOne(Discount);
