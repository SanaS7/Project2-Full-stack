const mongoose = require('mongoose');

const StreetlightsSchema = new mongoose.Schema({
  watts: {
    type: Number,
    allowNull: true,
  },
  decal_colo: {
    type: String,
    allowNull: true,
  },
  decal_numb: {
    type: String,
    allowNull: true,
  },
  mount_heig: {
    type: Number,
    allowNull: true,
  },
  owner: {
    type: String,
    allowNull: true,
  },
  install_da: {
    type: Date,
    allowNull: true,
  },
  style: {
    type: String,
    allowNull: true,
  },
  work_effec: {
    type: Date,
    allowNull: true,
  },
  lumens: {
    type: Number,
    allowNull: true,
  },
  contract_n: {
    type: Number,
    allowNull: true,
  },
  nom_volt: {
    type: Number,
    allowNull: true,
  },
  base_colo: {
    type: String,
    allowNull: true,
  },
  latitude: {
    type: mongoose.Decimal128,
  },
  longitude: {
    type: mongoose.Decimal128,
  },
});

const Streetlights = mongoose.model('Streetlights', StreetlightsSchema);

module.exports = Streetlights;
