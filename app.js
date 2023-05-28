// const path = require("path");
// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require('cors');


// const app = express();

// app.use(cors());

// const product = require("./models/items");

// const sequelize = require("./util/database");

// app.set("view engine", "ejs");
// app.set("views", "views");

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, "views")));

// const shop = require("./models/items");

// app.post("/postuserdetails", async(req, res, next) => {
//     try{
//   const itemname = req.body.itemname;
//   const description = req.body.description;
//   const price = req.body.price;
//   const quantity = req.body.quantity;

//   const data = await product.create({
//     Itemname: itemname,
//     Description: description,
//     Price: price,
//     Quantity: quantity,
//   })
//   res.status(200).json({'product':data})
// }
// catch(err) {
//     console.error(err);
//     next()
// }
// });

// sequelize
//   .sync({force:true})
//   .then((result) => {
//     console.log(result);
//     app.listen(5000);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();

app.use(cors());

const product = require("./models/items");
const sequelize = require("./util/database");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/postuserdetails", async (req, res, next) => {
    try {
        const itemname = req.body.itemname;
        const description = req.body.description;
        const price = req.body.price;
        const quantity = req.body.quantity;

        const data = await product.create({
            Itemname: itemname,
            Description: description,
            Price: price,
            Quantity: quantity,
        });
        res.status(200).json({ 'product': data });
    } catch (err) {
        console.error(err);
        next();
    }
});

app.get("/postuserdetails",async(req,res,next) =>{
  try{
    const productdata = await product.findAll();
res.status(200).json({'itemdata':productdata})
  }
  catch(err){
    console.log(err)
    res.status(500).json({'message':err})
  }
})

app.post("/reduceQuantity", async (req, res, next) => {
  try {
      const itemid= req.body.itemId;
      const quantity = req.body.quantity;

      const item = await product.findByPk(itemid)
      if(!item) {
        console.log("item is not found");
      }
      if (quantity === 1){
      item.Quantity -= 1
      await item.save()
    }
    else if (quantity === 2) {
      item.Quantity -= 2
      await item.save()

    }

      res.status(200).json({ 'product': item });
  } catch (err) {
      console.error(err);
      next();
  }
});


sequelize
    .sync()
    .then((result) => {
        console.log(result);
        app.listen(5000, () => {
            console.log('Server is running on port 5000');
        });
    })
    .catch((error) => {
        console.error(error);
    });

