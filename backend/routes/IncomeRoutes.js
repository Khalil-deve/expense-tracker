const router = require('express').Router();
const verifyToken = require('../middlerwares/verifyToken');
const {getAllIncome, createNewIncome, getIncomeById} = require('../controllers/Income');

//get all incomes
router.get('/incomes',verifyToken, getAllIncome);

//create new income
router.post('/incomes',verifyToken, createNewIncome);

//get income by id
router.delete('/incomes/:id', verifyToken, getIncomeById);

module.exports = router;