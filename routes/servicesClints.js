const express = require('express');
const router = express.Router();

// Controllers
const {
  insertServiceClient,
  getServiceClientById,
  updateServiceClient,
  updateFinishService,
  deleteService,
  deleteAllService,
  updateReceived, getAllServices} = require('../controllers/servicesClientController');


// Middlewares
const authGuard = require('../middlewares/authGuard.js');
const validate = require('../middlewares/hendleValidation.js');

// Routes
router.post('/', authGuard, insertServiceClient);
router.delete('/:id', authGuard, deleteService);
router.delete('/delete/:id', authGuard, deleteAllService);
router.get('/all/:id', authGuard, getAllServices);
router.get('/:id', getServiceClientById);
router.put('/:id', authGuard, validate, updateServiceClient);
router.put('/finish/:id', authGuard, updateFinishService);
router.put('/received/:id', authGuard, updateReceived);

module.exports = router;
