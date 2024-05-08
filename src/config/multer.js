import multer from "multer";
import path from 'path';

const storage = multer.diskStorage({
    destination: 'E-commerce',
    filename: function (req, file, cb){
        cb(null, file.fieldname + "-" + Date.now() + path .extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,

    fileFilter: function (req, file, cb ) {
        checkFileType(file, cb)
    }
})

function checkFileType (file, cb) {
    const fileTypes = /jpeg|png|jpg|svg|pdf/
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = fileTypes.test(file.mimetype)

    if(mimetype && extname){
        return cb(null, true);
    } else{
        cb('Error upload valid filetype')
    }
};

export default upload;