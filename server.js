var mysql = require('mysql');
var dboptions = { // database options
  host: "localhost",
  user: "root",
  password: "",
  database: "test"
};
var db = mysql.createConnection(dboptions);// create mysql connection
var express = require('express');//Importing Express
var app = express();//Getting App From Express
var fs = require('fs');//Importing File System Module To Access Files
const port = process.env.PORT || 3000;//Creating A Constant For Providing The Port

//Routing Request : http://localhost:port/
app.get('/',function(request,response){
  //Telling Browser That The File Provided Is A HTML File
  response.writeHead(200,{"Content-Type":"text/html"});
  //Passing HTML To Browser
  response.write(fs.readFileSync("./public/index.html"));
  //Ending Response
  response.end();
})

//Routing To Public Folder For Any Static Context
app.use(express.static(__dirname + '/public'));
console.log("Server Running At:localhost:"+port);

//confirm mysql database connection
db.connect(function(err) {
  if (err) throw err;
  console.log("Connected to test database!");
});

//run socket.io code
var io = require('socket.io').listen(app.listen(port));//Telling Express+Socket.io App To Listen To Port
io.sockets.on("connection",function(socket){
    socket.emit("Start_Chat");
})