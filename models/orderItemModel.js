const mongoose = require("mongoose");
const orderItemSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Order",
      required: [true, "Product must belong to a categories,"],
    },
    product_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      // required: [true, "Product must belong to a categories,"],
    },
    quantity: {
      type: Number,
      required: [true, "A orde must have a money"],
      // validate: [validator.isAlpha, 'Tour name must only contain characters']
    },
    total: {
      type: Number,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const OrderItem = mongoose.model("orderItem", orderItemSchema);

module.exports = OrderItem;
