const { PrismaClient } = require('@prisma/client');
const {
  getListHelmet,
  getTypeHelmet,
  deleteHelmet,
  addHelmet,
  editHelmet
} = require('../../../server/services/Prisma');

// Mock PrismaClient and its methods
jest.mock('@prisma/client', () => {
  const findManyMock = jest.fn();
  const createMock = jest.fn();
  const updateMock = jest.fn();
  const deleteMock = jest.fn();
  class PrismaClientMock {
    constructor() {
      this.helmets = {
        findMany: findManyMock,
        create: createMock,
        update: updateMock,
        delete: deleteMock
      };
      this.type = {
        findMany: findManyMock
      };
      this.$disconnect = () => {};
    }
  }
  return {
    PrismaClient: PrismaClientMock
  };
});

describe('Prisma-based Helmet CRUD operations', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getListHelmet', () => {
    it('should return helmet list', async () => {
      const mockData = [
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

      const prismaMock = new PrismaClient();
      prismaMock.helmets.findMany.mockResolvedValue(mockData);

      const result = await getListHelmet();

      expect(result).toEqual(mockData);
      expect(prismaMock.helmets.findMany).toHaveBeenCalled();
    });

    it('should throw error', async () => {
      const mockError = new Error('Mock error');
      const prismaMock = new PrismaClient();
      prismaMock.helmets.findMany.mockRejectedValue(mockError);

      await expect(getListHelmet()).rejects.toThrow(mockError);
      expect(prismaMock.helmets.findMany).toHaveBeenCalled();
    });
  });

  describe('getTypeHelmet', () => {
    it('should return helmet type list', async () => {
      const mockData = [
        {
          id: 1,
          name: 'Full Face'
        },
        {
          id: 2,
          name: 'Half Face'
        }
      ];

      const prismaMock = new PrismaClient();
      prismaMock.type.findMany.mockResolvedValue(mockData);

      const result = await getTypeHelmet();

      expect(result).toEqual(mockData);
      expect(prismaMock.type.findMany).toHaveBeenCalled();
    });

    it('should throw error', async () => {
      const mockError = new Error('Mock error');
      const prismaMock = new PrismaClient();
      prismaMock.type.findMany.mockRejectedValue(mockError);

      await expect(getTypeHelmet()).rejects.toThrow(mockError);
      expect(prismaMock.type.findMany).toHaveBeenCalled();
    });
  });

  describe('addHelmet', () => {
    it('should successfully add helmet entry', async () => {
      const prismaMock = new PrismaClient();
      prismaMock.helmets.create.mockResolvedValue('success');
      await addHelmet(2, 'Arai Z', 2500000, 10);
      expect(prismaMock.helmets.create).toHaveBeenCalled();
    });
  });

  describe('editHelmet', () => {
    it('should successfully edit helmets entry', async () => {
      const prismaMock = new PrismaClient();
      prismaMock.helmets.update.mockResolvedValue({
        id: 2,
        name: 'Arai B',
        price: 2500000,
        stock: 100,
        type: 'Full Face'
      });
      await editHelmet(5255, 100);
      expect(prismaMock.helmets.update).toHaveBeenCalled();
    });

    it('should throw error', async () => {
      const mockError = { code: 'P2025' };
      const prismaMock = new PrismaClient();
      prismaMock.helmets.update.mockRejectedValue(mockError);
      const result = await editHelmet(5255, 100);
      expect(result).toBe(false);
      expect(prismaMock.helmets.update).toHaveBeenCalled();
    });
  });

  describe('deleteHelmet', () => {
    it('should successfully delete helmets entry', async () => {
      const prismaMock = new PrismaClient();
      prismaMock.helmets.delete.mockResolvedValue({
        id: 2,
        name: 'Arai B',
        price: 2500000,
        stock: 100,
        type: 'Full Face'
      });
      await deleteHelmet(2);
      expect(prismaMock.helmets.delete).toHaveBeenCalled();
    });
  });
});
