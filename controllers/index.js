// Import the required dependencies
const router = require('express').Router();
const apiRoutes = require('./api');
const htmlRoutes = require('./htmlRoutes');

// Mount the HTML routes on the root path '/'
router.use('/', htmlRoutes);

// Mount the API routes under the '/api' path
router.use('/api', apiRoutes);

// Export the router to be used in other files
module.exports = router;
