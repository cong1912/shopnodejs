const mongoose = require("mongoose");
const orderItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product must belong to a categories,"],
    },
    percent_off: {
      type: Number,
      required: [true, "Product must belong to a categories,"],
    },
    start_at: {
      type: Date,
      required: [true, "A orde must have a money"],
      // validate: [validator.isAlpha, 'Tour name must only contain characters']
    },
    end_at: {
      type: Date,
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
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const OrderItem = mongoose.model("OrderItem", orderItemSchema);

module.exports = OrderItem;
