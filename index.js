var express = require('express') //importing library
var app = express() //app is an object that gives us access to commands in the express library

var mysql      = require('mysql');
app.set('views', './views') //pug templates are in the views folder
app.set('view engine', 'pug') //use pug to render views

var connection = mysql.createConnection({ //creating connection to the database
  host     : 'localhost',
  user     : 'sadie.la',
  password : '12345',
  database : 'mssm_community_2'
});

connection.connect();

/*connection.query('SELECT * FROM `people` JOIN `sign_out` ON people.id = sign_out.student_id', function (error, results, fields) {
  if (error) throw error;
  for(i = 0; i < results.length;  i++){
    console.log('The solution is: ', results[i]);
  }
});*/

connection.end();

app.get('/test', function(req, res) {
  res.render('test', {title: 'Hey', message: "Hello there!"}) // 'test' is the name of a template, then fill fields (object w/ properties)
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*app.get('/', function (req, res) { //this is sent to the webpage, configures webserver
  res.send('Hello World!')
})

app.get('/dbserver', function (req, res) {
  console.log(req.query)
  //res.send('Hello Sadie!')
  res.send("<h1>hello" + req.query.name + "!!!!</h1>")
})*/

app.listen(3000, function () { //starts the webserver running (only do this once!!)
  console.log('Example app listening on port 3000!')
})
