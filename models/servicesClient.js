const mongoose = require('mongoose');
const {Schema} = mongoose;

const servicesClientSchema = Schema(
    {
      clientId: mongoose.ObjectId,
      finalizado: Boolean,
      descricaoServico: String,
      valorTotalRecebido: Boolean,
      valorTotal: Number,
      hora: String,
      date: String,
      idMestre: mongoose.ObjectId,
    },
    {
      timestamps: true,
    },
);

const Services = mongoose.model('servicesClients', servicesClientSchema);

module.exports = Services;
