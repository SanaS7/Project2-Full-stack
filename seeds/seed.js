const mongoose = require('mongoose');
const Streetlights = require('../models/Streetlights');
const streetlightData = require('./streetlights.json');

// Mapping our data to a better format
const newData = streetlightData.features.map((item) => {
  // Deconstruct data about each streetlight (item)
  const {
    WATTS,
    DECAL_COLO,
    DECAL_NUMB,
    MOUNT_HEIG,
    OWNER,
    INSTALL_DA,
    STYLE,
    WORK_EFFEC,
    LUMENS,
    CONTRACT_N,
    NOM_VOLT,
    BASE_COLO,
  } = item.properties;

  return {
    watts: WATTS,
    decal_colo: DECAL_COLO,
    decal_numb: DECAL_NUMB,
    mount_heig: MOUNT_HEIG,
    owner: OWNER,
    install_da: INSTALL_DA,
    style: STYLE,
    work_effec: WORK_EFFEC,
    lumens: LUMENS,
    contract_n: CONTRACT_N,
    nom_volt: NOM_VOLT,
    base_colo: BASE_COLO,
    latitude: item.geometry.coordinates[1],
    longitude: item.geometry.coordinates[0],
  };
});

const seedDatabase = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/lightCville_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear the existing Streetlights collection in MongoDB
    await Streetlights.deleteMany();

    // Insert new streetlights data into MongoDB
    await Streetlights.insertMany(newData);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDatabase();

module.exports = { seedDatabase, newData };
