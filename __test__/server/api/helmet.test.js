// __tests__/phonebook.test.js
const Request = require('supertest');
const TestHelper = require('../../../server/helpers/TestHelper');
const helmets = require('../../../server/api/helmet');
const helmetsv2 = require('../../../server/api/helmetv2');
const Database = require('../../../server/services/Database');
const Prisma = require('../../../server/services/Prisma');

let server;
describe('API V1 Query Database', () => {
  describe('GET v1/helmet', () => {
    beforeAll(() => {
      server = TestHelper.createTestServer('/api/v1/helmet', helmets);
    });

    afterAll(async () => {
      await server.close();
    });

    test('should return 200 and helmet list, when get list helmet', async () => {
      const mockHelmetList = [
        {
          id: 5,
          name: 'Arai',
          price: 10000,
          stock: 5,
          type: 'Full Face'
        },
        {
          id: 6,
          name: 'Arai J',
          price: 2000000,
          stock: 5,
          type: 'Full Face'
        }
      ];
      jest.spyOn(Database, 'getListHelmet').mockResolvedValue(mockHelmetList);

      const response = await Request(server).get('/api/v1/helmet');
      expect(response.status).toBe(200);
    });

    test('should return 404 when helmet not found', async () => {
      jest.spyOn(Database, 'getListHelmet').mockResolvedValue([]);

      const response = await Request(server).get('/api/v1/helmet');
      expect(response.status).toBe(404);
    });

    test('should return 400 when helmet not found', async () => {
      jest.spyOn(Database, 'getListHelmet').mockResolvedValue([]);

      const response = await Request(server).get('/api/v1/helmet');
      expect(response.status).toBe(404);
    });

    test('should return 500 when get error', async () => {
      const mockError = new Error('An internal server error occurred');
      jest.spyOn(Database, 'getListHelmet').mockImplementationOnce(() => {
        throw mockError;
      });

      const response = await Request(server).get('/api/v1/helmet');
      expect(response.status).toBe(500);
    });
  });

  describe('GET v1/helmet/type', () => {
    beforeAll(() => {
      server = TestHelper.createTestServer('/api/v1/helmet/type', helmets);
    });

    afterAll(async () => {
      await server.close();
    });

    test('should return 200 and helmet type list, when get list helmet type', async () => {
      const mockHelmetList = [
        {
          id: 1,
          name: 'Full Face'
        },
        {
          id: 2,
          name: 'Half Face'
        }
      ];
      jest.spyOn(Database, 'getTypeHelmet').mockResolvedValue(mockHelmetList);

      const response = await Request(server).get('/api/v1/helmet/type');
      expect(response.status).toBe(200);
    });

    test('should return 404 when helmet not found', async () => {
      jest.spyOn(Database, 'getTypeHelmet').mockResolvedValue([]);

      const response = await Request(server).get('/api/v1/helmet/type');
      expect(response.status).toBe(404);
    });

    test('should return 400 when helmet not found', async () => {
      jest.spyOn(Database, 'getTypeHelmet').mockResolvedValue([]);

      const response = await Request(server).get('/api/v1/helmet/type');
      expect(response.status).toBe(404);
    });

    test('should return 500 when get error', async () => {
      const mockError = new Error('An internal server error occurred');
      jest.spyOn(Database, 'getTypeHelmet').mockImplementationOnce(() => {
        throw mockError;
      });

      const response = await Request(server).get('/api/v1/helmet/type');
      expect(response.status).toBe(500);
    });
  });

  describe('POST v1/helmet/add_helmet', () => {
    beforeAll(() => {
      server = TestHelper.createTestServer('/api/v1/helmet/type', helmets);
    });

    afterAll(async () => {
      await server.close();
    });

    test('should return 200, when add new helmet', async () => {
      const mockAddHelmetList = {
        data: "Added 'Arai J' as '2000000' to helmet with stock 5"
      };

      jest.spyOn(Database, 'addHelmet').mockResolvedValue(mockAddHelmetList);
      const response = await Request(server).post('/api/v1/helmet/add_helmet').send({
        type: 1,
        name: 'Arai J',
        price: 2000000,
        stock: 5
      });
      expect(response.status).toBe(200);
    });

    test('should return 400, when input not valid', async () => {
      jest.spyOn(Database, 'addHelmet').mockResolvedValue([]);

      const response = await Request(server).post('/api/v1/helmet/add_helmet').send({
        type: 1
      });
      expect(response.status).toBe(400);
    });

    test('should return 500 when get error', async () => {
      const mockError = new Error('An internal server error occurred');
      jest.spyOn(Database, 'addHelmet').mockImplementationOnce(() => {
        throw mockError;
      });

      const response = await Request(server).post('/api/v1/helmet/add_helmet').send({
        type: 1,
        name: 'Arai J',
        price: 2000000,
        stock: 5
      });
      expect(response.status).toBe(500);
    });
  });

  describe('PUT v1/helmet/edit_helmet/:id', () => {
    beforeAll(() => {
      server = TestHelper.createTestServer('/api/v1/helmet/edit_helmet/1', helmets);
    });

    afterAll(async () => {
      await server.close();
    });

    test('should return 200, when edit helmet', async () => {
      const mockEditHelmetList = {
        data: 'Helmet with id 4 has been updated price to 52.55 and stock to 100 '
      };
      jest.spyOn(Database, 'editHelmet').mockResolvedValue(mockEditHelmetList);
      const response = await Request(server).put('/api/v1/helmet/edit_helmet/4').send({
        price: 52.55,
        stock: 100
      });
      expect(response.status).toBe(200);
    });
    test('should return 404, when helmet not found', async () => {
      jest.spyOn(Database, 'editHelmet').mockResolvedValue();

      const response = await Request(server).put('/api/v1/helmet/edit_helmet/1').send({
        price: 52.55,
        stock: 100
      });
      expect(response.status).toBe(404);
    });

    test('should return 500, when get error', async () => {
      const mockError = new Error('An internal server error occurred');
      jest.spyOn(Database, 'editHelmet').mockImplementationOnce(() => {
        throw mockError;
      });

      const response = await Request(server).put('/api/v1/helmet/edit_helmet/4').send({
        price: 52.55,
        stock: 100
      });
      expect(response.status).toBe(500);
    });

    test('should return 400, when input not valid', async () => {
      jest.spyOn(Database, 'editHelmet').mockResolvedValue();

      const response = await Request(server).put('/api/v1/helmet/edit_helmet/1').send({
        price: 52.55
      });
      expect(response.status).toBe(400);
    });
  });

  describe('DELETE v1/helmet/delete/:id', () => {
    beforeAll(() => {
      server = TestHelper.createTestServer('/api/v1/helmet', helmets);
    });

    afterAll(async () => {
      await server.close();
    });

    test('should return 200, when delete helmet', async () => {
      const mockDeleteHelmetList = {
        data: 'Delete id 6 successfully'
      };

      jest.spyOn(Database, 'deleteHelmet').mockResolvedValue(mockDeleteHelmetList);
      const response = await Request(server).delete('/api/v1/helmet/delete/6');
      expect(response.status).toBe(200);
    });

    test('should return 404, when id helmet not found', async () => {
      jest.spyOn(Database, 'deleteHelmet').mockResolvedValue();

      const response = await Request(server).delete('/api/v1/helmet/delete/0');
      expect(response.status).toBe(404);
    });

    test('should return 500 when get error', async () => {
      const mockError = new Error('An internal server error occurred');
      jest.spyOn(Database, 'deleteHelmet').mockImplementationOnce(() => {
        throw mockError;
      });

      const response = await Request(server).delete('/api/v1/helmet/delete/6');
      expect(response.status).toBe(500);
    });
  });
});

describe('API V2 ORM', () => {
  beforeAll(() => {
    server = TestHelper.createTestServer('/api/v2/helmet', helmetsv2);
  });

  afterAll(async () => {
    await server.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /v2/helmet', () => {
    it('should return 200 and helmet list, when get list helmet', async () => {
      const mockHelmetList = [
        {
          id: 1,
          name: 'Arai J',
          price: 2000000,
          stock: 5,
          type: 'Full Face'
        },
        {
          id: 2,
          name: 'Arai B',
          price: 2500000,
          stock: 100,
          type: 'Full Face'
        }
      ];

      jest.spyOn(Prisma, 'getListHelmet').mockResolvedValue(mockHelmetList);

      const response = await Request(server).get('/api/v2/helmet');
      expect(response.status).toBe(200);
    });

    it('should return 404 when helmet not found', async () => {
      jest.spyOn(Prisma, 'getListHelmet').mockResolvedValue([]);
      const response = await Request(server).get('/api/v2/helmet');
      expect(response.status).toBe(404);
    });

    it('should return 500 when error', async () => {
      jest.spyOn(Prisma, 'getListHelmet').mockRejectedValue(new Error('Mock error'));
      const response = await Request(server).get('/api/v2/helmet');
      expect(response.status).toBe(500);
    });
  });

  describe('GET /v2/helmet/type', () => {
    it('should return 200 and helmet list, when get list helmet', async () => {
      const mockHelmetList = [
        {
          id: 1,
          name: 'Full Face'
        },
        {
          id: 2,
          name: 'Half Face'
        }
      ];

      jest.spyOn(Prisma, 'getTypeHelmet').mockResolvedValue(mockHelmetList);

      const response = await Request(server).get('/api/v2/helmet/type');
      expect(response.status).toBe(200);
    });

    it('should return 404 when helmet not found', async () => {
      jest.spyOn(Prisma, 'getTypeHelmet').mockResolvedValue([]);
      const response = await Request(server).get('/api/v2/helmet/type');
      expect(response.status).toBe(404);
    });

    it('should return 500 when error', async () => {
      jest.spyOn(Prisma, 'getTypeHelmet').mockRejectedValue(new Error('Mock error'));
      const response = await Request(server).get('/api/v2/helmet/type');
      expect(response.status).toBe(500);
    });
  });

  describe('POST /v2/helmet', () => {
    it('should return 200 and success message, when add helmet', async () => {
      jest.spyOn(Prisma, 'addHelmet').mockResolvedValue('success');
      const response = await Request(server).post('/api/v2/helmet/add_helmet').send({
        type: 1,
        name: 'Arai Z',
        price: 25000,
        stock: 10
      });
      expect(response.status).toBe(200);
    });

    it('should return 500 when error', async () => {
      jest.spyOn(Prisma, 'addHelmet').mockRejectedValue(new Error('Mock error'));
      const response = await Request(server).post('/api/v2/helmet/add_helmet').send({
        type: 1,
        name: 'Arai Z',
        price: 25000,
        stock: 10
      });
      expect(response.status).toBe(500);
    });
  });

  describe('PUT /v2/edit_helmet/:id', () => {
    it('should return 200 and success message, when edit helmet', async () => {
      jest.spyOn(Prisma, 'editHelmet').mockResolvedValue({
        data: 'Helmet with id 9 has been updated price to 5255 and stock to 100 '
      });
      const response = await Request(server).put('/api/v2/helmet/edit_helmet/2').send({
        price: 5255,
        stock: 100
      });
      expect(response.status).toBe(200);
    });

    it('should return 400 and success message, incorrect body', async () => {
      const response = await Request(server).put('/api/v2/helmet/edit_helmet/2').send({
        price: 5255,
        stockasld: 100
      });
      expect(response.status).toBe(400);
    });

    it('should return 404 when helmet not found', async () => {
      jest.spyOn(Prisma, 'editHelmet').mockResolvedValue(false);
      const response = await Request(server).put('/api/v2/helmet/edit_helmet/2').send({
        price: 5255,
        stock: 100
      });
      expect(response.status).toBe(404);
    });

    it('should return 500 when error', async () => {
      jest.spyOn(Prisma, 'editHelmet').mockRejectedValue(new Error('Mock error'));
      const response = await Request(server).put('/api/v2/helmet/edit_helmet/2').send({
        price: 5255,
        stock: 100
      });
      expect(response.status).toBe(500);
    });
  });

  describe('DELETE /v1/helmet/delete/:id', () => {
    it('should return 200 and success message, when delete helmet', async () => {
      jest.spyOn(Prisma, 'deleteHelmet').mockResolvedValue({ data: 'Delete id 9 successfully' });
      const response = await Request(server).delete('/api/v2/helmet/delete/9');
      expect(response.status).toBe(200);
    });

    it('should return 404 when helmet not found', async () => {
      jest.spyOn(Prisma, 'deleteHelmet').mockResolvedValue(false);
      const response = await Request(server).delete('/api/v2/helmet/delete/9');
      expect(response.status).toBe(404);
    });

    it('should return 500 when error', async () => {
      jest.spyOn(Prisma, 'deleteHelmet').mockRejectedValue(new Error('Mock error'));
      const response = await Request(server).delete('/api/v2/helmet/delete/9');
      expect(response.status).toBe(500);
    });
  });
});
