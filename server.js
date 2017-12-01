
var express =   require("express");
var multer  =   require('multer');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './app/upload');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});


var upload = multer({ storage : storage}).single('file');

app.get('/',function(req,res){
      res.sendFile(__dirname + "/app/index.html");
});

app.post('/api/upload',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
       
        return res.end("originalname: " + req.file.originalname + "\npath: " + req.file.path);
    });
});



app.listen(3000,function(){
    console.log("Working on port 3000");
});