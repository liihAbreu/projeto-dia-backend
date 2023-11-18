const mongoose = require('mongoose');
const Client = require('../models/client');

// Insert a client, with an user related to it
const insertClient = async (req, res) => {
  const {nome, endereco, telefone, idMestre} = req.body;

  // Create a Client
  const newCliente = {
    nome,
    endereco,
    telefone,
    idMestre,
  };

  await Client.create(newCliente);

  // If Client was created successfuly, return data
  if (!newCliente) {
    res.status(422).json({errors: ['Houve um problema, tente mais tarde.']});
    return;
  }

  res.status(201).json(newCliente);
};

// Remove a client on DB
const deleteClient = async (req, res) => {
  const {id} = req.params;

  try {
    const client = await Client.findById(new mongoose.Types.ObjectId(id));

    // check if client exixst
    if (!client) {
      res.status(404).json({errors: ['Cliente não encontrado.']});
      return;
    }


    await Client.findByIdAndDelete(client._id);

    res.status(200).json({id: client._id, message: 'Cliente excluída com sucesso.'});
  } catch (error) {
    res.status(404).json({errors: ['Id do Cliente incorreto.']});
    console.log(error);
  }
};

// Get all clients
const getAllClients = async (req, res) => {
  const clients = await Client.find({}).sort([['createdAt', -1]]).exec();
  return res.status(200).json(clients);
};

// Get Client by id
const getClientById = async (req, res) => {
  const {id} = req.params;
  const client = await Client.findById(new mongoose.Types.ObjectId(id));

  // Check  if client exists
  if (!client) {
    res.status(404).json({errors: ['Cliente não encontrado.']});
    return;
  }

  res.status(200).json(client);
};

// Get All clients by id
const getAllClientsById = async (req, res) => {
  const {id} = req.params;
  const clients = await Client.find({idMestre: id}).sort([['nome', 1]]).exec();

  // Check  if service exists
  if (!clients) {
    res.status(404).json({errors: ['Usuário não encontrado.']});
    return;
  }

  res.status(200).json(clients);
};

// Update a client
const updateClient = async (req, res) => {
  const {id} = req.params;
  const {nome, endereco, telefone} = req.body;

  const client = await Client.findById(new mongoose.Types.ObjectId(id));

  // check if a client to exists
  if (!client) {
    res.status(404).json({errors: ['Cliente não encontrada.']});
    return;
  }

  if (nome) {
    client.nome = nome;
  }

  if (endereco) {
    client.endereco = endereco;
  }

  if (telefone) {
    client.telefone = telefone;
  }

  await client.save();

  res.status(200).json({client, message: 'Cliente atualizado com sucesso.'});
};

// Updade service Client
const updateServiceClient = async (req, res) => {
  const {id} = req.params;
  const {descricaoServico, valorTotal, parcelado, parcelasRecebidas, quantParcel, valorParcel, hora, date} = req.body;

  const client = await Client.findById(id);

  // check if a client exists
  if (!client) {
    res.status(404).json({errors: ['Foto não encontrada.']});
    return;
  }

  const userService = {
    serviceId: new mongoose.Types.ObjectId,
  };

  if (descricaoServico) {
    userService.descricaoServico = descricaoServico;
  }

  if (valorTotal) {
    userService.valorTotal = valorTotal;
  }

  if (parcelasRecebidas) {
    userService.parcelasRecebidas = parcelasRecebidas;
  }

  if (parcelado) {
    userService.parcelado = parcelado;
  }

  if (quantParcel) {
    userService.quantParcel = quantParcel;
  }

  if (valorParcel) {
    userService.valorParcel = valorParcel;
  }

  if (date) {
    userService.date = date;
  }

  if (hora) {
    userService.hora = hora;
  }

  client.servicos.push(userService);

  await client.save();

  res.status(200).json({servicos: userService, message: 'O Serviço foi adicionado com sucesso.'});
};

// Updade finish service Client
const updateFinishService = async (req, res) => {
  const {finalizado, serviceId} = req.body;
  const client = await Client.replaceOne({serviceId: serviceId}, {finalizado: finalizado});

  res.status(200).json({client, message: 'O serviço foi adicionado com sucesso.'});
};

// Search client by title
const searchClient = async (req, res) => {
  const {q} = req.query;
  const client = await Client.find({nome: new RegExp(q, 'i')}).exec();

  res.status(200).json(client);
};

module.exports = {
  insertClient,
  deleteClient,
  getAllClients,
  getClientById,
  updateClient,
  updateServiceClient,
  updateFinishService,
  searchClient,
  getAllClientsById,
};
