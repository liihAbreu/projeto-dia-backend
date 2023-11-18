const {body} = require('express-validator');

const clientInsertValidation = () => {
  return [
    body('nome')
        .not()
        .equals('undefined')
        .withMessage('O Nome é obrigatótio.')
        .isString()
        .withMessage('O nome é obrigatótio.')
        .isLength({min: 3})
        .withMessage('O nome precisa ter no minimo 3 caracteres.'),
    body('endereco')
        .not()
        .equals('undefined')
        .withMessage('O endereço é obrigatótio.')
        .isString()
        .withMessage('O endereço é obrigatótio.')
        .isLength({min: 3})
        .withMessage('O endereço precisa ter no minimo 3 caracteres.'),
    body('telefone')
        .not()
        .equals('undefined')
        .withMessage('O telefone é obrigatótio.')
        .isString()
        .withMessage('O telefone é obrigatótio.')
        .isLength({min: 9})
        .withMessage('O telefone precisa ter no minimo 9 caracteres.'),
  ];
};

const ServiceInsertValidation = () => {
  return [
    body('date')
        .not()
        .equals('undefined')
        .withMessage('A data é obrigatótia.')
        .isString()
        .withMessage('A data é obrigatótia.')
        .isLength({min: 3})
        .withMessage('A data precisa ser no formato DD/MM/YYYY.'),
    body('hora')
        .not()
        .equals('undefined')
        .withMessage('A hora é obrigatótia.')
        .isString()
        .withMessage('A hora é obrigatótia.')
        .isLength({min: 3})
        .withMessage('A hora precisa ser no formato 00:00.'),
    body('descricaoServico')
        .not()
        .equals('undefined')
        .withMessage('A descrição do serviço é obrigatótia.')
        .isString()
        .withMessage('A descrição do serviço é obrigatótia.')
        .isLength({min: 3})
        .withMessage('A descrição do serviço precisa ter no minimo 3 caracteres.'),
    body('valorTotal')
        .isString()
        .withMessage('A descrição do serviço precisa ter no minimo 3 caracteres.'),
    body('parcelado')
        .isBoolean(),
    body('quantParcel')
        .isString(),
    body('valorParcel')
        .isString(),
  ];
};

module.exports = {
  clientInsertValidation,
  ServiceInsertValidation,
};
