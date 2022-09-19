const Router = require('../../src/lib/router')
const { core } = require('../../src/lib/server')

const url = require('url')

describe('Core setup test', () => {
  it('should return a valid core handler', async () => {
    const router = Router()
    const handler = core(router, url.parse)

    const MockedRequest = {
      url: '/404'
    }
    const MockedResponse = {
      writeHead: jest.fn(),
      write: jest.fn(),
      end: jest.fn()
    }

    expect(handler).toBeInstanceOf(Function)

    await handler(MockedRequest, MockedResponse)

    expect(MockedResponse.writeHead).toHaveBeenCalledWith(404)
    expect(MockedResponse.write).toHaveBeenCalledWith('Page not found')
    expect(MockedResponse.end).toHaveBeenCalledTimes(1)
  })
})