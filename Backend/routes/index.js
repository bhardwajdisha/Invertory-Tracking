const express = require("express");
const router = express.Router();
let Inventory = require("../models/inventorySchema");
const catchAsync = require("../utilis/catchAsync");

router.get(
  "/",
  catchAsync(async (req, res) => {
    // if (Object.keys(req.query).length === 0) {
    //   const data = await Inventory.find({});
    //   res.send(data);
    // } else {
    const query = [];
    //Find by Itemname or Location
    if (req.query.keyword && req.query.keyword != null) {
      await query.push({
        $match: {
          $or: [
            {
              ItemName: { $regex: req.query.keyword, $options: "i" },
            },
            {
              Location: { $regex: req.query.keyword, $options: "i" },
            },
          ],
        },
      });
    }
    //Sort
    if (
      (req.query.sortBy == "Updated" || req.query.sortBy == "updated") &&
      req.query.sortOrder
    ) {
      var sort = {};
      sort["updatedAt"] = req.query.sortOrder == "asc" ? 1 : -1;
      query.push({
        $sort: sort,
      });
    } else if (
      req.query.sortBy &&
      req.query.sortBy != " " &&
      req.query.sortOrder
    ) {
      var sort = {};
      sort[req.query.sortBy] = req.query.sortOrder == "asc" ? 1 : -1;
      query.push({
        $sort: sort,
      });
    } else {
      query.push({
        $sort: { updatedAt: -1 },
      });
    }

    //Pagination
    let total = (await Inventory.aggregate(query)).length;
    let page = req.query.page ? parseInt(req.query.page) : 1;
    let perPage = req.query.perPage ? parseInt(req.query.perPage) : 7;
    let skip = (page - 1) * perPage;
    query.push({
      $skip: skip,
    });
    query.push({
      $limit: perPage,
    });

    const items = await Inventory.aggregate(query);
    res.send({
      message: "Inventory Items fetch successfully",
      data: {
        items,
        meta: {
          total,
          currentPage: page,
          perPage,
          totalPages: Math.ceil(total / perPage),
        },
      },
    });
  })
);

router.post(
  "/",
  catchAsync(async (req, res) => {
    const date = await new Date(Date.now());
    const { ItemName, Price, TotalQty, Location } = req.body;
    const newItem = new Inventory({
      ItemName,
      Price,
      TotalQty,
      Location,
      Updated: date.toDateString(),
      updatedAt: date,
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
    const today = new Date(Date.now());
    const { ItemName, TotalQty, Price, Location } = req.body;
    await Inventory.findByIdAndUpdate(id, {
      TotalQty,
      Price,
      ItemName,
      Location,
      Updated: today.toDateString(),
      updatedAt: today,
    }).then(() => res.send("Item updated"));
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
