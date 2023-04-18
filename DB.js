const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'to_do_list_react'
});

connection.connect((error) => {
    if (error) {
      console.error('Error connecting to the database: ' + error.stack);
      return;
    }
    console.log('Connected to the database with threadId: ' + connection.threadId);
  });
  
  // Perform a query
  connection.query('SELECT * FROM user', (error, results, fields) => {
    if (error) throw error;
    console.log('The users are: ', results);
  });
  connection.end((error) => {
    if (error) {
      console.error('Error closing the database connection: ' + error.stack);
      return;
    }
    console.log('Connection closed.');
  });

 

  module.exports = connection;