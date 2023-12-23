// routes/provera.js
const express = require('express');
const router = express.Router();
const Korisnik = require('../models/korisnik'); // Prilagodite putanju prema vašem projektu
router.use(express.json());
router.get('/korisnik/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const korisnik = await Korisnik.findByPk(id);

    if (korisnik) {
      res.json({ postoji: true, korisnik, poruka: 'Korisnik pronađen.' });
    } else {
      res.json({ postoji: false, poruka: 'Korisnik nije pronađen.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Greška prilikom pretrage korisnika.' });
  }
});

router.get('/korisnik/:korisnickoIme', async (req, res) => {
  const { korisnickoIme } = req.params;

  try {
    const korisnik = await Korisnik.findOne({
      where: { korisnickoIme },
    });

    if (korisnik) {
      res.json({ postoji: true, poruka: 'Korisničko ime već postoji.' });
    } else {
      res.json({ postoji: false, poruka: 'Korisničko ime je dostupno.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Greška prilikom provere korisničkog imena.' });
  }
});
router.post('/provjera-korisnika', async (req, res) => {
  const { korisnickoIme, sifra } = req.body;

  try {
    const korisnik = await Korisnik.findOne({
      where: { korisnickoIme, sifra },
    });

    if (korisnik) {
      res.json({ postoji: true, poruka: 'Korisničko ime i šifra već postoje.', id: korisnik.id });
    } else {
      res.json({ postoji: false, poruka: 'Korisničko ime i šifra su dostupni.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Greška prilikom provere korisničkog imena i šifre.' });
  }
});

router.post('/dodaj-korisnika', async (req, res) => {
    const { korisnickoIme, sifra, tip } = req.body;
  
    try {
        const noviKorisnik = await Korisnik.create({
            korisnickoIme,
            sifra,
            tip,
          });
  
      res.status(201).json({ success: true, korisnik: noviKorisnik });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Greška prilikom dodavanja korisnika.' });
    }
  });
  
module.exports = router;
