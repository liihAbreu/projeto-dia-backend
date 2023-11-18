const mongoose = require('mongoose');
const {Schema} = mongoose;

const clientSchema = Schema(
    {
      nome: String,
      endereco: String,
      telefone: String,
      idMestre: mongoose.ObjectId,
    },
    {
      timestamps: true,
    },
);

const Client = mongoose.model('Clients', clientSchema);

module.exports = Client;
