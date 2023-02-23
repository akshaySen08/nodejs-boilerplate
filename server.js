const express = require('express');
const { errorHandler } = require('./middleware/errorMiddleware');
const dotenv = require('dotenv').config()
const colors = require('colors');
const connectDb = require('./config/db');
const port = process.env.PORT || 5000;
const app = express()
connectDb()

/* For getting body into the request */
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/goals', require('./routes/goalsRouter'))
app.use('/api/users', require('./routes/userRouter'))

/* Middleware for managing errors */
app.use(errorHandler)

app.listen(port, () => console.log("Server is running on " + port))

