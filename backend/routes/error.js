const router = require('express').Router();

router.use('/*', (req, res) => {
  if (req.method === 'GET') {
    res.status(404).json({ message: 'Запрашиваемый ресурс не найден' });
  }
  res.status(404).json({ message: `Невозможно выполнить действие ${req.method} для http://api.skubilina.students.nomoreparties.space${req.path + req.params[0]}` });
});

module.exports = router;
