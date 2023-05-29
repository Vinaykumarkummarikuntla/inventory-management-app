const product = require("../models/items");

exports.postItems = async (req, res, next) => {
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
    res.status(200).json({ product: data });
  } catch (err) {
    console.error(err);
    next();
  }
};

exports.getItems = async (req, res, next) => {
  try {
    const productdata = await product.findAll();
    res.status(200).json({ itemdata: productdata });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};
exports.reduceQuantity = async (req, res, next) => {
  try {
    const itemid = req.body.itemId;
    const quantity = req.body.quantity;

    const item = await product.findByPk(itemid);
    if (!item) {
      console.log("item is not found");
    }
    if (quantity === 1) {
      item.Quantity -= 1;
      await item.save();
    } else if (quantity === 2) {
      item.Quantity -= 2;
      await item.save();
    }

    res.status(200).json({ product: item });
  } catch (err) {
    console.error(err);
    next();
  }
};
