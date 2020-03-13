const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const router = require('./router/router.js')
const errorHandler = require('./middleware/errorHandler.js')
require('dotenv').config()

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

console.log('msuk')
app.use('/',router)
app.use(errorHandler)

app.listen(port,function(){
    console.log('youre listening to '+port)
})
