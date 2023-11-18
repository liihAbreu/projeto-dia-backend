const mongoose = require('mongoose');
const Services = require('../models/servicesClient');

// Insert a cliente Service
const insertServiceClient = async (req, res) => {
  const {clientId, descricaoServico, valorTotal, hora, date, idMestre} = req.body;

  // Create a service
  const newServicesClient = {
    _id: new mongoose.Types.ObjectId,
    clientId,
    descricaoServico,
    valorTotal,
    hora,
    date,
    idMestre,
  };

  await Services.create(newServicesClient);

  // If service was created successfuly, return data
  if (!newServicesClient) {
    res.status(422).json({errors: ['Houve um problema, tente mais tarde.']});
    return;
  }

  res.status(201).json(newServicesClient);
};

// Remove a service on DB
const deleteService = async (req, res) => {
  const {id} = req.params;

  try {
    const service = await Services.findById(new mongoose.Types.ObjectId(id));

    // check if service exixst
    if (!service) {
      res.status(404).json({errors: ['Serviço não encontrado.']});
      return;
    }


    await Services.findByIdAndDelete(service._id);

    res.status(200).json({id: service._id, message: 'Serviço excluída com sucesso.'});
  } catch (error) {
    res.status(404).json({errors: ['Id do serviço incorreto.']});
    console.log(error);
  }
};

// Remove a service on DB
const deleteAllService = async (req, res) => {
  const {id} = req.params;

  try {
    const service = await Services.deleteMany({clientId: id});

    // check if service exixst
    if (!service) {
      res.status(404).json({errors: ['Serviço não encontrado.']});
      return;
    }


    res.status(200).json({id: service._id, message: 'Serviço excluída com sucesso.'});
  } catch (error) {
    res.status(404).json({errors: ['Id do serviço incorreto.']});
    console.log(error);
  }
};

// Get all Services
const getAllServices = async (req, res) => {
  const {id} = req.params;
  const services = await Services.find({idMestre: id}).sort([['date', 1]]).exec();
  return res.status(200).json(services);
};

// Get Service Client by id
const getServiceClientById = async (req, res) => {
  const {id} = req.params;
  const services = await Services.find({clientId: id}).sort([['createdAt', -1]]).exec();

  // Check  if service exists
  if (!services) {
    res.status(404).json({errors: ['Serviço não encontrado.']});
    return;
  }

  res.status(200).json(services);
};

// Updade service Client
const updateServiceClient = async (req, res) => {
  const {id} = req.params;
  const {descricaoServico, valorTotal, parcelasRecebidas, hora, date, clientId} = req.body;

  const service = await Services.findById(id);

  // check if a service exists
  if (!service) {
    res.status(404).json({errors: ['Serviço não encontrado.']});
    return;
  }

  if (clientId) {
    service.clientId = clientId;
  }

  if (descricaoServico) {
    service.descricaoServico = descricaoServico;
  }

  if (valorTotal) {
    service.valorTotal = valorTotal;
  }

  if (parcelasRecebidas) {
    service.parcelasRecebidas = parcelasRecebidas;
  }

  if (date) {
    service.date = date;
  }

  if (hora) {
    service.hora = hora;
  }

  await service.save();

  res.status(200).json({service, message: 'O Serviço foi adicionado com sucesso.'});
};

// Updade finish service Client
const updateFinishService = async (req, res) => {
  const {id} = req.params;
  const {finalizado} = req.body;
  await Services.updateOne({_id: id}, {finalizado: finalizado});
  const serviceFinish = await Services.findById(id);
 

  res.status(200).json({serviceFinish, message: 'O serviço foi finalizado com sucesso.'});
};

// Updade amount received Client
const updateReceived = async (req, res) => {
  const {id} = req.params;
  const {valorTotalRecebido} = req.body;
  await Services.updateOne({_id: id}, {valorTotalRecebido: valorTotalRecebido});
  const serviceReceived = await Services.findById(id);


  res.status(200).json({serviceReceived, message: 'O serviço foi finalizado com sucesso.'});
};

module.exports = {
  insertServiceClient,
  deleteService,
  deleteAllService,
  getAllServices,
  getServiceClientById,
  updateServiceClient,
  updateReceived,
  updateFinishService,
};
