// __tests__/phonebook.test.js
const Request = require('supertest');
const TestHelper = require('../../../server/helpers/TestHelper');
const helmets = require('../../../server/api/helmet');
const Database = require('../../../server/services/Database');

let server;
describe('APi V1 Query Database', () => {
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
        status: '00000',
        message: 'Success',
        data: "Added 'Arai J' as '2000000' to helmet with stock 5",
        transaction_id: 'A3022407191710363810'
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
        status: '00000',
        message: 'Success',
        data: 'Helmet with id 4 has been updated price to 52.55 and stock to 100 ',
        transaction_id: 'A3022407192129224470'
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
        status: '00000',
        message: 'Success',
        data: 'Delete id 6 successfully',
        transaction_id: 'A3022407192140217440'
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
