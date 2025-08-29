const ValidationError = require('../helpers/validation.error')

class TransactionService {
  constructor(db) {
   // move db access to repos.
    this.db = db;
  }
  
  // add paginatio here in case i have time left.
  list() {
    return this.db.transactions; 
  }

  validate(transactionData) {
    const { description, amount } = transactionData;
    const errors = [];

    if (typeof description !== 'string' || description.trim() === '') {
      errors.push('Description is empt');
    } else if (description.trim().length > 150) {
      errors.push('description exceded length');
    }

    const validatedAmount = Number(amount);
    if (amount === undefined || isNaN(validatedAmount) || !isFinite(validatedAmount) || validatedAmount <= 0) {
      errors.push('Amount is not valid.');
    }

    if (errors.length > 0) {
      throw new ValidationError('Invalid transaction data', errors);
    }

    return {
      description: description.trim(),
      amount: validatedAmount
    };
  }

  add(transactionData) {
    const validatedData = this.validate(transactionData);
    return this.db.transactions.push(validatedData);
  }
}

module.exports = TransactionService