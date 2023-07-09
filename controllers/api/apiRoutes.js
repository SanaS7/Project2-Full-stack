const router = require('express').Router();
const mongoose = require('mongoose');
const { User } = require('../../models');
const {Streetlights} =  require('../../models')

// MongoDB connection URL
const url = 'mongodb+srv://boybrown552:zXgo9cMzbRgxnJ4P@cluster0.zsze6ft.mongodb.net/lightCville_db=true&w=majority';

// Database name
const dbName = 'lightCville_db';

// Connect to MongoDB
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');

    // Test route to get JSON of streetlights data from the database
    router.get('/streetlights', async (req, res) => {
      try {
        const streetlightsData = await Streetlights.find();
        res.status(200).json(streetlightsData);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

    // Route to make a new User in the database
    router.post('/', (req, res) => {
      const { name, email, password } = req.body;
    
      // Validate input
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
      }
    
      const newUser = new User({ name, email, password });
      newUser
        .save()
        .then(createdUser => {
          console.log('User created:', createdUser);
          res.status(200).json(createdUser);
        })
        .catch(err => {
          console.error('Error creating user:', err);
          res.status(500).json({ error: 'Failed to create user' });
        });
    });
    

    // Helper route to quickly get user data
    router.get('/getusers', async (req, res) => {
      try {
        const userData = await User.find();
        res.status(200).json(userData);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

    

    // Handle errors
    router.use((err, req, res, next) => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

module.exports = router;
