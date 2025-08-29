const TransactionService = require('./transactions');

const mockDb = {
  transactions: []
};

describe('TransactionService', () => {
  let service;

  beforeEach(() => {
    mockDb.transactions = [];
    service = new TransactionService(mockDb);
  });

  describe('add()', () => {
    it('should add valid transaction to database', () => {
      const transactionData = { description: 'Test transaction', amount: 100 };
      
      const result = service.add(transactionData);
      
      expect(result).toBe(1);
      expect(mockDb.transactions).toHaveLength(1);
      expect(mockDb.transactions[0]).toEqual({
        description: 'Test transaction',
        amount: 100
      });
    });

    it('should add multiple transactions correctly', () => {
      const transaction1 = { description: 'First', amount: 100 };
      const transaction2 = { description: 'Second', amount: 200 };
      
      service.add(transaction1);
      service.add(transaction2);
      
      expect(mockDb.transactions[0].description).toBe('First');
      expect(mockDb.transactions[1].description).toBe('Second');
    });
  });
});