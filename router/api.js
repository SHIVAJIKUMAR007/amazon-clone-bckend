const express = require("express");
const router = express.Router();
const parser = require("body-parser");
const db = require("../db");

router.get("/products", (req, res) => {
  db.productModel.find({}).exec((err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

router.post("/products", (req, res) => {
  console.log("sending");
  let produ = req.body;
  db.productModel.create(produ, (error, data) => {
    if (error) throw error;
    res.send(data);
  });
});

router.get("/product/:id", (req, res) => {
  try {
    db.productModel.find({ _id: req.params.id }).exec((err, data) => {
      if (err) throw err;
      res.send(data);
    });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
