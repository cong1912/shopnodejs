const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A category have a name"],
      unique: true,
      trim: true,
      maxlength: [40, "A tour name must have less or equal then 40 characters"],
      minlength: [5, "A tour name must have more or equal then 10 characters"],
      // validate: [validator.isAlpha, 'Tour name must only contain characters']
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: Boolean,
      default: true,
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
// virtual populate
// categorySchema.virtual("products", {
//   ref: "Product",
//   foreignField: "category",
//   localField: "_id",
// });

categorySchema.pre(/^find/, function (next) {
  this.find({ status: { $ne: false } });

  next();
});
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
