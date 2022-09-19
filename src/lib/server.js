const http = require('http')
const url = require('url')

function core(router, urlParse){
  return async (req, res) => {
    const { pathname } = urlParse(req.url, true)

    await router.exec(pathname, req, res)

    res.end()

    console.log(`Request received at: [${pathname}]`)
  }
}

function App(router){
  return http.createServer( core( router, url.parse ) )
}

module.exports = {
  App, core
}