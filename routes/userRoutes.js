const express = require('express');
const router = express.Router();

// Controllers
const {
  register,
  login,
  getCurrentUser,
  update,
  getUserById,
  getAllUsers,
  searchEmployee,
  updateEmployee,
  deleteUser,
  registerAuth,
  loginOAuth,
  registerEmployee,
  getAllUsersById} = require('../controllers/userController.js');

// Middlewares
const validate = require('../middlewares/hendleValidation.js');
const {
  useCreateValidation,
  loginValidation,
  userUpdateValidation,
  useCreateValidationOAuth,
  loginValidationOAuth} = require('../middlewares/useValidation.js');
const authGuard = require('../middlewares/authGuard.js');
const {imageUpload} = require('../middlewares/imageUpload.js');

// Routes
router.post('/register', useCreateValidation(), validate, register);
router.post('/register/employee', useCreateValidation(), validate, registerEmployee);
router.post('/register/oauh', useCreateValidationOAuth(), validate, registerAuth);
router.post('/login/oauh', loginValidationOAuth(), validate, loginOAuth);
router.post('/login', loginValidation(), validate, login);
router.get('/profile', authGuard, getCurrentUser);
router.get('/employee/:id', authGuard, getAllUsersById);
router.get('/employee/', authGuard, getAllUsers);
router.put('/', authGuard, userUpdateValidation(), validate, imageUpload.single('profileImage'), update);
router.get('/:id', getUserById);
router.get('/search/employee', authGuard, searchEmployee);
router.put('/employee', authGuard, userUpdateValidation(), validate, imageUpload.single('profileImage'), updateEmployee);
router.delete('/:id', authGuard, deleteUser);

module.exports = router;
