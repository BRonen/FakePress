import { createServer, Server } from 'http'
import { Router, routeCallback } from './router'

class Fakepress {
  private server?: Server
  private router: Router

  constructor() {
    this.router = new Router()
  }

  address() {
    return this.server?.address()
  }

  pushRoute(route: string, callbacks: Array<routeCallback>) {
    callbacks.forEach(callback => this.router.add(route, callback))
  }

  get(route: string, ...callbacks: Array<routeCallback>) {
    this.pushRoute(`GET@${route}`, callbacks)
  }

  post(route: string, ...callbacks: Array<routeCallback>) {
    this.pushRoute(`POST@${route}`, callbacks)
  }

  put(route: string, ...callbacks: Array<routeCallback>) {
    this.pushRoute(`PUT@${route}`, callbacks)
  }

  patch(route: string, ...callbacks: Array<routeCallback>) {
    this.pushRoute(`PATCH@${route}`, callbacks)
  }

  delete(route: string, ...callbacks: Array<routeCallback>) {
    this.pushRoute(`DELETE@${route}`, callbacks)
  }

  listen(port?: number, callback?: () => void) {
    this.server = createServer(
      this.router.exec()
    )

    this.server.listen(port, callback)
  }
}

export default Fakepress