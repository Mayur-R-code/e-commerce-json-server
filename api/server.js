const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const cors = require('cors');

// Load the data from db.json into memory
const dbData = require(path.join(__dirname, './db.json'));

// Create a router using the in-memory data
const router = jsonServer.router(dbData);
server.use(cors());

// Use default middlewares (logger, static, cors, no-cache)
const middlewares = jsonServer.defaults();
server.use(middlewares);

// Rewrite routes for the API
server.use(
    jsonServer.rewriter({
        '/api/*': '/$1',
        '/api/users': '/user-list',
        '/api/users/:id': '/user-list/:id',
        '/api/companies': '/company-list',
        '/api/companies/:id': '/company-list/:id',
    })
);

// Use the router for handling API requests
server.use(router);

// Start the server
server.listen(5000, () => {
    console.log(`JSON Server is running on port 5000`);
});

// Export the server for deployment
module.exports = server;
