// routes/restaurant.js
const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant");

// 設定/restaurants 路由

// 列出全部Todo
router.get("/", (req, res) => {
  return res.redirect("/");
});

// 新增一筆restaurant頁面
router.get("/new", (req, res) => {
  return res.render("new");
});

// 顯示一筆Restaurant的詳細內容
router.get("/:id", (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err);
    return res.render("detail", { restaurant: restaurant });
  });
});

// 新增一筆Restaurant
router.post("/", (req, res) => {
  // 建立restaurant model
  const restaurant = new Restaurant({
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description
  });
  // 存入資料庫
  restaurant.save(err => {
    if (err) return console.error(err);
    // 新增完成導回首頁
    return res.redirect("/");
  });
});

// 修改Restaurant頁面
router.get("/:id/edit", (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err);
    return res.render("edit", { restaurant: restaurant });
  });
});

// 修改Restaurant
router.put("/:id/edit", (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err);
    restaurant.name = req.body.name;
    restaurant.name_en = req.body.name_en;
    restaurant.category = req.body.category;
    restaurant.image = req.body.image;
    restaurant.location = req.body.location;
    restaurant.phone = req.body.phone;
    restaurant.google_map = req.body.google_map;
    restaurant.rating = req.body.rating;
    restaurant.description = req.body.description;
    restaurant.save(err => {
      if (err) return console.error(err);
      return res.redirect(`/restaurants/${req.params.id}`);
    });
  });
});

// 刪除Restaurant
router.delete("/:id/delete", (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err);
    restaurant.remove(err => {
      if (err) return console.log(err);
      return res.redirect("/");
    });
  });
});

module.exports = router;
