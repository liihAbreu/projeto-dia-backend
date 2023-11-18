const mongoose = require('mongoose');
const {Schema} = mongoose;

const historicSchema = Schema(
    {
      nome: String,
      data: String,
      hora: String,
      acao: String,
      descricaoServico: String,
      clientId: mongoose.ObjectId,
    },
    {
      timestamps: true,
    },
);

const Historic = mongoose.model('historic', historicSchema);

module.exports = Historic;
