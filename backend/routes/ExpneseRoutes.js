const router = require('express').Router();
// Middleware to verify token
const verifyToken = require('../middlerwares/verifyToken');
const {getAllExpense, createNewExpense, getExpenseById} = require('../controllers/Expense');

//get all expense
router.get('/expenses',verifyToken, getAllExpense);

//create new expense
router.post('/expenses',verifyToken, createNewExpense);

//get expense by id
router.delete('/expenses/:id',verifyToken, getExpenseById);

module.exports = router;