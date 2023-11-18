const {expect} = require("@jest/globals")
const {MongoClient} = require('mongodb');

describe('Services Controller', () => {
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
    it('Cadastrar um serviço', async () => {
      const users = db.collection('servicesclients');
    
      const mockService = {
        _id: "65519880f8a8a5d7cdda2264",
        clientId: "65519880f8a8a5d7cdda2264",
        descricaoServico: "Colocar o box no banheiro",
        valorTotal: "2000",
        hora: "08:00",
        date: "15/11/2023",
        idMestre: "65519880f8a8a5d7cdda2264",
      };
      await users.insertOne(mockService);
    
      const insertedUser = await users.findOne({clientId: '65519880f8a8a5d7cdda2264'});
      expect(insertedUser).toEqual(mockService);
    });
  })

  describe("Update", () => {
    it('Updade de serviços', async () => {
      const users = db.collection('servicesclients');
    
      await users.updateOne({clientId: '65519880f8a8a5d7cdda2264',}, {$set: { valorTotal: "3000"}})

      const insertedUser = await users.findOne({clientId: '65519880f8a8a5d7cdda2264'});

      expect(insertedUser.valorTotal).toBe("3000");
    });
  })

  describe("Trazer serviços do banco", () => {
    it('buscar serviço pelo clientID', async () => {
      const users = db.collection('servicesclients');

      const insertedUser = await users.findOne({clientId: '65519880f8a8a5d7cdda2264'});
      expect(insertedUser).not.toBeNull();
    });

    it('buscar todos os serviços', async () => {
      const users = db.collection('servicesclients');

      const insertedUser = await users.find({});
      expect(insertedUser).not.toBeNull();
    });
  })

  describe("Deletar usuários", () => {
    it('Deletar serviços pelo clientId', async () => {
      const users = db.collection('servicesclients');

      const insertedUser = await users.findOneAndDelete({clientId: '65519880f8a8a5d7cdda2264'});
      expect(insertedUser).not.toBeNull();
    });
  })
});