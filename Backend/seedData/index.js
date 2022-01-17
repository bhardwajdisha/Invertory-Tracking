const mongoose = require("mongoose");
const data = require("./data");
const InventorySchema = require("../models/inventorySchema");

mongoose.connect(
  "mongodb+srv://inventory:9582533456@cluster0.divir.mongodb.net/test",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const seedDB = async () => {
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("Connection of seed Done");
  });
  await InventorySchema.deleteMany({});
  for (let i = 0; i < 8; i++) {
    const date = Date.now();
    const today = new Date(date);
    const newItem = new InventorySchema({
      ItemName: `${data[i].ItemName}`,
      Price: `${data[i].Price}`,
      TotalQty: `${data[i].TotalQty}`,
      Location: `${data[i].Location}`,
      Updated: today.toDateString(),
      updatedAt: today,
    });
    await newItem.save();
  }
};
seedDB().then(() => {
  mongoose.connection.close();
});
