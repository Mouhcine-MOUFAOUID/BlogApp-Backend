const express = require('express');
const mongoose = require('./models/mongodb');
require('dotenv').config();
const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');
const authRouter = require('./routes/authRoutes');

const middlewareLog = require('./middlewares/middleware');
const errorHandlingMiddleware = require('./middlewares/errMiddleware');


const app = express();
const PORT = process.env.PORT;

app.use(express.json())

app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/auth', authRouter)


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});