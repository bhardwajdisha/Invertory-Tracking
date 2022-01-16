const express = require("express");
const router = express.Router();
let Inventory = require("../models/inventorySchema");
const catchAsync = require("../utilis/catchAsync");

router.get(
  "/",
  catchAsync(async (req, res) => {
    const items = await Inventory.find({});
    res.send(items);
  })
);

router.post(
  "/",
  catchAsync(async (req, res) => {
    const { ItemName, Price, TotalQty } = req.body;
    const newItem = new Inventory({
      ItemName,
      Price,
      TotalQty,
    });
    await newItem.save().then(() => res.send("Item Added"));
  })
);

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const item = await Inventory.findById(id);
    res.send(item);
  })
);

router.put(
  "/edit/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const { ItemName, TotalQty, Price, Location } = req.body;
    const date = new Date(Date.now());
    const Updated = date.toDateString();
    await Inventory.findByIdAndUpdate(id, {
      TotalQty,
      Price,
      ItemName,
      Location,
      Updated,
    }).then(() => console.log("Item updated"));
  })
);

router.delete(
  "/delete/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    Inventory.findByIdAndDelete(id).then(() => res.send("Item deleted"));
  })
);

module.exports = router;
