/*
  Purpose:
    - This is where we will route requests to controllers, which ideally is a 1:1 relationship
    - Should contain absolutely no business logic or complexity
    - Each route should represent an endpoint for the API
    - Example: Routes a /todo/:id request to the todo.getTodo controller, etc
*/

const express = require('express');
const contract = require('../controllers/contract');

const router = express.Router();


// Receipt Routes
router.post('/contract', );
router.get('/receipt', receipt.getReceipts);
router.get('/receipt/:id', receipt.getReceiptByID);
router.get('/receipt/:userID', receipt.getReceiptsByUserID);
router.delete('/receipt/:id', receipt.deleteReceipt);

module.exports = router;