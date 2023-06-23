// import connection from './DB';
const connection = require('./DB')
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());
app.use(cors());
app.get('/user',(req, res)=>{
    connection.query('SELECT * FROM user', (error, results, fields) => {
        if (error) throw error;
        res.send(results);
        console.log('The users are: ', results);
      });
    
})

app.post('/login',(req,res)=>{
  try {
    const {username,password} = req.body;
    console.log(req.body);
    connection.query(`SELECT * FROM user WHERE username = '${username}' AND password = '${password}'`, (err, result) => {
      if (err) {
        res.send(false);
      } else {
        res.send(result[0]);
        console.log(result)
      }
    });
  } catch (error) {
    console.log(error);
  }
})

app.post('/toDoList',(req,res)=>{
  try {
    const {username} = req.body;
    console.log(req.body);
    connection.query(`SELECT * FROM todo NATURAL JOIN user WHERE username = '${username}'`, (err, result) => {
      if (err) {
        res.send(false);
      } else {
        res.send(result);
        console.log(result)
      }
    });
  } catch (error) {
    console.log(error);
    process.on('uncaughtException', function (err) {
      console.log(err);
  }); 
  }
})

app.post('/addToDoList',(req,res)=>{
  try {
    const {date_time,message,priority,username} = req.body;
    console.log(req.body);
    connection.query(`INSERT INTO todo(date_time, message, priority, username) VALUES ('${date_time}','${message}','Low','${username}')`, (err, result) => {
      if (err) {
        res.send(false);
        console.log(err);
      } else {
        res.send(true);
        console.log("the message already added !!")
      }
    });
  } catch (error) {
    console.log(error);
    process.on('uncaughtException', function (err) {
      console.log(err);
  }); 
  }
})

app.post('/register', (req, res) => {
  try {
    const { username,password,name } = req.body;
    console.log(req.body);
    connection.query(`INSERT INTO user(username,password, name) VALUES ('${username}', '${password}', '${name}')`, (err, result) => {
      if (err) {
        console.log(err);
        res.send('ERROR OCCURRED WHILE REGISTERING !!');
      } else {
        res.send('REGISTERED SUCCESSFUL !!');
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(6951, () => {
  console.log('Server listening on port 6951');
});