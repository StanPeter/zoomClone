const app = require('express')();

const server = require('http').Server(app);

const io = require('socket.io')(server);

const port = 3001;
const users = [
    // {
    //     userName: 'Philip',
    //     roomId: 1,
    // }
];

app.get('/', (req, res) => {
    res.send('hey');
});

const getUsers = (roomId) => users.filter(user => user.roomId === roomId);
const addUser = (userName, roomId) => users.push({ userName, roomId });
const removeUser = (userName) => users.filter(user => user.userName !== userName);

io.on('connection', socket => {
    console.log('connecting BE');

    socket.on('join-room', (roomId, userName) => {

        //check if user already exists in the room
        if (users.find(user => user.userName === userName && user.roomId === roomId)) {
            console.log('User already joined!');

            return;
        }

        socket.join(roomId); //join | create a new room with socket.io rooms

        addUser(userName, roomId); //for now not a real DB 

        console.log('joined', roomId, userName);

        //io.to("some room").emit("some event"); - execute an action in the room
        //io.to("room1").to("room2").to("room3").emit("some event"); - for more rooms at once

        //You can also broadcast to a room from a given socket:
        //In that case, every socket in the room excluding the sender will get the event.
        //inform all other users in the room about our connection
        socket.to(roomId).emit('user-connected', userName);

        //inform us + all other users in the room that we connected
        io.to(roomId).emit('all-users', getUsers(roomId));

        //on disconnection, leave the room + tell all the users
        socket.on('disconnect', () => {
            console.log('disconnected');

            socket.leave(roomId);
            removeUser(userName);

            io.to(roomId).emit('all-users', getUsers(roomId));
        });

        console.log(users, 'ALL USERS');
    });

    //from client, socket.send('connected
    socket.on('message', (message, id, connected) => {
        console.log('FE: ', message, id, connected);
    });

    //from client, socket.send('connected
    // socket.on('hello', (message, id, connected) => {
    //     console.log('FE: ', message, id, connected);
    // });
});

server.listen(port, () => {
    console.log('listening on ' + String(port));
});