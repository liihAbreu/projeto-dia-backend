const express = require('express');
const router = express.Router();

// Controllers
const {insertHistoric, getHistoricById} = require('../controllers/historicController');


// Middlewares
const authGuard = require('../middlewares/authGuard.js');

// Routes
router.post('/', authGuard, insertHistoric);
router.get('/:id', getHistoricById);

module.exports = router;
