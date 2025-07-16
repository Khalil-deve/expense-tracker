// Load environment variables
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const helmet = require('helmet');

const AuthRouter = require('./routes/AuthRoutes');
const ExpneseRouter = require('./routes/ExpneseRoutes');
const IncomeRouter = require('./routes/IncomeRoutes');


const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path');
const app = express();
const port = process.env.PORT || 3000;


// Connect to MongoDB
connectDB();

//Middleware to handle Cors
app.use(cors({
    origin:process.env.CLIENT_URL || '*',
    methods: ['GET, POST, PUT, DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],  
}));


app.use(helmet());

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.send('Hello world');
});

//AuthRouter
app.use('/auth', AuthRouter);

//Expneses Router
app.use('/dash', ExpneseRouter);

// Incomes Router
app.use('/dash', IncomeRouter);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/expness-tracker/dist')));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});