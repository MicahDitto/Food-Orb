const jsonServer = require('json-server');
const auth = require('json-server-auth');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

// Set port from environment or default to 3000
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins (needed for GitHub Pages frontend)
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

server.db = router.db;

// Use default middlewares (logger, static, cors)
server.use(middlewares);

// Use json-server-auth for authentication
server.use(auth);

// Use the router
server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server with Auth is running on port ${PORT}`);
});
