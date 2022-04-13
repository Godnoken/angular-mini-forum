const jsonServer = require('json-server');
const auth = reuqire('json-server-auth');
const server = jsonServer.create();
const router = jsonServer.router('./src/api/db.json');
const port = process.env.PORT || 9000;

server.use(auth);
server.use(router);

server.listen(port);