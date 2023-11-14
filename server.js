const express = require('express');
const path = require('path')
const route = require('./routes/server.route');
const db = require('./config/db/server');
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config({path:"./.env"});

const app = express();
const port = 3000;

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

app.use(express.urlencoded(
  {
    extended: true
  }
));

app.use(express.json());


// Set EJS as templating engine 
app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

db.connect();

//Route init
route(app);


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/home-page`)
})