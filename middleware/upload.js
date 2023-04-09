const path = require('path');
const multer = require('multer');
const uploadURL = 'C:/Users/jmara/Proyectos/UTH/Cosmico-Website/uploads';

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, uploadURL/*'uploads/'*/) // Ubicación donde el archivo se establecerá
    },
    filename: function (req, file, cb){
        let ext = path.extname(file.originalname);
        if(ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg'){
          return cb (new Error ('Solo archivos JPG son permitidos'))
        }
        cb(null, Date.now() + ext)
    }
})

const upload = multer({ storage })

module.exports = upload;

