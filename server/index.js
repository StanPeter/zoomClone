const app = require('express')();

const server = require('http').Server(app);

const io = require('socket.io')(server);

const port = 3001;

app.get('/', (req, res) => {
    res.send('hey');
});

io.on('connection', socket => {
    console.log('connected');
    socket.on('join-room', (roomId, userName) => {
        console.log('joined', roomId, userName);
    });
});

server.listen(port, () => {
    console.log('listening on ' + String(port));
});