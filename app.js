var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var apiRouter = require("./router/api");
var authRouter = require('./router/authApi')
var orderRouter = require('./router/orderApi')
const app = express();

// middilwares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"),
    res.setHeader("Access-Control-Allow-Headers", "*"),
    next();
});
app.use("/api", apiRouter);
app.use("/auth_api", authRouter);
app.use("/order_api", orderRouter);


app.get("/", (req, res) => {
  res.send("backend prepared");
});

module.exports = app;

app.listen(process.env.PORT || 5000, () =>
  console.log(`server is lisning at 5000`)
);
