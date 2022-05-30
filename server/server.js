require('dotenv').config();
let express = require('express');
let  bodyParser = require('body-parser');
let  cors = require('cors');
let  app = express();
let auth = require('./routes/auth');
let logger = require('morgan');
const mongoose = require('mongoose');

const server = require('http').createServer(app);
const io = require('socket.io')(server,{cors : {origin : '*'}});
 
app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));
let  port = process.env.PORT || 8090;
app.use(require('./middleware/socket')(io));
app.use('/auth',auth);
const dbString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.yhfjgwp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(dbString,{useNewUrlParser : true , useUnifiedTopology : true}).then(() => {
    console.log("Successfully connected to atlas cluster database - " + process.env.DB_NAME);
    server.listen(port,() => {
        console.log('Server is running at port : ' + port)
    });
}).catch((err) => {
    console.log("Error connecting to the database - ",err);
});

io.on('connection',(socket) => {
    console.log("User connected : ", socket.id);
})