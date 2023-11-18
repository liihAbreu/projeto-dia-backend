const express = require('express');
const router = express.Router();

// Controllers
const {
  insertClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
  searchClient,
  getAllClientsById} = require('../controllers/clientController');

// Middlewares
const authGuard = require('../middlewares/authGuard.js');
const validate = require('../middlewares/hendleValidation.js');
const {clientInsertValidation} = require('../middlewares/clientValidation');

// Routes
router.post('/', authGuard, clientInsertValidation(), validate, insertClient);
router.delete('/:id', authGuard, deleteClient);
router.get('/', authGuard, getAllClients);
router.get('/search', authGuard, searchClient);
router.get('/:id', authGuard, getClientById);
router.get('/all/:id', authGuard, getAllClientsById);
router.put('/:id', authGuard, clientInsertValidation(), validate, updateClient);

module.exports = router;
