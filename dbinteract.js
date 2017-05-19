var mysql      = require('mysql');

function create_connection() {
  var connection = mysql.createConnection({ //creating connection to the database
    host     : 'localhost',
    user     : 'sadie.la',
    password : '12345',
    database : 'mssm_community_2'
  });

  return connection;
}

exports.addPerson = function (name, role, email) {

  connection = create_connection();
  connection.connect();
  connection.query('INSERT INTO people SET ?', {name: name, email:email}, function (error, results, fields) { //name = column name, name = value for field
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
}

exports.addEvent = function(event_name, event_loc, chaperone, event_date, event_start, event_end) {
  connection = create_connection();
  connection.connect();
  connection.query('INSERT INTO events SET ?', {event_name: event_name, event_loc: event_loc, chaperone: chaperone, event_date: event_date, event_start: event_start, event_end: event_end}, function(error, results, fields) {
    if (error) throw error;
    console.log(results[0])
    connection.end();
  });
}

exports.people_roles = function(callback) {
  connection = create_connection();
  connection.connect();
  connection.query('SELECT people.id, people.name, people.email, roles.role_id as roleid, roles.name as rolename FROM `people` INNER JOIN `user_roles` on people.id = user_roles.person_id INNER JOIN `roles` ON user_roles.role_id = roles.role_id', {}, function(error, results, fields) {
    if(error) throw error;

    connection.end()
    callback(results);
  });
  //return
}

exports.person_info = function(id, callback) {
  connection = create_connection();
  connection.connect();
  connection.query('SELECT people.id, people.name, people.email, roles.role_id as roleid, roles.name as rolename FROM `people` INNER JOIN `user_roles` on people.id = user_roles.person_id INNER JOIN `roles` ON user_roles.role_id = roles.role_id WHERE people.id = ?', id, function(error, results, fields) {
    if(error) throw error;

    connection.end()
    callback(results[0]);
  });
  //return
}

exports.list_events = function(callback) {
  connection = create_connection();
  connection.connect();
  connection.query('SELECT event_name, event_loc, people.name, event_date, event_start, event_end FROM `events` INNER JOIN `people` on events.chaperone = people.id', {}, function(error, results, fields) {
    if(error) throw error;

    connection.end()
    callback(results);
  });
  //return
}

exports.chaperone_roles = function(callback) { //variant of people_roles
  connection = create_connection();
  connection.connect();
  connection.query('SELECT people.name, people.id, roles.name as rolename FROM `people` INNER JOIN `user_roles` on people.id = user_roles.person_id INNER JOIN `roles` ON user_roles.role_id = roles.role_id WHERE user_roles.role_id = 2 OR user_roles.role_id = 3', {}, function(error, results, fields) {
    if(error) throw error;

    connection.end()
    callback(results);
  });
  //return
}

exports.create_event = function(e_name, e_loc, chap_id, e_start, e_end) {
  connection = create_connection();
  connection.connect();
  connection.query('INSERT INTO events SET ?', {event_name: e_name, event_loc: e_loc, chaperone:chap_id, event_start:e_start,  event_end:e_end}, function (error, results, fields) { //name = column name, name = value for field
    if(error) throw error;

    connection.end();
});
}
