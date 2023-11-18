const {expect} = require("@jest/globals")
const {MongoClient} = require('mongodb');

describe('User Controller', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db();
  });

  afterAll(async () => {
    await connection.close();
  });

  describe("Registro de usuários", () => {
    it('Registrarum usuário', async () => {
      const users = db.collection('users');
    
      const mockUser = {
        _id: "65519880f8a8a5d7cdda2264",
        name: "Tetse Jest", 
        email: "teste@jest.com", 
        password: "teste123", 
        perfil: "administrador",
        idMestre: "6528b953c891d92b3b695e09"
      };
      await users.insertOne(mockUser);
    
      const insertedUser = await users.findOne({email: 'teste@jest.com'});
      expect(insertedUser).toEqual(mockUser);
    });

    it('Registrar um funcionário', async () => {
      const users = db.collection('users');
    
      const mockUser = {
        name: "Tetse funcionario", 
        email: "teste@funcionario.com", 
        password: "teste123", 
        perfil: "funcionario",
        idMestre: "6528b953c891d92b3b695e09"
      };
      await users.insertOne(mockUser);
    
      const insertedUser = await users.findOne({email: 'teste@funcionario.com'});
      expect(insertedUser).toEqual(mockUser);
    });

    it('Registrar um usuário atravez do auth do google', async () => {
      const users = db.collection('users');
    
      const mockUser = {
        name: "Tetse Auth", 
        email: "teste@auth.com", 
        perfil: "administrador",
        idMestre: "6528b953c891d92b3b695e09"
      };
      await users.insertOne(mockUser);
    
      const insertedUser = await users.findOne({email: 'teste@auth.com'});
      expect(insertedUser).toEqual(mockUser);
    });
  })

  describe("Login de usuários", () => {
    it('Login de usuário', async () => {
      const users = db.collection('users');
    
      const mockUser = {
        _id: "65519880f8a8a5d7cdda2264",
        name: "Tetse Jest", 
        email: "teste@jest.com", 
        password: "teste123", 
        perfil: "administrador",
        idMestre: "6528b953c891d92b3b695e09"  
      };
    
      const insertedUser = await users.findOne({email: 'teste@jest.com'});
      expect(insertedUser).not.toBeNull();
    });

    it('Login com o Auth', async () => {
      const users = db.collection('users');
    
      const mockUser = {
        _id: "65519d2a2600c7ec47f58af1",
        name: "Tetse Auth", 
        email: "teste@auth.com", 
        perfil: "administrador",
        idMestre: "6528b953c891d92b3b695e09"  
      };
    
      const insertedUser = await users.findOne({email: 'teste@auth.com'});
      expect(insertedUser).not.toBeNull();
    });
  })

  describe("Update de Usuário", () => {
    it('Updade de usuário', async () => {
      const users = db.collection('users');
    
      await users.updateOne({email: "teste@jest.com",}, {$set: { name: "Tetse Update"}})

      const insertedUser = await users.findOne({email: 'teste@jest.com'});

      expect(insertedUser.name).toBe("Tetse Update");
    });
  })

  describe("Trazer usuários do banco", () => {
    it('buscar usuário pelo email', async () => {
      const users = db.collection('users');

      const insertedUser = await users.findOne({email: 'teste@jest.com'});
      expect(insertedUser).not.toBeNull();
    });

    it('buscar todos os usuários', async () => {
      const users = db.collection('users');

      const insertedUser = await users.find({});
      expect(insertedUser).not.toBeNull();
    });
  })

  describe("Deletar usuários", () => {
    it('Deletar usuarios pelo email', async () => {
      const users = db.collection('users');

      const insertedUser = await users.findOneAndDelete({email: 'teste@jest.com'});
      expect(insertedUser).not.toBeNull();
    });
  })
});