import Request from '../src/request'

describe('Request parser module', () => {
  it('Should parse query params correctly', () => {
    const request = new Request()

    expect(
      request.parseQueryParams('hello=world')
    ).toStrictEqual({'hello': 'world'})

    expect(
      request.parseQueryParams('name=John Galt&age=19')
    ).toStrictEqual({'name': 'John Galt', 'age': '19'})
    expect(

      request.parseQueryParams('product=Apples&amount=12&price=cheap')
    ).toStrictEqual({'product': 'Apples', 'amount': '12', 'price': 'cheap'})
  })
})