const router = require('express').Router();
const Streetlights = require('../models/Streetlights');
const User = require('../models/User');

// GET all users for homepage
router.get('/', async (req, res) => {
  try {
    // Retrieve all users from the MongoDB collection, including their 'loggedIn' attribute
    const userData = await User.find();

    // Map the user data to plain JavaScript objects
    const users = userData.map((user) => user.toObject());

    // Render the 'login' view and pass the user data and the 'loggedIn' value from the session
    res.render('login', {
      users,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to render the 'login' view
router.get('/login', async (req, res) => {
  res.render('login');
});

// Route to render the 'register' view
router.get('/register', async (req, res) => {
  res.render('register');
});

// Route to render the 'data' view
router.get('/data', async (req, res) => {
  res.render('data');
});

// Route to render the 'logout' view
router.get('/logout', async (req, res) => {
  res.render('logout');
});

// Export the router to be used in other files
module.exports = router;
