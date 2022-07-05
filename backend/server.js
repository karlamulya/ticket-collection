const express = require('express')
const colors = require('colors')
const dotenv = require("dotenv").config()
const connectDb = require('./config/db')
const {errorHandler}= require('./middleware/errorMiddleware')
const PORT = process.env.PORT || 5000
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.get('/',(req, res)=>{
    res.status(200).json({message:'welcome to ticket app'})
})

//connect to database
connectDb()

//Routes
app.use('/api/users', require('./routes/userRoute'))
app.use('/api/tickets', require('./routes/ticketRoute'))
app.use(errorHandler)
app.listen(PORT, ()=>console.log(`SERVER started on ${PORT}`))