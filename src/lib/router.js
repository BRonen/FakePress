module.exports = {
  routes: {
    '/404': (_, res) => {
      res.writeHead(404)
      res.write('Page not found')
    }
  },

  use(route, callback) {
    this.routes[route] = callback
  },

  async exec(route, req, res) {
    if(!this.routes[route]){
      await this.routes['/404'](req, res)
      return '/404'
    }
    
    await this.routes[route](req, res)
    return route
  }
}

