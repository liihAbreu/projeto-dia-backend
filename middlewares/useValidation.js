const {body} = require('express-validator');

const useCreateValidation = () => {
  return [
    body('name')
        .isString()
        .withMessage('O nome é obigatório.')
        .isLength({min: 3})
        .withMessage('O nome precisa ter no minimo 3 caracteres.'),
    body('email')
        .isString()
        .withMessage('O email é obrigatório.')
        .isEmail()
        .withMessage('Insira um email válido.'),
    body('password')
        .isString()
        .withMessage('A senha é obrigatória.')
        .isLength({min: 5})
        .withMessage('A senha precisa ter no mínimo 5 caracteres.'),
    body('confirmPassword')
        .isString()
        .withMessage('A confirmação de senha é obrigatória.')
        .custom((value, {req}) => {
          if (value != req.body.password) {
            throw new Error(' As senhas precisam ser iguais.');
          }
          return true;
        }),
  ];
};

const useCreateValidationOAuth = () => {
  return [
    body('name')
        .isString()
        .withMessage('O nome é obigatório.')
        .isLength({min: 3})
        .withMessage('O nome precisa ter no minimo 3 caracteres.'),
    body('email')
        .isString()
        .withMessage('O email é obrigatório.')
        .isEmail()
        .withMessage('Insira um email válido.'),
  ];
};

const loginValidation = () => {
  return [
    body('email')
        .isString()
        .withMessage('O email é obrigatório.')
        .isEmail()
        .withMessage('Insira um email válido.'),
    body('password')
        .isString()
        .withMessage('A senha é obrigatporia.'),
  ];
};

const loginValidationOAuth = () => {
  return [
    body('email')
        .isString()
        .withMessage('O email é obrigatório.')
        .isEmail()
        .withMessage('Insira um email válido.'),
  ];
};

const userUpdateValidation = () => {
  return [
    body('name')
        .optional()
        .isLength({min: 3})
        .withMessage('O nome precisa ter no minimo 3 caracteres'),
    body('password')
        .optional()
        .isLength({min: 5})
        .withMessage('A senha precisa ter no minimo 5 caracteres.'),
  ];
};

module.exports = {
  useCreateValidation,
  loginValidation,
  userUpdateValidation,
  useCreateValidationOAuth,
  loginValidationOAuth,
};
