const express = require('express')
const News = require('../models/news')
const router = express.Router()

router.all('*', (req, res, next) => {
  if (!req.session.admin) {
    res.redirect('login')

    return
  }
  next()
})

/* GET home page. */
router.get('/', async (req, res) => {
  try {
    const data = await News.find({});
    console.log(data);
    res.render('admin/index', { title: 'Admin', news: data });
  } catch (err) {
    // Obsługa błędu
    console.error(err);
    res.status(500).send('Wystąpił błąd przy pobieraniu danych');
  }
});

router.get('/news/add', (req, res) => {
  res.render('admin/news-form', { title: 'Dodaj news', body: {}, errors: {} })
})
router.post('/news/add', async (req, res) => {
  const body = req.body

  try {
    const newsData = new News(body)
    await newsData.save()
    res.redirect('/admin/index') // Przekierowanie po udanym zapisie
  } catch (error) {
    console.error(error)
    res.status(500).send('Wystąpił błąd podczas zapisywania danych.')
  }
})

router.get('/news/delete/:id', async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.redirect("/admin/index");
  } catch (err) {
    console.error(err);
    res.status(500).send('Wystąpił błąd podczas usuwania danych.');
  }
});


module.exports = router
