// Import the required dependencies
const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Streetlights } = require('../../models');

// Test route to get JSON of streetlights data from the database
// Remember: when testing this endpoint it will be '/api/streetlights'
router.get('/streetlights', async (req, res) => {
  // Find all data for all streetlights
  const streetlightsData = await Streetlights.findAll();
  res.status(200).json(streetlightsData);
});

// Route to make a new User in the database
router.post('/', (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
    .then(userData => {
      console.log(`userData`, userData);
      res.status(200).json(userData);
    })
    .catch((err => {
      console.log('err', err);
      console.log('name', err.errors[0].message);
      console.log('err', Object.keys(err));
      res.status(400).json(err);
    }));
});

// Helper route to quickly get user data
router.get('/getusers', (req, res) => {
  const userData = User.findAll()
    .then(userData => {
      const users = userData.map((item) => item.get({ plain: true }));
      res.status(200).json(userData);
    });
});

// Route to retrieve filtered data
router.post('/dataFilter', async (req, res) => {
  console.log('\n Filtered Data \n');

  // Run sequelize query to find data that matches the parameters
  const filterData = await Streetlights.findAll({
    where: {
      base_colo: req.body.base_colo,
      decal_colo: req.body.decal_colo,
      decal_numb: req.body.decal_numb,
      install_da: req.body.install_da,
      lumens: req.body.lumens,
      mount_heig: req.body.mount_heig,
      nom_volt: req.body.nom_volt,
      owner: req.body.owner,
      style: req.body.style,
      watts: req.body.watts,
      work_effec: req.body.work_effec
    }
  });

  console.log(`\n ${filterData.length} \n`);
  res.status(200).json(filterData);
});

/**
 * DATA FILTER ROUTES
 * These are special routes because they represent all
 * the possible combinations of different data filters
 */

// Route case: data_colo = null, lumens != null
router.post('/FilterNoDCYesL', async (req, res) => {
  console.log('\n FilterNoDCYesL \n');

  // Run sequelize query to find data that matches the parameters
  const filterData = await Streetlights.findAll({
    where: {
      owner: req.body.owner,
      lumens: req.body.lumens
    },
  });

  console.log(`\n Records returned: ${filterData.length} \n`);
  res.status(200).json(filterData);
});

// Route case: decal_colo = null, lumens = null
router.post('/FilterNoDCNoL', async (req, res) => {
  console.log('\n FilterNoDCNoL \n');

  // Run sequelize query to find data that matches the parameters
  const filterData = await Streetlights.findAll({
    where: {
      owner: req.body.owner
    },
  });

  console.log(`\n Records returned: ${filterData.length} \n`);
  res.status(200).json(filterData);
});

// Route case: decal_colo != null, lumens = null
router.post('/FilterYesDCNoL', async (req, res) => {
  console.log('\n FilterYesDCNoL \n');

  // Run sequelize query to find data that matches the parameters
  const filterData = await Streetlights.findAll({
    where: {
      decal_colo: req.body.decal_colo,
      owner: req.body.owner
    },
  });

  console.log(`\n Records returned: ${filterData.length} \n`);
  res.status(200).json(filterData);
});

// Route case: decal_colo != null, lumens != null
router.post('/FilterYesDCYesL', async (req, res) => {
  console.log('\n FilterYesDCYesL \n');

  // Run sequelize query to find data that matches the parameters
  const filterData = await Streetlights.findAll({
    where: {
      decal_colo: req.body.decal_colo,
      owner: req.body.owner,
      lumens: req.body.lumens
    },
  });

  console.log(`\n Records returned: ${filterData.length} \n`);
  res.status(200).json(filterData);
});

module.exports = router;
