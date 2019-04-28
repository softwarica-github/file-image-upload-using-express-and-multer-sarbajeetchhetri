
const connection = require ('express');
//  Int for ejs express
const express = require('express');
const multer = require('multer');
const app = express();
const path = require('path');
app.use(connection.static(path.join(__dirname,'resources')))
app.set('views',__dirname+'/views')

app.set('view engine','ejs');
 


// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/upload/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});




// Public Folder
app.use(express.static('./public'));

app.get('/', (req, res) => res.render('home'));

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if(err){
      res.render('file', {
        msg: err
      });
    } else {
      if(req.file == undefined){
        res.render('home', {
          msg: 'Error: No File Selected!'
        });
      } else {
        res.render('home', {
          msg: 'File Uploaded!',
          file: `upload/${req.file.filename}`
        });
      }
    }
  });
});


// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('myImage');
















// File type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}




const port = 4000;

app.listen(port, () => console.log(`Server started on port ${port}`));








