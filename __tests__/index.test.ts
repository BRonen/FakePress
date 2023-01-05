import * as http from 'http'
import request from 'supertest'
import Fakepress from '../src'

jest.mock('http', () => ({
  createServer: jest.fn(() => ({
    listen: jest.fn(),
    address: jest.fn(() => ({
      port: 5555,
    })),
  })),
}))

describe('Server module', () => {
  it('Should instatiate a http server when .listen() is called', () => {
    const server = new Fakepress()

    server.listen()

    expect(http.createServer).toBeCalled();
  })

  it('Should do a GET request to route [/]', () => {
    const server = new Fakepress()

    server.get('/', (_, res) => {
      res.send('hello world')
    })

    request(server)
      .get('/')
      .expect(200, 'hello world')
  })

  it('Should receive the {name} query param of request', () => {
    const server = new Fakepress()

    server.get('/', (req, res) => {
      const name = req.query?.name
      res.send(name)
    })

    request(server)
      .get('/?name=hello world')
      .expect(200, 'hello world')
  })

  it('Should throw back 404 if parameter is not valid', () => {
    const server = new Fakepress()

    server.get('/', (req, res) => {
      const name = req.query?.name

      if(name === 'hello') return res.send(name)

      res.status(404).send(name)
    })

    request(server)
      .get('/?name=hello')
      .expect(200, 'hello')

    request(server)
      .get('/?name=world')
      .expect(404, 'world')
  })
})