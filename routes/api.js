const express = require('express')
const router = express.Router()
const News = require('../models/news')

router.get('/', async (req, res) => {
  try {
    // Wczytujemy wartości wyszukiwania i sortowania z zapytania
    const search = req.query.search || '' // Domyślnie pusty ciąg znaków
    let sort = parseInt(req.query.sort) || -1 // Konwertujemy na liczbę

    // Wykorzystujemy obiekty, aby upewnić się, że wartości są bezpieczne
    const query = {
      title: { $regex: new RegExp(search.trim(), 'i') },
    }

    // Używamy metody find() z obiektem zapytania i sortujemy wyniki
    const data = await News.find(query).sort({ created: sort })

    // Zwracamy dane w formacie JSON
    res.json(data)
  } catch (error) {
    // Obsługa błędów, jeśli coś pójdzie nie tak
    console.error('Wystąpił błąd podczas pobierania danych:', error)
    res.status(500).send('Wystąpił błąd podczas przetwarzania żądania.')
  }
})

router.get('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const newsItem = await News.findById(id).select("_id title description")
  
      // Sprawdzamy, czy znaleziono wiadomość o podanym ID
      if (!newsItem) {
        return res.status(404).json({ message: 'Nie znaleziono wiadomości o podanym ID.' });
      }
  
      // Zwracamy znalezioną wiadomość
      res.json(newsItem);
    } catch (error) {
      // Obsługa błędów
      console.error('Błąd podczas pobierania wiadomości:', error);
      res.status(500).json({ message: 'Wystąpił błąd podczas przetwarzania żądania.' });
    }
  });
  

module.exports = router
