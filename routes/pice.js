const express = require('express');
const router = express.Router();
const Pice = require('../models/pice'); // Prilagodite putanju prema vašem projektu
router.use(express.json());
// Definisanje rute za dohvatanje svih pića
router.get('/pica', async (req, res) => {
  try {
   
    const pica = await Pice.findAll();

    // Slanje odgovora sa pronađenim pićima
    res.json(pica);
  } catch (error) {
    console.error(error);
    // Slanje odgovora u slučaju greške
    res.status(500).json({ error: 'Greška prilikom dohvatanja pića.' });
  }
});
router.get('/pica/:id', async (req, res) => {
  try {
   
    const pica = await Pice.findByPk(req.params.id);

    // Slanje odgovora sa pronađenim pićima
    res.json(pica);
  } catch (error) {
    console.error(error);
    // Slanje odgovora u slučaju greške
    res.status(500).json({ error: 'Greška prilikom dohvatanja pića.' });
  }
});
module.exports = router;
