const express = require('express');
const chats = require('./data/data.js');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const app = express();
const colors = require('colors');
const userRoutes = require('./routes/userRoutes.js');
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');


dotenv.config();

connectDB();
app.use(express.json()); // accept json data

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.get('/api/chat', (req, res) => {
    res.send(chats);
});

app.get('/api/chat/:id', (req, res) => {
    // console.log(req.params.id);
    const singleChat = chats.find((c) => c._id === req.params.id);
    res.send(singleChat);
});

app.use('/api/user', userRoutes);

// error handling middleware
app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server started on port ${PORT}`.yellow.bold));

