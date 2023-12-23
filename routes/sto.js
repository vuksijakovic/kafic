const express = require('express');
const router = express.Router();
const Sto = require('../models/sto'); 
const Pica = require('../models/aktivneNarudzbine');

// Prilagodite putanju prema vašem projektu
router.use(express.json());
// Definisanje rute za dohvatanje svih pića
router.get('/stolovi', async (req, res) => {
  try {
    // Koristimo Sequelize metodu findAll da dohvatimo sva pića iz tabele Pices
    const sto = await Sto.findAll();

    // Slanje odgovora sa pronađenim pićima
    res.json(sto);
  } catch (error) {
    console.error(error);
    // Slanje odgovora u slučaju greške
    res.status(500).json({ error: 'Greška prilikom dohvatanja pića.' });
  }
});
router.delete('/obrisi-aktivne-narudzbine/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Provera da li sto postoji pre brisanja iz tabele
        const sto = await Sto.findByPk(id);
        
        if (!sto) {
            return res.status(404).json({ success: false, error: 'Sto nije pronađen.' });
        }

        // Brisanje svih aktivnih narudžbina povezanih sa stolom
        await Pica.destroy({
            where: { id_sto: id },
        });

        res.json({ success: true, message: 'Sve aktivne narudžbine su uspešno obrisane.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Greška prilikom brisanja aktivnih narudžbina.' });
    }
});
router.get('/aktivne-narudzbine/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const narudzbine = await Pica.findAll({
            where: { id_sto: id },
        });

        res.json(narudzbine);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Greška prilikom dohvatanja aktivnih narudžbina.' });
    }
});
router.post('/dodaj-aktivnu-narudzbinu', async (req, res) => {
    const { id_sto, id_pice } = req.body;

    try {
        // Provera da li sto i pice postoje pre dodavanja u tabelu
        // Ovo zavisi od vaše implementacije i može se prilagoditi prema potrebama

        // Dodavanje nove aktivne narudžbine
        const novaNarudzbina = await Pica.create({
            id_sto,
            id_pice,
        });

        res.status(201).json({ success: true, narudzbina: novaNarudzbina });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Greška prilikom dodavanja aktivne narudžbine.' });
    }
});
module.exports = router;
