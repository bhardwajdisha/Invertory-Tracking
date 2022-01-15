const express = require('express');
const router= express.Router();
const Inventory = require('../models/inventorySchema');

router.get('/',async(req,res)=>{
    const items = await Inventory.find({})
    res.send(items);
})

module.exports = router;