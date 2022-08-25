const server = require('./lib/server')

const routes = require('./routes')

server(routes).listen(
  5001, () => console.log('Running at http://localhost:5000/')
)
