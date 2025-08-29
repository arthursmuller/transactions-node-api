const express = require('express');
const router = express.Router();

function transactionsRoutes(transactionService) {
  const getTransactions = (_, res) => res.json(transactionService.list());

  const addTransaction = (req, res) => {
    try {
      const transaction = transactionService.add(req.body);
      res.status(201).json(transaction);
    } catch (error) {
      if (error.name === 'ValidationError') {
        res.status(400).json({ 
          msg: error.message, 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ msg: 'Internal server error', error: error.message });
      }
    }
  };

  router.get('/', getTransactions);
  router.post('/', addTransaction);

  return router;
}

module.exports = transactionsRoutes