const Income = require('../models/Incomes.js');

exports.getAllExpense = async (req, res) => {
    console.log('hello world');
    try {
        const expenses = await Income.find({type: 'expense'});
        // Send all expenses
        res.status(201).json({
            message: 'Expenses fetched successfully',
            expenses,
        });
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

//create new expense
exports.createNewExpense = async (req, res) => {
    const { userId, name, amount, date, icon } = req.body;

    try {
        // Validate input
        if (!userId || !name || !amount) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create new expense
        const newExpense = new Income({
            user: userId,
            name,
            amount,
            date: date || Date.now(),
            icon: icon || '💰',
            type: 'expense'
        });

        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        console.error('Error creating expense:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

//get expense by id
exports.getExpenseById = async (req, res) => {
    const { id } = req.params;

    try {
        // Find expense by ID and delete
        const deletedExpense = await Income.findByIdAndDelete(id);

        if (!deletedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        console.error('Error deleting expense:', error);
        res.status(500).json({ message: 'Server error' });
    }
}