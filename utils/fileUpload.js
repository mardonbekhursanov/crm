const multer = require("multer")
const path = require("path")
const storage = multer.diskStorage({
    destination: "./public/uploads",
    filename: function(req, file, cb){
        return cb(null, file.fieldname + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage,
    limits: {
        fileSize: 1000000000
    },
    fileFilter: (req, file, cb) => {
        const filetype = /png|jpg|svg|webp|mp4|/
        const extname = filetype.test(path.extname(file.originalname).toLowerCase())
        const mimetype = filetype.test(file.mimetype)

        if(extname && mimetype){
            return cb(null, true)
        }
        else{
            return cb("Siz faqat rasm yoki video kirita olasiz!")
        }
    }
})

module.exports = upload