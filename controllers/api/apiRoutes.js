const router = require('express').Router();
const { MongoClient } = require('mongodb');

// MongoDB connection URL
const url = 'mongodb://127.0.0.1:27017';

// Database name
const dbName = 'lightCville_db';

// Connect to MongoDB
MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    // Access the database
    const db = client.db(dbName);

    // Test route to get JSON of streetlights data from the database
    router.get('/streetlights', async (req, res) => {
      try {
        const streetlightsData = await db.collection('streetlights').find().toArray();
        res.status(200).json(streetlightsData);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

    router.get('/streetlights', async (req, res) => {
      try {
        const streetlightsData = await db.collection('streetlights').find().toArray();
        res.status(200).json(streetlightsData);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
    });
    
    // Route to make a new User in the database
    router.post('/', (req, res) => {
      const { name, email, password } = req.body;
    
      User.create({ name, email, password })
        .then(userData => {
          console.log('userData', userData);
          res.status(200).json(userData);
        })
        .catch(err => {
          console.log('err', err);
          console.log('name', err.errors[0].message);
          console.log('err', Object.keys(err));
          res.status(400).json(err);
        });
    });
    
    // Helper route to quickly get user data
    router.get('/getusers', async (req, res) => {
      try {
        const userData = await db.collection('users').find().toArray();
        res.status(200).json(userData);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
    });
    
    // Route to retrieve filtered data
    router.post('/dataFilter', async (req, res) => {
      console.log('\n Filtered Data \n');
    
      try {
        const filterData = await db.collection('streetlights').find(req.body).toArray();
        console.log(`\n ${filterData.length} \n`);
        res.status(200).json(filterData);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
    });
    
    /**
     * DATA FILTER ROUTES
     * These are special routes because they represent all
     * the possible combinations of different data filters
     */
    
    // Route case: data_colo = null, lumens != null
    router.post('/FilterNoDCYesL', async (req, res) => {
      console.log('\n FilterNoDCYesL \n');
    
      try {
        const filterData = await db.collection('streetlights').find({ owner: req.body.owner, lumens: req.body.lumens }).toArray();
        console.log(`\n Records returned: ${filterData.length} \n`);
        res.status(200).json(filterData);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
    });
    
    // Route case: decal_colo = null, lumens = null
    router.post('/FilterNoDCNoL', async (req, res) => {
      console.log('\n FilterNoDCNoL \n');
    
      try {
        const filterData = await db.collection('streetlights').find({ owner: req.body.owner }).toArray();
        console.log(`\n Records returned: ${filterData.length} \n`);
        res.status(200).json(filterData);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
    });
    
    // Route case: decal_colo != null, lumens = null
    router.post('/FilterYesDCNoL', async (req, res) => {
      console.log('\n FilterYesDCNoL \n');
    
      try {
        const filterData = await db.collection('streetlights').find({ decal_colo: req.body.decal_colo, owner: req.body.owner }).toArray();
        console.log(`\n Records returned: ${filterData.length} \n`);
        res.status(200).json(filterData);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
    });
    
    // Route case: decal_colo != null, lumens != null
    router.post('/FilterYesDCYesL', async (req, res) => {
      console.log('\n FilterYesDCYesL \n');
    
      try {
        const filterData = await db.collection('streetlights').find({ decal_colo: req.body.decal_colo, owner: req.body.owner, lumens: req.body.lumens }).toArray();
        console.log(`\n Records returned: ${filterData.length} \n`);
        res.status(200).json(filterData);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

module.exports = router;
