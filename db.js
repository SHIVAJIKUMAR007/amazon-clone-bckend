const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/amazondb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const productSchema = mongoose.Schema({
  name: String,
  About: String,
  image: String,
  brand: String,
  Price: String,
  specification: Object,
  shortDesc: String,
});

const productModel = mongoose.model("products", productSchema);

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
});

const userModel = mongoose.model('users',userSchema)

const orderSchema = mongoose.Schema({
   name : String,
   address : String,
   cartItem : String,
   gt : Number,
   otp : Number,
   time : String,
   deliver : Boolean

})

const orderModel = mongoose.model('orders',orderSchema)

module.exports = { productModel,userModel ,orderModel};
