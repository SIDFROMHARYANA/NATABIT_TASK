// backend/controllers/locationController.js

let locations = [];

 // Add a location
const addLocation = async (req, res) => {
    try {
      const { name } = req.body;
  
      if (!name) {
        return res.status(400).send({ status: false, message: 'Name is required' });
      }
  
      locations.push(name);
      res.status(200).send({ status: true, message: 'Locations added succesfully', locations});
    } 
    
    catch (error) {
      res.status(500).send({ status: 500, message: 'Internal Server Error' });
    }
  };

  

  const getLocation = async (req, res) => {
  
    try {
    res.json(locations);
  } 
  
  catch (error) {
    res.status(500).send({ status: false, message: 'Internal Server Error' });
  }
};



  

module.exports = {
  getLocation,
  addLocation,

};
