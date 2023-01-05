import { ServerResponse } from 'http'

class Response{
  public rawResponse: ServerResponse
  public statusCode: number = 200
  public statusMessage?: string

  constructor(response: ServerResponse) {
    this.rawResponse = response
  }

  status(statusCode: number, statusMessage?: string) {
    this.statusCode = statusCode
    if(statusMessage) this.statusMessage = statusMessage
    return this
  }

  send(content: string = '') {
    this.rawResponse
    .writeHead(this.statusCode, this.statusMessage)
    .write(content)
  }
}

export default Response