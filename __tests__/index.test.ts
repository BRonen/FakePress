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
      res.rawResponse.write('hello world')
      res.rawResponse.end()
    })

    request(server)
      .get('/')
      .expect(200, 'hello world')
  })
})