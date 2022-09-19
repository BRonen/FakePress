module.exports = function Router(){
  return {
    routes: {
      '/404': (_, res) => {
        res.writeHead(404)
        res.write('Page not found')
      }
    },

    use(route, routeHandler) {
      const routeType = typeof routeHandler

      if(!['function', 'object'].includes(routeType) || routeHandler === null)
        throw new Error('Invalid route type')
      
        this.routes[route] = routeHandler
    },

    async exec(route, req, res) {
      routeParts = route.split('/')
      routeParts.shift()
      const path = routeParts.shift()
      
      const routeHandler = this.routes[`/${path}`]

      if(!routeHandler){
        await this.routes['/404'](req, res)
        return '/404'
      }

      if(typeof routeHandler === 'function')
        await routeHandler(req, res)

      if(typeof routeHandler === 'object')
        if(
          await routeHandler.exec(`/${routeParts.join('/')}`, req, res) === '/404'
        ) return '/404'
      
      return route
    }
  }
}
