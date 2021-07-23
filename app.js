const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const path = require("path");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const categoryRouter = require("./routes/categoryRoutes");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
// const viewRouter = require("./routes/viewRoutes");
const cors = require("cors");
const app = express();

// Serving static files
app.use(express.static(path.join(__dirname, "public")));
// set security http headers
app.use(helmet());

//Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(
  cors({
    origin: "http://localhost:3001",
  })
);

// limit requests from same APi
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour.",
});
app.use("/api", limiter);

// Body parser,reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

// data sanitization again nosql query injection
app.use(mongoSanitize());

// Data sanitization against xss
app.use(xss());
// 3)routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/product", productRouter);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
