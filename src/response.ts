import { ServerResponse } from 'http'

class Response{
  public rawResponse: ServerResponse
  
  constructor(response: ServerResponse) {
    this.rawResponse = response
  }
}

export default Response