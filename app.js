// require packages used in the project
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;

mongoose.connect("mongodb://localhost/restaurant", { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// require express-HTMLHeadingElement;ebars here
const exphbs = require("express-handlebars");

// 引用body-parser
const bodyParser = require('body-parser')
// 設定bodyParser
app.use(bodyParser.urlencoded({ extended: true }))

// 連線異常
db.on("error", () => {
  console.log("mongodb error!");
});

// 連線成功
db.once("open", () => {
  console.log("mongodb connected!");
});

// 載入restaurant model
const Restaurant = require("./models/restaurant");

// setting templates engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// setting static files
app.use(express.static("public"));

// restaurant首頁
app.get("/", (req, res) => {
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err)
    return res.render('index', { restaurants: restaurants })
  })
  // res.render("index", { restaurants: restaurantList.results });
});

// 列出全部Todo
app.get("/restaurants", (req, res) => {
  return res.redirect('/')
});

// 新增一筆restaurant頁面
app.get("/restaurants/new", (req, res) => {
  return res.render('new')
});

// 顯示一筆Restaurant的詳細內容
app.get("/restaurants/:id", (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('detail', { restaurant: restaurant })
  })
});

// 新增一筆Restaurant
app.post("/restaurants", (req, res) => {

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
    description: req.body.description,
  })

  // 存入資料庫
  restaurant.save(err => {
    if (err) return console.error(err)

    // 新增完成導回首頁
    return res.redirect('/')
  })
});

// 修改Restaurant頁面
app.get("/restaurants/:id/edit", (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('edit', { restaurant: restaurant })
  })
});

// 修改Restaurant
app.post("/restaurants/:id/edit", (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.name = req.body.name
    restaurant.name_en = req.body.name_en
    restaurant.category = req.body.category
    restaurant.image = req.body.image
    restaurant.location = req.body.location
    restaurant.phone = req.body.phone
    restaurant.google_map = req.body.google_map
    restaurant.rating = req.body.rating
    restaurant.description = req.body.description
    restaurant.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/restaurants/${req.params.id}`)
    })
  })
});

// 刪除Restaurant
app.post("/restaurants/:id/delete", (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.log(err)
      return res.redirect('/')
    })
  })
});

// search
app.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase());
  });
  res.render("index", { restaurants: restaurants, keyword: keyword });
});

// start and listening on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
