if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const helmet = require("helmet");
const mongoose = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbUrl = process.env.dbUrl;

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connection Done");
});

app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());

app.get("/check", (req, res) => {
  res.send("HI");
});
app.use("/inventory", routes);

// app.all('*',(req,res,next)=>{
//     const err ={
//         message:'Page not Found',
//         status:404,
//     }
//     next(err);
// })

app.use((req, res, next) => {
  res.header({ "Access-Control-Allow-Origin": "*" });
  next();
});

app.use((err, req, res, next) => {
  const { status = 500 } = err;
  if (!err.message) err.message = "Oh No!Something Went Wrong";
  res.status(status).send(err.message);
});
const port = process.env.PORT || 3001;
app.listen(port, (req, res) => {
  console.log("Server started on port 3001");
});
