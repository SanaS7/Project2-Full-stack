// Import the required dependencies
const router = require('express').Router();
const apiRoutes = require('./apiRoutes');
const userRoutes = require('./userRoutes');
const streetlightsRoutes = require('./streetlightsRoutes');

// Route for the base API routes
router.use('/', apiRoutes);

// Route for user-related routes
router.use('/user', userRoutes);

// Route for streetlights-related routes
router.use('/streetlights', streetlightsRoutes);

// Export the router to be used in other files
module.exports = router;
