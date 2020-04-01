const helpers = require('../helpers/helper.js');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
    	console.log('filename', file);
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

exports.add = (req, res) => {
    // Validate request   
let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('avatar');

    upload(req, res, function(err) {

    	console.log('body',req.body);

    	console.log('file',req.file.filename);

    	res.send("message successfully");

        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

/*        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }*/

        // Display uploaded image for user validation
   //     res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
    });

};