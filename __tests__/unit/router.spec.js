const Router = require('../../src/lib/router')

describe('Routing test', () => {
  it('should create a Router', () => {
    const router = Router()

    expect(router.routes).toBeInstanceOf(Object)
    expect(router.exec).toBeInstanceOf(Function)
    expect(router.use).toBeInstanceOf(Function)
  })

  it('should have a default /404 route', async () => {
    const router = Router()

    const MockedResponse = {
      writeHead: jest.fn(),
      write: jest.fn()
    }
        
    expect(typeof router.routes['/404']).toBe('function')
    expect(
      await router.exec('/404', null, MockedResponse)
    ).toBe('/404')

    expect(MockedResponse.writeHead).toBeCalledWith(404)
    expect(MockedResponse.write).toBeCalledWith('Page not found')
  })

  it('should use a router to register a route handler', async () => {
    const router = Router()

    const handler = jest.fn((_, res) => {
      res.writeHead(200)
      res.write('Example page')
    })

    router.use('/example', handler)

    expect(router.routes).toEqual(
      expect.objectContaining({
        '/example': handler
      })
    )

    const MockedResponse = {
      writeHead: jest.fn(),
      write: jest.fn()
    }

    expect(
      await router.exec('/example', null, MockedResponse)
    ).toBe('/example')

    expect(MockedResponse.writeHead).toBeCalledWith(200)
    expect(MockedResponse.write).toBeCalledWith('Example page')
  })

  it('should use a router as route handler', async () => {
    const router = Router()
        
    const nestedRouter = Router()
    nestedRouter.use('/example', (_, res) => {
      res.writeHead(200)
      res.write('Nested example page')
    })
        
    router.use('/nested', nestedRouter)
        
    const MockedResponse = {
      writeHead: jest.fn(),
      write: jest.fn()
    }

    expect(
      await router.exec('/nested/example', null, MockedResponse)
    ).toBe('/nested/example')

    expect(MockedResponse.writeHead).toBeCalledWith(200)
    expect(MockedResponse.write).toBeCalledWith('Nested example page')
  })


  it('should return /404 inside nested routes', async () => {
    const router = Router()
        
    const nestedRouter = Router()
    nestedRouter.use('/example', (_, res) => {
      res.writeHead(200)
      res.write('Nested example page')
    })
        
    router.use('/nested', nestedRouter)
        
    const MockedResponse = {
      writeHead: jest.fn(),
      write: jest.fn()
    }

    expect(
      await router.exec('/nested', null, MockedResponse)
    ).toBe('/404')

    expect(MockedResponse.writeHead).toBeCalledWith(404)
    expect(MockedResponse.write).toBeCalledWith('Page not found')
  })

  it('should throw an error of invalid handler type', () => {
    const router = Router()
        
    expect(
      () => router.use('/example', null)
    ).toThrow('Invalid route type')

    expect(
      () => router.use('/example', true)
    ).toThrow('Invalid route type')
        
    expect(
      () => router.use('/example', '')
    ).toThrow('Invalid route type')

    expect(
      () => router.use('/example', 0)
    ).toThrow('Invalid route type')
  })
})
