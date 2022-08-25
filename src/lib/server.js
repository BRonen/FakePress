const http = require('http')
const url = require('url')

function core(router){
  return async (req, res) => {
    const { pathname } = url.parse(req.url, true)

    await router.exec(pathname, req, res)

    res.end()

    console.log(`Request received at: [${pathname}]`)
  }
}

module.exports = (router) => http.createServer( core( router ) )