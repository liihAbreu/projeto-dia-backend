const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const mongoose = require('mongoose');

// Generate user Token
const generateToken = (id) => {
  return jwt.sign({id}, jwtSecret, {
    expiresIn: '7d',
  });
};

// register user and Sing in
const register = async (req, res) => {
  const {name, email, password, perfil} = req.body;

  // check if user exists
  const user = await User.findOne({email});

  if (user) {
    res.status(422).json({errors: ['Email já cadastrado.']});
    return;
  }

  // Generate password hash
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  // Create user
  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
    perfil,
    idMestre: new mongoose.Types.ObjectId,
  });

  // If user was created sucessfully, return the token
  if (!newUser) {
    res.status(422).json({
      errors: ['Houve um erro, por favor tente novamente mais tarde.'],
    });
    return;
  }

  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
    perfil: newUser.perfil,
    name: newUser.name,
    idMestre: newUser.idMestre,
  });
};

// register user and Sing in
const registerEmployee = async (req, res) => {
  const {name, email, password, perfil, idMestre} = req.body;

  // check if user exists
  const user = await User.findOne({email});

  if (user) {
    res.status(422).json({errors: ['Email já cadastrado.']});
    return;
  }

  // Generate password hash
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  // Create user
  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
    perfil,
    idMestre,
  });

  // If user was created sucessfully, return the token
  if (!newUser) {
    res.status(422).json({
      errors: ['Houve um erro, por favor tente novamente mais tarde.'],
    });
    return;
  }

  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
    perfil: newUser.perfil,
    name: newUser.name,
    idMestre: newUser.idMestre,
  });
};

// register user and Sing in with OAuth
const registerAuth = async (req, res) => {
  const {name, email, perfil} = req.body;

  // check if user exists
  const user = await User.findOne({email});

  if (user) {
    res.status(422).json({errors: ['Email já cadastrado.']});
    return;
  }
  // Create user
  const newUser = await User.create({
    name,
    email,
    perfil,
    idMestre: new mongoose.Types.ObjectId,
  });

  // If user was created sucessfully, return the token
  if (!newUser) {
    res.status(422).json({
      errors: ['Houve um erro, por favor tente novamente mais tarde.'],
    });
    return;
  }

  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
    perfil: newUser.perfil,
    name: newUser.name,
    idMestre: newUser.idMestre,
  });
};

// Sign user in
const login = async (req, res) => {
  const {email, password} = req.body;

  const user = await User.findOne({email});

  // Check if user exists
  if (!user) {
    res.status(404).json({errors: ['Usuário não encontrado!']});
    return;
  }

  // Check if password matches
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(422).json({errors: ['Senha inválida!']});
    return;
  }

  // Return user with token
  res.status(200).json({
    _id: user._id,
    profileImage: user.profileImage,
    token: generateToken(user._id),
    perfil: user.perfil,
    name: user.name,
    idMestre: user.idMestre,
  });
};

// Sign user in with Oauth
const loginOAuth = async (req, res) => {
  const {email, sub} = req.body;

  const user = await User.findOne({email});

  // Check if user exists
  if (!user) {
    res.status(404).json({errors: ['Usuário não encontrado!']});
    return;
  }

  if (sub === user.sub) {
    // Return user with token
    res.status(200).json({
      _id: user._id,
      profileImage: user.profileImage,


      token: generateToken(user._id),
      perfil: user.perfil,
      sub: user.sub,
      name: user.name,
      idMestre: user.idMestre,
    });
  }
};

// Get current logged in user
const getCurrentUser = (req, res) => {
  const user = req.user;

  res.status(201).json(user);
};

// Update an user
const update = async (req, res) => {
  const {name, password, perfil} = req.body;
  let profileImage = null;

  if (req.file) {
    profileImage = req.file.filename;
  }

  const reqUser = req.user;
  const user = await User.findById(new mongoose.Types.ObjectId(reqUser._id)).select('-password');

  if (name) {
    user.name = name;
  }

  if (password) {
    // Generate password hash
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    user.password = passwordHash;
  }


  if (profileImage) {
    user.profileImage = profileImage;
  }

  if (perfil) {
    user.perfil = perfil;
  }

  await user.save();

  res.status(200).json(user);
};

// Get user by id
const getUserById = async (req, res) => {
  try {
    const {id} = req.params;
    const user = await User.findById(new mongoose.Types.ObjectId(id)).select('-password');

    // Check if user exists
    if (!user) {
      res.status(404).json({errors: ['Usuário não encontado.']});
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({errors: ['Usuário não encontado.']});
    return;
  }
};

// Get users by id
const getAllUsersById = async (req, res) => {
  const {id} = req.params;
  const users = await User.find({idMestre: id}).sort([['name', 1]]).exec();

  // Check  if service exists
  if (!users) {
    res.status(404).json({errors: ['Usuário não encontrado.']});
    return;
  }

  res.status(200).json(users);
};

// Get All users
const getAllUsers = async (req, res) => {
  try {
    const user = await User.find({}).sort([['createdAt', -1]]).exec();

    // Check if user exists
    if (!user) {
      res.status(404).json({errors: ['Usuário não encontado.']});
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({errors: ['Usuário não encontado.']});
    return;
  }
};

// Search employee by title
const searchEmployee = async (req, res) => {
  const {q} = req.query;
  const user = await User.find({name: new RegExp(q, 'i')}).exec();
  res.status(200).json(user);
};

// Update an employee
const updateEmployee = async (req, res) => {
  const {name, password, perfil, _id} = req.body;
  let profileImage = null;

  if (req.file) {
    profileImage = req.file.filename;
  }

  const user = await User.findById(new mongoose.Types.ObjectId(_id)).select('-password');

  if (name) {
    user.name = name;
  }

  if (password) {
    // Generate password hash
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    user.password = passwordHash;
  }


  if (profileImage) {
    user.profileImage = profileImage;
  }

  if (perfil) {
    user.perfil = perfil;
  }

  await user.save();

  res.status(200).json(user);
};

// Remove a user on DB
const deleteUser = async (req, res) => {
  const {id} = req.params;

  try {
    const user = await User.findById(new mongoose.Types.ObjectId(id));

    // check if user exixst
    if (!user) {
      res.status(404).json({errors: ['Usuário não encontrada.']});
      return;
    }

    await User.findByIdAndDelete(user._id);


    res.status(200).json({id: user._id, message: 'Usuário excluído com sucesso.'});
  } catch (error) {
    res.status(404).json({errors: ['Id do usuário incorreto.']});
    console.log(error);
  }
};


module.exports = {
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
  getAllUsersById,
};
