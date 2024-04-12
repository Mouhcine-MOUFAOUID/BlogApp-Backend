const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const SECRET_KEY = process.env.SECRET_KEY
require('dotenv').config();
const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');
const authRouter = require('./routes/authRoutes');

const middlewareLog = require('./middlewares/middleware');
const errorHandlingMiddleware = require('./middlewares/errMiddleware');

const app = express();
const PORT = process.env.PORT;

app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(express.json())
app.use(cookieParser())

app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/auth', authRouter)

// This is a testing section



//--------------------------------------------------------------------------------------

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});