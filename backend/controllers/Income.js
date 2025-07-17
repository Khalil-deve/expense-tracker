const Income = require('../models/Incomes.js');

//get all income
exports.getAllIncome =  async (req, res) => {
    try {
        const incomes = await Income.find({type: 'income'});
        // Send all incomes
        res.status(201).json({
            message: 'incomes fetched successfully',
            incomes,
        });
    } catch (error) {
        console.error('Error fetching incomes:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

//create new income
exports.createNewIncome = async (req, res) => {
    const { userId, name, amount, date, icon } = req.body;

    try {
        // Validate input
        if (!userId || !name || !amount) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create new expense
        const newIncome = new Income({
            user: userId,
            name,
            amount,
            date: date || Date.now(),
            icon: icon || '💰',
            type: 'income'
        });

        await newIncome.save();
        res.status(201).json(newIncome);
    } catch (error) {
        console.error('Error creating Income:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

//get income by id
exports.getIncomeById = async (req, res) => {
    const { id } = req.params;
    console.log('the income id: ', id);
    try {
        // Find income by ID and delete it
        const deletedIncome = await Income.findByIdAndDelete(id);

        if (!deletedIncome) {
            return res.status(404).json({ message: 'Income not found' });
        }

        res.status(200).json({ message: 'Income deleted successfully' });
    } catch (error) {
        console.error('Error deleting Income:', error);
        res.status(500).json({ message: 'Server error' });
    }
}