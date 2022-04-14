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
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200')
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

server.listen(port);