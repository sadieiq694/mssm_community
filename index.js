var express = require('express') //importing library
var app = express() //app is an object that gives us access to commands in the express library
var bodyParser = require('body-parser')
app.use(bodyParser.json()); //to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ //to suport URL-encoded bodies
  extended:true
}));

var db = require('./dbinteract.js');


app.set('views', './views') //pug templates are in the views folder
app.set('view engine', 'pug') //use pug to render views



////////////////////////// GETS /////////////////////////////////

app.get('/people', function(req, res) {
  db.people_roles(function(results) {
    //console.log(results);

    res.render('people', {title: "People and Roles", people: results})
  });
});

app.get('/events', function(req, res) { //EDITEDITEDITEDIT
  db.list_events(function(results) {
    //console.log(results);

    res.render('events', {title: "Event List", events: results})
  });
});

app.get('/add-event', function(req, res) {
  db.chaperone_roles(function(results) {
    //console.log(results);

    res.render('add_event', {title: "Adding Events", chaperones: results})
  });
});

app.get('/sign-in', function(req, res) {
  db.people_roles(function(results) {
    res.render('sign_in', {title: 'signin', people: results})
  });
});

app.get('/add-person', function(req, res) {
  res.render('add_person', {title: 'Hey', message: "Hello there!"}) // 'test' is the name of a template, then fill fields (object w/ properties)
});


app.get('/home-ri', function(req, res){
  res.render('home-ri', {title: 'RI Home', message: 'Hey!'})
});

app.get('/home-student', function(req, res){
  res.render('home-student', {title: 'Student Home', message: 'Hey!'})
});

app.get('/home-teacher', function(req, res){
  res.render('home-student', {title: 'Teacher Home', message: 'Hey!'})
});

///////////////////// POST ///////////////////////////

app.post('/signed-in', function(req, res) {
  var user = req.body.user
  console.log(user)
  db.person_info(user, function(results) {
    console.log(results);
    if(results.roleid == 1) {
      res.redirect('home-student'); //students: studenthome
    }
    else if (results.roleid==2) { //RI: reshome
      res.redirect('home-ri')
    }
    else { //teacher: teacherhome
      res.redirect('home-teacher')
    }

  });
  //decide what page to go to based on role
})

app.post('/added-person', function(req, res) {
  var name = req.body.user_name;
  var role = req.body.role;
  var email = req.body.email;

  console.log(req.body);

  db.addPerson(name, role, email);

  res.render('added_person')

});

app.post('/added-event', function(req, res) {
  var event_name = req.body.event_name;
  var event_loc = req.body.event_loc;
  var chaperone = req.body.chaperone;
  var event_date = req.body.event_date;
  var event_start = req.body.event_start;
  var event_end = req.body.event_end;

  console.log(req.body);

  db.addEvent(event_name, event_loc, chaperone, event_date, event_start, event_end);

  res.render('added_event')

});

app.listen(3000, function () { //starts the webserver running (only do this once!!)
  console.log('Example app listening on port 3000!')
})
