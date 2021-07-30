const mongoose = require("mongoose");
const validator = require("validator");
const orderSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "A tour must have a name"],
      trim: true,
      maxlength: [40, "A tour name must have less or equal then 40 characters"],
      minlength: [5, "A tour name must have more or equal then 10 characters"],
      // validate: [validator.isAlpha, 'Tour name must only contain characters']
    },
    last_name: {
      type: String,
      required: [true, "A tour must have a name"],
      trim: true,
      maxlength: [40, "A tour name must have less or equal then 40 characters"],
      minlength: [5, "A tour name must have more or equal then 10 characters"],
      // validate: [validator.isAlpha, 'Tour name must only contain characters']
    },
    address: {
      type: String,
      required: [true, "Please enter your shipping address"],

      //   validate: [validator.isEmail, "please provide a valid email"],
    },
    email: {
      type: String,
      required: [true, "please tell us your email"],
      lowercase: true,
      validate: [validator.isEmail, "please provide a valid email"],
    },
    city: {
      type: String,
      required: [true, "please tell us your city"],
    },
    country: {
      type: String,
      required: [true, "please tell us your country"],
    },
    zip: {
      type: String,
      required: [true, "please tell us your zip"],
    },
    description: {
      type: String,
      trim: true,
    },
    discount_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Discount",
    },
    base_total_price: {
      type: Number,
      required: [true, "please tell us your price"],
    },
    grand_total: {
      type: Number,
      required: [true, "please tell us your price"],
    },
    discount_total: {
      type: Number,
    },
    item_count: {
      type: Number,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    complete: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
