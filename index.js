if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const express = require('express');
const app = express();
const helmet = require('helmet');
const mongoose = require('mongoose');
const routes = require('./routes');
const bodyParser = require('body-parser');
const dbUrl = process.env.dbUrl;

mongoose.connect(dbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connection Done");
});

app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/check',(req,res)=>{
    res.send('HI');
})
app.use('/inventory',routes);

app.listen(3000,(req,res)=>{
    console.log('Server started on port 3000');
})