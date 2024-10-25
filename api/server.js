const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const cors = require('cors');
const fs = require('fs');

// Load the initial data from db.json located in the root directory
const dbFilePath = path.join(__dirname, 'db.json');
let dbData = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));

// Create a router with the initial data
const router = jsonServer.router(JSON.parse(JSON.stringify(dbData))); // Create a deep copy
server.use(cors());

// Use default middlewares (logger, static, cors, no-cache)
const middlewares = jsonServer.defaults();
server.use(middlewares);

// Middleware to write changes back to db.json after modifying data
server.use((req, res, next) => {
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
        res.on('finish', () => {
            const updatedData = router.db.getState();
            fs.writeFileSync(dbFilePath, JSON.stringify(updatedData, null, 2));
        });
    }
    next();
});

// Rewrite routes for the API
server.use(
    jsonServer.rewriter({
        '/api/*': '/$1', // Rewrites /api/* to /* (removes /api prefix)
    })
);

// Use the router for handling API requests
server.use(router);

// Start the server
server.listen(5000, () => {
    console.log('JSON Server is running on port 5000');
});

// Export the server for deployment
module.exports = server;
