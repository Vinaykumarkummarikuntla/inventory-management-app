const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const itemRoutes = require("./routes/items");

app.use(cors());

const sequelize = require("./util/database");
const product = require("./models/items");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(itemRoutes);

sequelize
  .sync()
  .then((result) => {
    console.log(result);
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((error) => {
    console.error(error);
  });
