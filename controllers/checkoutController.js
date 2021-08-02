const catchAsync = require("../utils/catchAsync");
const Order = require("./../models/order");
const OrderItem = require("./../models/orderItemModel");
const Product = require("./../models/productModel");
const Discount = require("./../models/discountModel");
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
  });
  order.save();
  let ids = [];
  let quantities = [];
  let items = [];
  let discount = 0;
  if (req.body.discout_code) {
    const code = await Discount.findOne({ name: req.body.discout_code }).exec();
    if (code.length == 0) {
      discount = 0;
    } else {
      discount = code.percent_off;
    }
  }
  req.body.products.map((p) => {
    ids.push(p.product_id);
    quantities.push(p.quantity);
  });
  let products = await Product.find().where("_id").in(ids).exec();
  products.map((p, index) => {
    var quantity = quantities[index];
    var total = (p.price - p.price * (discount / 100)) * quantity;
    console.log(total);
    const orderItem = new OrderItem({
      order_id: order.id,
      product_id: p.product_id,
      quantity: quantity,
      total: total,
    });
    orderItem.save();
    items.push({
      name: p.name,
      description: p.description,
      images: [p.imageCover],
      amount: p.price - p.price * (discount / 100),
      currency: "usd",
      quantity: quantity,
    });
  });

  const stripe = require("stripe")(process.env.STRIPE_SECRET);

  const session = await stripe.checkout.sessions.create({
    success_url: "https://example.com/success",
    cancel_url: "https://example.com/cancel",
    payment_method_types: ["card"],
    line_items: items,
    mode: "payment",
  });
  order.transaction_id = session.id;
  order.base_total_price = session.amount_subtotal;
  order.grand_total = session.amount_total;
  order.save();
  res.status(201).json({
    status: "success",
    data: {
      data: session,
    },
  });
});
