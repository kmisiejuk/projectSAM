const express = require('express');
const router = express.Router();
const News = require('../models/news');

/* GET home page. */
router.get('/', async (req, res) => {



  try {
    const search = req.query.search || " "
    const data = await News.find({title: new RegExp(search.trim(), "i")}).sort({created: 1})
  
    res.render('news', { title: 'News', data, search });
  } catch (err) {
    console.error(err);
    res.status(500).send('Wystąpił błąd podczas pobierania danych.');
  }
});

module.exports = router;
