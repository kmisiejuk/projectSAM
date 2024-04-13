const express = require('express')
const router = express.Router()
const Quiz = require('../models/quiz')

/* GET home page. */
router.get('/', async (req, res) => {
  try {
    const data = await Quiz.find({})
    const show = !req.session.vote
    let sum = 0
    data.forEach(item => {
      sum += item.vote
    })
    res.render('quiz', { title: 'Quiz', data, show, sum })
  } catch (error) {
    console.error('Błąd podczas pobierania danych Quizu:', error)
    res.status(500).send('Wystąpił błąd podczas przetwarzania żądania.')
  }
})

router.post('/', async (req, res) => {
  try {
    const id = req.body.quiz

    const data = await Quiz.findOne({ _id: id })

    data.vote += 1
    req.session.vote = 1
    await data.save()

    res.redirect('/quiz')
  } catch (error) {
    // Obsługa błędów, jeśli coś pójdzie nie tak
    console.error('Błąd podczas zapisywania głosu:', error)
    res.status(500).send('Wystąpił błąd podczas przetwarzania żądania.')
  }
})

module.exports = router
