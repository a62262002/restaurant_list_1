// routes/home.js
const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant");

// 設定首頁路由器
// restaurant首頁
router.get("/", (req, res) => {
  sortObject = {};
  sortObject[req.query.ref] = req.query.sort;
  Restaurant.find({})
    .sort(sortObject)
    .exec((err, restaurants) => {
      if (err) return console.error(err);
      return res.render("index", { restaurants: restaurants });
    });
});

router.get("/search", (req, res) => {
  const keyword = req.query.keyword;

  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err);
    const restaurants1 = restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(keyword.toLowerCase())
    );
    res.render("index", { restaurants: restaurants1, keyword: keyword });
  });
});

module.exports = router;
