const mongoose = require("mongoose");
const Restaurant = require("../restaurant");
const restaurants = require("./restaurant.json").results;

mongoose.connect("mongodb://localhost/restaurant", { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", () => {
  console.log("db error");
});

db.once("open", () => {
  console.log("db connected!");

  for (var i = 0; i < 8; i++) {
    Restaurant.create({
      name: restaurants[i].name,
      name_en: restaurants[i].name_en,
      category: restaurants[i].category,
      image: restaurants[i].image,
      location: restaurants[i].location,
      phone: restaurants[i].phone,
      google_map: restaurants[i].google_map,
      rating: restaurants[i].rating,
      description: restaurants[i].description
    });
  }
  console.log("done");
});
