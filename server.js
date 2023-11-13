const express = require('express');
const path = require('path')
const route = require('./routes/server.route');
const db = require('./config/db/server');
const { release } = require('os');

const app = express()
const port = 3000

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