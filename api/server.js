// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
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