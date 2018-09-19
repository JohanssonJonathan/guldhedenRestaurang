let fs = require("fs");
let express = require("express")
const bodyParser = require('body-parser')
let filterStudent = require("./filterstudents.js")

let app = express()


var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })



app.post("/api/studenter",urlencodedParser, function(req,res){
  let file = fs.readFileSync("./studenter.json", "utf8");

  //Gör om filen i databasen till ett Objekt
  let fileObj = JSON.parse(file);


  //Filtrera reqObj och fileObj i en modul
  filterStudent.filt(req.body,fileObj)
  res.send(req.body)
})


app.listen(5000, ()=>{

  console.log("app is listening")
})
