const express = require('express')
const Book = require('../Books/Book')
const stor = require('../store/store')
const router = express.Router()
const fileMulter = require('../middleware/file')
const path = require('path');

router.get('/api/books', (req, res) => {
    const {
        books
    } = stor
    res.json(books)
})

router.get('/api/books/:id', (req, res) => {
    const {
        books
    } = stor
    const {
        id
    } = req.params
    const idx = books.findIndex(el => el.id === id)

    if (idx !== -1) {
        res.json(books[idx])
    } else {
        res.status(404)
        res.json('404 | страница не найдена')
    }

})

router.get('/api/books/:id/download', function (req, res, next) {
    const {
        books
    } = stor
    const {
        id
    } = req.params
    const idx = books.findIndex(el => el.id === id)

    let options = {
        root: path.join(__dirname.slice(0, -6), 'public/books'),
    }
    let fileName;


    if (idx !== -1) {
        fileName = books[idx].fileBook
    }
   
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err)
        } else {
            console.log('Sent:', fileName)
        }
    })

})

router.post('/api/books', fileMulter.single('cover-book'), (req, res) => {
    const {
        books
    } = stor
    const {
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
    } = req.body
    const {
        filename
    } = req.file

    const newBook = new Book(title, description, authors, favorite, fileCover, fileName, filename)
    books.push(newBook)

    res.status(201)
    res.json(newBook)
})

router.post('/api/user/login', (req, res) => {
    const {
        id,
        mail
    } = req.body
    res.status(201)

    res.json('{ id: 1, mail: "test@mail.ru" }')
})

router.put('/api/books/:id', (req, res) => {
    const {
        books
    } = stor
    const {
        title,
        description,
        authors,
        favorite,
        tfileCover,
        fileName
    } = req.body
    const {
        id
    } = req.params
    const idx = books.findIndex(el => el.id === id)

    if (idx !== -1) {
        books[idx] = {
            ...books[idx],
            title,
            description,
            authors,
            favorite,
            tfileCover,
            fileName
        }

        res.json(books[idx])
    } else {
        res.status(404)
        res.json('404 | страница не найдена')
    }
})

router.delete('/api/books/:id', (req, res) => {
    const {
        books
    } = stor
    const {
        id
    } = req.params
    const idx = books.findIndex(el => el.id === id)

    if (idx !== -1) {
        books.splice(idx, 1)
        res.json(true)
    } else {
        res.status(404)
        res.json('404 | страница не найдена')
    }
})

module.exports = router