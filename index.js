const bodyParser = require('body-parser');
const path = require('path');
const config = require('config');
const express = require('express');
const fs = require('fs');
const uploadFile = require('express-fileupload')


const app = express();

const server = require('http').Server(app);


const io = require('socket.io')(server,
    {
        cors: {
            origin: '*',
        },
        pingInterval: 5000,
        pingTimeout: 240000
    }
);


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(uploadFile())

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));


io.on('connection', (socket) => {

    console.log('a user connected');

    socket.on('disconnect', (reason) => {

        console.log('user disconnected ' + reason);

    });

    app.locals.socket = socket;

});


app.locals.io = io;



app.use('/api/comme', require('./routes/ad.routes'));



if (process.env.NODE_ENV === 'production') {

    app.use('/', express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 3001


const start = () => {
    try {
        server.listen(PORT, () => {
            console.log(`Server has been started on ${PORT}...`)
        })
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1)
    }
};

start();