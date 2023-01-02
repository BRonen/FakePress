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

  get(route: string, ...callbacks: Array<routeCallback>) {
    callbacks.forEach(callback => this.router.add(`GET@${route}`, callback))
  }

  post(route: string, callbacks: Array<routeCallback>) {
    callbacks.forEach(callback => this.router.add(`POST@${route}`, callback))
  }

  put(route: string, callbacks: Array<routeCallback>) {
    callbacks.forEach(callback => this.router.add(`PUT@${route}`, callback))
  }

  patch(route: string, callbacks: Array<routeCallback>) {
    callbacks.forEach(callback => this.router.add(`PATCH@${route}`, callback))
  }

  delete(route: string, callbacks: Array<routeCallback>) {
    callbacks.forEach(callback => this.router.add(`DELETE@${route}`, callback))
  }

  listen(port?: number, callback?: () => void) {
    this.server = createServer(
      this.router.exec()
    )

    this.server.listen(port, callback)
  }
}

export default Fakepress