// require packages used in the project
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;

mongoose.connect("mongodb://localhost/restaurant", { useNewUrlParser: true });
const db = mongoose.connection;

// require express-HTMLHeadingElement;ebars here
const exphbs = require("express-handlebars");
const restaurantList = require("./restaurant.json");

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

// route setting
app.get("/", (req, res) => {
  res.render("index", { restaurants: restaurantList.results });
});

// show
app.get("/restaurants/:restaurant_id", (req, res) => {
  console.log("req.params.restaurant_id", req.params.restaurant_id);
  const restaurant = restaurantList.results.find(
    restaurant => restaurant.id.toString() === req.params.restaurant_id
  );
  res.render("show", { restaurant: restaurant });
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
