const {expect} = require("@jest/globals")
const {MongoClient} = require('mongodb');

describe('Historic Controller', () => {
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
    it('Cadastrar o historico de alterações', async () => {
      const users = db.collection('historics');
    
      const mockHistoric = {
        _id: "65519880f8a8a5d7cdda2264",
        nome: "Teste Historico",
        data: "13/11/2023",
        hora: "08:00",
        acao: "Cadastrou um serviço",
        descricaoServico: "Colocar box no banheiro",
        clientId: "65519880f8a8a5d7cdda2264" ,
      };
      await users.insertOne(mockHistoric);
    
      const insertedUser = await users.findOne({clientId: '65519880f8a8a5d7cdda2264'});
      expect(insertedUser).toEqual(mockHistoric);
    });
  })

  describe("Update", () => {
    it('Updade de serviços', async () => {
      const users = db.collection('historics');
    
      await users.updateOne({clientId: '65519880f8a8a5d7cdda2264',}, {$set: { acao: "altereou o serviço"}})

      const insertedUser = await users.findOne({clientId: '65519880f8a8a5d7cdda2264'});

      expect(insertedUser.acao).toBe("altereou o serviço");
    });
  })

  describe("Trazer historicos do banco", () => {
    it('buscar historico pelo clientID', async () => {
      const users = db.collection('historics');

      const insertedUser = await users.findOne({clientId: '65519880f8a8a5d7cdda2264'});
      expect(insertedUser).not.toBeNull();
    });
  })
});