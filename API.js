// import connection from './DB';
const axios = require('axios');
const connection = require('./DB')
const express = require('express');
const bodyParser = require('body-parser');

const api = axios.create({
  baseURL: 'https://localhost:3000'
})

const app = express();
app.use(bodyParser.json());

app.get('/user',(req, res)=>{
    connection.query('SELECT * FROM user', (error, results, fields) => {
        if (error) throw error;
        res.send(results);
        console.log('The users are: ', results);
      });
    
})

app.post('/register', (req, res) => {
  const {username, name, password } =  req.body;

  api.post('/register', {username, name, password})
  .then(response => {
    res.json(response.data);
    connection.query(`INSERT INTO user(User_Id, User_password, Name) VALUES ('${username}', '${password}', '${name}')`, (err, result) => {
      if (err) {
        console.log(err);
        res.send('ERROR OCCURRED WHILE REGISTERING !!');
      } else {
        res.send('REGISTERED SUCCESSFUL !!');
      }
    });
  })
  .catch(error => {
    res.status(500).json({ error: 'Internal server error' });
  });
});

app.listen(6951, () => {
  console.log('Server listening on port 6951');
});