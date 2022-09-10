const express = require('express')
const indexRouter = require('./routes/index')
const error404 = require('./middleware/err-404')

const app = express()
app.use(express.json())

app.use(
    '/api/books/:id/download', express.static(__dirname + '/public/books')
);
app.use('/', indexRouter)
app.use(error404)



const PORT = process.env.PORT || 7070
app.listen(PORT)