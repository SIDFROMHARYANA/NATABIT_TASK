  

const express = require('express');
const router = express.Router();
const Locationcontroller = require('./locationcontroller');

// Get all locations
router.get('/getlocations', Locationcontroller.getLocation);

// Add a location
router.post('/addlocations', Locationcontroller.addLocation);




module.exports = router;
