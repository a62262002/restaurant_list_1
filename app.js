// require packages used in the project
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;

mongoose.connect("mongodb://localhost/restaurant", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

// require express-HTMLHeadingElement;ebars here
const exphbs = require("express-handlebars");

// 引用body-parser
const bodyParser = require("body-parser");

// 引用 method-override
const methodOverride = require("method-override");
// 設定bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

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

// 設定method-override
app.use(methodOverride("_method"));

// setting static files
app.use(express.static("public"));

// 載入路由器
app.use("/", require("./routes/home"));
app.use("/restaurants", require("./routes/restaurant"));

// start and listening on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});

console.log(Restaurant);
