// ENV
require('dotenv').config();
// DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 4500;


app.set('views'._dirname+' /views');
app.set('view engine', 'ejs');

// Static File Service
app.use(express.static('public'));
app.use(express.json());

// Node.js의 native Promise 사용
mongoose.Promise = global.Promise;

// CONNECT TO MONGODB SERVER
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true
    //useMongoClient: true 
})
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));

app.use('/todos', require('./routes/todos'));
app.use('/users', require('./routes/users'));

app.listen(port, () => console.log(`Server listening on port ${port}`));