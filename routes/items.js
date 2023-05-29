const path = require("path");
const express = require("express");

const itemController = require("../controllers/items");
const router = express.Router();

router.post("/postuserdetails", itemController.postItems);
router.get("/postuserdetails", itemController.getItems);
router.post("/reduceQuantity", itemController.reduceQuantity);

module.exports = router;
