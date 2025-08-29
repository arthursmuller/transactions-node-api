const express = require('express');
const cors = require('cors');
const createTransactionRoutes = require('./routes/transactions');
const db = require('./infra/db');
const TransactionService = require('./services/transactions'); 

const app = express();

app.use(cors());
app.use(express.json());

const transactionService = new TransactionService(db);
const transactionRoutes = createTransactionRoutes(transactionService);

app.use('/transactions', transactionRoutes);

module.exports = app;