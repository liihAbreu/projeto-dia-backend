const Historic = require('../models/historic');

// Insert a historic Service
const insertHistoric = async (req, res) => {
  const {nome, data, hora, acao, descricaoServico, clientId} = req.body;

  // Create a historic
  const newHistoric = {
    nome,
    data,
    hora,
    acao,
    descricaoServico,
    clientId,
  };

  await Historic.create(newHistoric);

  // If historic was created successfuly, return data
  if (!newHistoric) {
    res.status(422).json({errors: ['Houve um problema, tente mais tarde.']});
    return;
  }

  res.status(201).json(newHistoric);
};

// Get historic Service by id
const getHistoricById = async (req, res) => {
  const {id} = req.params;
  const historic = await Historic.find({clientId: id}).sort([['createdAt', -1]]).exec();

  // Check  if historic exists
  if (!historic) {
    res.status(404).json({errors: ['Historico não encontrado.']});
    return;
  }

  res.status(200).json(historic);
};

module.exports = {
  insertHistoric,
  getHistoricById,
};
