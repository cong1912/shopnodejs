const catchAsync = require("../utils/catchAsync");
const Order = require("./../models/order");
const OrderItem = require("./../models/orderItemModel");
const Product = require("./../models/productModel");
const getProduct = () => {};

exports.store = catchAsync(async (req, res, next) => {
  const order = new Order({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    address: req.body.address,
    email: req.body.email,
    city: req.body.city,
    country: req.body.country,
    zip: req.body.zip,
    description: req.body.description,
    base_total_price: req.body.base_total_price,
    grand_total: req.body.grand_total,
  });
  order.save();
  req.body.products.map(async (p) => {
    var quantity = p.quantity;
    const product = await Product.findById(p.product_id).exec();
    var total = product.price * quantity;
    const orderItem = new OrderItem({
      order_id: order.id,
      product_id: p.product_id,
      quantity: quantity,
      total: total,
    });
    orderItem.save();
    let lineItem = [
      {
        name: product.name,
        description: product.description,
        images: [product.imageCover],
        amount: product.price,
        currency: "usd",
        quantity: quantity,
      },
    ];
  });
  console.log(lineItem);
  const signature = req.headers["stripe-signature"];

  res.status(201).json({
    status: "success",
    data: {
      data: order,
    },
  });
});
