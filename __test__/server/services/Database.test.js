const MySQL = require('promise-mysql2');
const {
  getListHelmet,
  addHelmet,
  editHelmet,
  getTypeHelmet,
  deleteHelmet
} = require('../../../server/services/Database');

jest.mock('promise-mysql2', () => {
  const queryMock = jest.fn();
  const releaseMock = jest.fn();
  return {
    createPool: () => ({
      getConnection: () => ({
        query: queryMock,
        release: releaseMock
      })
    })
  };
});

describe('Phonebook CRUD operations', () => {
  let queryMock;
  let releaseMock;

  beforeEach(() => {
    queryMock = MySQL.createPool().getConnection().query;
    releaseMock = MySQL.createPool().getConnection().release;
    jest.clearAllMocks();
  });

  describe('getListHelmet', () => {
    it('should return helmet list', async () => {
      const mockQuery = [
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
      queryMock.mockResolvedValue([mockQuery]);
      const result = await getListHelmet();
      expect(result).toEqual(mockQuery);
      expect(releaseMock).toHaveBeenCalled();
    });

    it('should throw error', async () => {
      const mockError = new Error('Mock error');
      queryMock.mockRejectedValue(mockError);
      await expect(getListHelmet()).rejects.toThrow(mockError);
      expect(releaseMock).toHaveBeenCalled();
    });
  });

  describe('getTypeHelmet', () => {
    it('should return helmet type list', async () => {
      const mockQuery = [
        {
          id: 1,
          name: 'Full Face'
        },
        {
          id: 2,
          name: 'Half Face'
        }
      ];
      queryMock.mockResolvedValue([mockQuery]);
      const result = await getTypeHelmet();
      expect(result).toEqual(mockQuery);
      expect(releaseMock).toHaveBeenCalled();
    });

    it('should throw error', async () => {
      const mockError = new Error('Mock error');
      queryMock.mockRejectedValue(mockError);
      await expect(getTypeHelmet()).rejects.toThrow(mockError);
      expect(releaseMock).toHaveBeenCalled();
    });
  });

  describe('addHelmet', () => {
    it('should successfully add helmet entry', async () => {
      const mockQuery = {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 11,
        serverStatus: 2,
        warningCount: 0,
        message: '',
        protocol41: true,
        changedRows: 0
      };
      queryMock.mockResolvedValue([mockQuery]);
      await addHelmet(1, 'Arai J', 2000000, 5);
      expect(queryMock).toHaveBeenCalled();
      expect(releaseMock).toHaveBeenCalled(); // Check if release was called
    });

    it('should throw error', async () => {
      const mockError = new Error('Mock error');
      queryMock.mockRejectedValue(mockError);
      await expect(addHelmet(1, 'Arai J', 2000000, 5)).rejects.toThrow(mockError);
      expect(releaseMock).toHaveBeenCalled(); // Check if release was called
    });
  });

  describe('editHelmet', () => {
    it('should return true when editing helmet entry', async () => {
      const mockQuery = {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 11,
        serverStatus: 2,
        warningCount: 0,
        message: '',
        protocol41: true,
        changedRows: 0
      };
      queryMock.mockResolvedValue([mockQuery]);
      const result = await editHelmet(1, 52.55, 100);
      expect(result).toBe(true);
      expect(releaseMock).toHaveBeenCalled(); // Check if release was called
    });

    it('should throw error', async () => {
      const mockError = new Error('Mock error');
      queryMock.mockRejectedValue(mockError);
      await expect(editHelmet(1, 52.55, 100)).rejects.toThrow(mockError);
      expect(releaseMock).toHaveBeenCalled(); // Check if release was called
    });
  });

  describe('deleteHelmet', () => {
    it('should return true when delete helmet entry', async () => {
      const mockQuery = {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 11,
        serverStatus: 2,
        warningCount: 0,
        message: '',
        protocol41: true,
        changedRows: 0
      };
      queryMock.mockResolvedValue([mockQuery]);
      const result = await deleteHelmet(6);
      expect(result).toBe(true);
      expect(releaseMock).toHaveBeenCalled();
    });

    it('should throw error', async () => {
      const mockError = new Error('Mock error');
      queryMock.mockRejectedValue(mockError);
      await expect(deleteHelmet(6)).rejects.toThrow(mockError);
      expect(releaseMock).toHaveBeenCalled();
    });
  });
});
