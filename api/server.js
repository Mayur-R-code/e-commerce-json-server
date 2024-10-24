// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server')
const server = jsonServer.create()
// const fs = require('fs')
const path = require('path')
const cors = require('cors');
// const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json')))
// console.log('db: ', db);
const dbPath = path.join(__dirname, 'db.json');
const router = jsonServer.router(dbPath);
server.use(cors());


// const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
// Add this before server.use(router)
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/api/users': '/user-list',
    '/api/users/:id': '/user-list/:id',
    '/api/companies': '/company-list',
    '/api/companies/:id': '/company-list/:id'
}))
server.use(router)
server.listen(5000, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server