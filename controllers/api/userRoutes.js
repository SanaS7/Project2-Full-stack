const router = require('express').Router();
const { User } = require('../../models');

// Create a new user
router.post('/', async (req, res) => {
  try {
    // Create a new user record in the database using the provided data
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(200).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    // Validate the username and email provided
    const userData = await User.findOne({
      name: req.body.name,
      email: req.body.email,
    });

    // If no user is found, return an error response
    if (!userData) {
      res.status(400).json({ message: 'Incorrect input!' });
      return;
    }

    // Validate the encrypted password
    const validPassword = userData.checkPassword(req.body.password);

    // If the password is invalid, return an error response
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    res.status(200).json({ user: userData, message: 'You are now logged in!' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Export the router to be used in other files
module.exports = router;
