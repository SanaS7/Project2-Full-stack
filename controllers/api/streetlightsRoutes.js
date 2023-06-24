// Import the required dependencies
const router = require('express').Router();
const { Streetlights } = require('../../models');
const streetlightData = require('../../seeds/streetlights.json');

// Route to create a new streetlight in the database
router.post('/', (req, res) => {
    Streetlights.create({
        // Create a new streetlight record in the database using the provided data
        base_colo: req.body.base_colo,
        contract_n: req.body.contract_n,
        decal_colo: req.body.decal_colo,
        decal_numb: req.body.decal_numb,
        install_da: req.body.install_da,
        lumens: req.body.lumens,
        mount_heig: req.body.mount_heig,
        nom_volt: req.body.nom_volt,
        owner: req.body.owner,
        style: req.body.style,
        watts: req.body.watts,
        work_effec: req.body.work_effec,
        latitude: req.body.latitude,
        longitude:req.body.longitude
    })      
       .then(streetlights => {
          res.status(200).json(streetlights);
       })
       .catch(err => {
           res.status(400).json(err);
       })
});

// Route to delete a streetlight
router.delete('/:id', (req, res) => {
    Streetlights.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(streetlightsData => {
        if (!streetlightsData) {
            res.status(404).json({ message: 'No streetlight data found with this id' });
            return;
        }
        res.json(streetlightsData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Route to edit an individual streetlight
router.put('/edit/:id', (req, res) => {
    // Update the streetlight record in the database using the provided data
    Streetlights.update({
        contract_n: req.body.contract_n,
        decal_colo: req.body.decal_colo,
        decal_numb: req.body.decal_numb,
        lumens: req.body.lumens,
        mount_heig: req.body.mount_heig,
        nom_volt: req.body.nom_volt,
        owner: req.body.owner,
        style: req.body.style,
        watts: req.body.watts,
        work_effec: req.body.work_effec
    },
    {
        where: {
            id: req.params.id,
        },
        logging: true
    })
    .then(updatedRecord => {
        res.json(updatedRecord);
    })
    .catch(err => res.json(err));
});

// Route to view individual streetlight data by ID number
router.get('/oneStreetlight/:id', async (req, res) => {
    const streetlightData = await Streetlights.findOne({
        where: { id: req.params.id }
    });

    if (!streetlightData) {
        res.status(404).json({ message: 'No streetlight found with that id number' });
    } else {
        res.status(200).json(streetlightData);
    }
});

// Export the router to be used in other files
module.exports = router;
