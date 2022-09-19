const { App } = require('./lib/server')

const routes = require('./routes')

const port = process.env.PORT

App(routes).listen(
  port, () => console.log(`Running at http://localhost:${port}/`)
)
