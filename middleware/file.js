const multer = require('multer')

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'public/books')
    },
    filename(req, file, cb) {
        cb(null, `${file.originalname}.txt`)
    }
})

module.exports = multer({storage})