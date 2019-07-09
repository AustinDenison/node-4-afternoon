require("dotenv").config({path: __dirname + '/../.env'})
const express = require('express')
const session = require('express-session')
const {SERVER_PORT, SESSION_SECRET} = process.env
const checkForSession = require('./middlewares/checkForSession')
const sc = require('./controllers/swagController')
const auth = require('./controllers/authController')
const cart = require('./controllers/cartController')
const search = require('./controllers/searchController')

const app = express()
app.use(express.json())

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(checkForSession)
app.use(express.static(`${__dirname}/../build`))

app.get('/api/swag', sc.read)
app.post('/api/login', auth.login)
app.post('/api/register', auth.register)
app.post('/api/signout', auth.signout)
app.get('/api/user', auth.getUser)
app.post('/api/checkout', cart.checkout)
app.post('/api/cart/:id', cart.add)
app.delete('/api/cart/:id', cart.delete)
app.get('/api/search', search.search)

app.listen(SERVER_PORT, () => {
    console.log(`port is running on ${SERVER_PORT}`)
})