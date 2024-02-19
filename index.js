const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let connection;

const connectToDatabase = () => {
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'a1',
    password: 'Tariq',
    database: 'apitest',
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      setTimeout(connectToDatabase, 2000); 
    } else {
      console.log('Connected to database successfully!');
    }
  });
};

connectToDatabase();


app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(port, () =>  {

    console.log(`Server is listening on port ${port}`);
})