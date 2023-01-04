import { IncomingMessage, ServerResponse } from 'http'
import { parse } from 'url'
import Request from './request'
import Response from './response'

export type routeCallback = (request: Request, response: Response) => void

export class Router {
  private routes: Record<string, Array<routeCallback>>

  constructor() {
    this.routes = {}
  }

  add(route: string, callback: routeCallback) {
    if(!this.routes[route])
      this.routes[route] = []

    this.routes[route].push(callback)
  }

  exec() {
    return (req: IncomingMessage, res: ServerResponse) => {
      if(!req.url) throw 'Url property not defined on request'
      const route = parse(req.url, true).pathname
      const method = req.method

      console.log(this.routes, `${method}@${route}`)

      if(this.routes[`${method}@${route}`])
        this.routes[`${method}@${route}`].forEach((cb) => cb(new Request(req), new Response(res)))
      else res.end()

      console.log(`Request received at: [${method}@${route}]`)
    }
  }
}