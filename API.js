// import connection from './DB';
const connection = require('./DB')
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/user',(req, res)=>{
    connection.query('SELECT * FROM user', (error, results, fields) => {
        if (error) throw error;
        res.send(results);
        console.log('The users are: ', results);
      });
    
})

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});