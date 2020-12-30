const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const path = require('path')

//Routers import 
const userRoute = require('./routers/userRoute')
const transactionRoute = require('./routers/transactionRoute')

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(passport.initialize())
require('./utils/passport')(passport)


if(process.env.NODE_ENV === 'production'){
     app.use(express.static('client/build'))
     app.get('*',(req,res) => {
         req.sendFile(path.resolve(__dirname,'client','build','index.html'))
     })
}

// set Routers
app.use('/api/transactions',transactionRoute)
app.use('/api/users',userRoute)


app.get('/',(req, res, next) =>{
    return res.json({
        message: 'Welcome'
    })
})

app.get('*',(req, res, next) =>{
    return res.status(404).json({
        message: 'Page Not Found'
    })
})







//server section

const url = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.ltldm.mongodb.net/moneyManagement?retryWrites=true&w=majority`
   
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify:false })
    .then(() => {
        const port = process.env.PORT || 4000

        app.listen(port, () => {
            console.log('Server is running ' + port);
            console.log('Database connect..')
        })
        
    })
    .catch((e)=>{
        return console.log(e)
    })