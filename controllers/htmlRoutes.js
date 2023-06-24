// Import the required dependencies
const router = require('express').Router();
const { Streetlights, User } = require('../models');

// GET all users for homepage
router.get('/', async (req, res) => {
  try {
    // Retrieve all users from the database, including their 'loggedIn' attribute
    const userData = await User.findAll({
      include: [
        {
          model: User,
          attributes: ['loggedIn'],
        },
      ],
    });

    // Map the user data to plain JavaScript objects
    const users = userData.map((user) => user.get({ plain: true }));

    // Render the 'login' view and pass the user data and the 'loggedIn' value from the session
    res.render('login', {
      users,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
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
