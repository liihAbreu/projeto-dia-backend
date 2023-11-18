const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema(
    {
      name: String,
      email: String,
      password: String,
      profileImage: String,
      perfil: String,
      sub: String,
      idMestre: mongoose.ObjectId,
    },
    {
      timestamps: true,
    },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
