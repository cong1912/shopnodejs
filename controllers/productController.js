const Product = require("./../models/productModel");
const factory = require("./handlerFactory");
const multer = require("multer");
const sharp = require("sharp");
const catchAsync = require("../utils/catchAsync");

exports.setCategoryIds = (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productId;
  next();
};
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.uploadUserPhoto = upload.single("imageCover");

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.product.id}-${Date.now()}.jpeg`;
  console.log(req.file.filename);
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/product/${req.file.filename}`);

  next();
});
exports.getAllProducts = factory.getAll(Product);
exports.getProduct = factory.getOne(Product);
exports.createProduct = catchAsync(async (req, res, next) => {
  const filteredBody = req.body;
  if (req.file) filteredBody.photo = req.file.filename;
  console.log(filteredBody);
  console.log(req);
  // const doc = await Product.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      // data: req.body,
    },
  });
});
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);
