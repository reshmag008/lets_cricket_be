const http = require('http');
const path = require('path');
const cors = require('cors')
var express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
var app = express();
const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server({
//   cors: {
//     origin: "http://localhost:9000"
//   }
// });

// console.log("io== ", io);



require('./config/db_connection');


app.use(cors());
app.options('*', cors());

app.use(routes);
app.disable("x-powered-by");
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    limit: "10240000mb",
    extended: true,
    parameterLimit: 22064900,
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});



app.get('/', (req, res) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  res.send(`Server is up with base URL: ${baseUrl}`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({error: 'an error occurred'});
});

// io.on('connection', (socket) => {
//   console.log('a user connected');
// });


// app.listen(443, function () {
//   console.log('Example app listening on port 3000!');
// });

module.exports = { app, server};