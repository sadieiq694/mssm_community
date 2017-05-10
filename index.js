var express = require('express') //importing library
var app = express() //app is an object that gives us access to commands in the express library
var bodyParser = require('body-parser')
app.use(bodyParser.json()); //to support JSON-encoed bodies
app.use(bodyParser.urlencoded({ //to suport URL-encoded bodies
  extended:true
}));

var mysql      = require('mysql');
app.set('views', './views') //pug templates are in the views folder
app.set('view engine', 'pug') //use pug to render views

function create_connection() {
  var connection = mysql.createConnection({ //creating connection to the database
    host     : 'localhost',
    user     : 'sadie.la',
    password : '12345',
    database : 'mssm_community_2'
  });

  return connection;
}

function addPerson(name, role) {

  connection = create_connection();
  connection.connect();
  connection.query('INSERT INTO people SET ?', {name: name}, function (error, results, fields) { //name = column name, name = value for field
    if (error) throw error;

    var personId = results.insertId

    connection.query('SELECT role_id FROM roles WHERE name = ?', [role], function (error, results, fields) {
      if (error) throw error;

      var roleId = results[0].role_id

      connection.query('INSERT INTO user_roles SET ?', {person_id: personId, role_id: roleId}, function (error, results, fields) {
        if (error) throw error;

        console.log("Apparently it worked")
        connection.end();
      });

      console.log(results[0].role_id)
    });

    console.log(results.insertId);
  });

//connection.end();
}

function people_roles(callback) {
  connection = create_connection();
  connection.connect();
  connection.query('SELECT people.name, roles.name as rolename FROM `people` INNER JOIN `user_roles` on people.id = user_roles.person_id INNER JOIN `roles` on user_roles.role_id = roles.role_id', {}, function(error, results, fields) {
    if(error) throw error;

    connection.end()
    callback(results);
  });
  //return
}


app.get('/people', function(req, res) {
  people_roles(function(results) {
    //console.log(results);

    res.render('people', {title: "People and Roles", people: results})
  });
});


app.post('/added-person', function(req, res) {
  var name = req.body.user_name;
  var role = req.body.role;

  console.log(req.body);

  addPerson(name, role);

  res.render('added-person')

});
/*connection.query('SELECT * FROM `people` JOIN `sign_out` ON people.id = sign_out.student_id', function (error, results, fields) {
  if (error) throw error;
  for(i = 0; i < results.length;  i++){
    console.log('The solution is: ', results[i]);
  }
});*/
//onnection.end();

app.get('/test', function(req, res) {
  res.render('test', {title: 'Hey', message: "Hello there!"}) // 'test' is the name of a template, then fill fields (object w/ properties)
});

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
