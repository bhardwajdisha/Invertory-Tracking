const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
  ItemName: String,
  Price: Number,
  TotalQty: Number,
  Location: String,
  Updated: String,
  updatedAt: Date,
});

module.exports = mongoose.model("InventorySchema", InventorySchema);
