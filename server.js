const jsonServer = require('json-server');
const auth = require('json-server-auth');
const server = jsonServer.create();
const router = jsonServer.router('./src/api/db.json');
const port = process.env.PORT || 8080;
const middlewares = jsonServer.defaults({ static: './dist/mini-forum' });

server.db = router.db;

const rules = auth.rewriter({
    users: 644,
    threads: 644,
    comments: 644
})

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, PUT')
    res.header('Access-Control-Allow-Headers', '*')
    next()
})

server.use('/api', rules);
server.use('/api', auth);
server.use('/api', router);
server.use(middlewares);

server.all('*', (req, res) => {
    res.status(200).sendFile(__dirname + '/dist/mini-forum/index.html');
});

const io = require('socket.io')(server.listen(port), {
    cors: {
        origin: "*",
        methods: ["PUT", "GET", "POST", "DELETE"],
        credentials: false
    }
});

let guestsConnected = 0;
let authUsersOnline = [];

io.on('connection', (socket) => {
    console.log("a user connected with id: " + socket.id)
    let userName;
    guestsConnected++;

    io.emit('userCount', guestsConnected);
    io.emit('authUsersOnline', authUsersOnline);

    socket.on("disconnect", () => {
        console.log(socket.id + " disconnected")

        if (guestsConnected >= 0 && !userName) {
            guestsConnected--;
        }

        authUsersOnline = authUsersOnline.filter(user => userName !== user);

        io.emit('userCount', guestsConnected);
        io.emit('authUsersOnline', authUsersOnline);
    })

    socket.on('authUserConnected', (user) => {
        authUsersOnline.push(user);
        userName = user;

        if (guestsConnected >= 0) {
            guestsConnected--;
        }

        io.emit('userCount', guestsConnected);
        io.emit('authUsersOnline', authUsersOnline);
    })


    socket.on('sendNewComment', (comment, thread) => {

        socket.to(thread).emit('receiveNewComment', comment);
    })

    socket.on('enterThread', thread => {
        socket.join(thread);
    })
})