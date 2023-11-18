const {expect} = require("@jest/globals")
const {MongoClient} = require('mongodb');

describe('Client Controller', () => {
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

  describe("Cadastrar", () => {
    it('Cadastrar um cliente', async () => {
      const users = db.collection('clients');
    
      const mockClient = {
        _id: "65519880f8a8a5d7cdda2264",
        nome: "Client teste",
        endereco: "Rua teste, 123",
        telefone: "11 99999-9999",
        idMestre: "65519880f8a8a5d7cdda2264",
      };
      await users.insertOne(mockClient);
    
      const insertedUser = await users.findOne({nome: 'Client teste'});
      expect(insertedUser).toEqual(mockClient);
    });
  })

  describe("Update", () => {
    it('Updade de clientes', async () => {
      const users = db.collection('clients');
    
      await users.updateOne({nome: 'Client teste',}, {$set: { endereco: "Tetse de update, 123"}})

      const insertedUser = await users.findOne({nome: 'Client teste'});

      expect(insertedUser.endereco).toBe("Tetse de update, 123");
    });
  })

  describe("Trazer Clientes do banco", () => {
    it('buscar cliente pelo nome', async () => {
      const users = db.collection('clients');

      const insertedUser = await users.findOne({nome: 'Client teste'});
      expect(insertedUser).not.toBeNull();
    });

    it('buscar todos os clientes', async () => {
      const users = db.collection('clients');

      const insertedUser = await users.find({});
      expect(insertedUser).not.toBeNull();
    });
  })

  describe("Deletar usuários", () => {
    it('Deletar usuarios pelo email', async () => {
      const users = db.collection('clients');

      const insertedUser = await users.findOneAndDelete({nome: 'Client teste'});
      expect(insertedUser).not.toBeNull();
    });
  })
});