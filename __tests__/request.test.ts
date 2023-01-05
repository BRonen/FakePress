import Fakepress from '../src'

jest.mock('Request', () => ({
  parseQueryParams: jest.fn(
    () => ({name: 'hello', age: '19'})
  ),
}))

describe('Request parser module', () => {
  it('Should parse query params correctly', () => {
    const server = new Fakepress()

    server.listen()
  })
})