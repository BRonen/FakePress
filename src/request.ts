import { IncomingMessage } from 'http'
import url from 'url'

class Request{
  public rawReq?: IncomingMessage
  public query?: Record<string, string>

  constructor(incomingMessage?: IncomingMessage) {
    this.rawReq = incomingMessage

    if (incomingMessage?.url){
      const parsedUrl = url.parse(incomingMessage.url)
      if(parsedUrl.query){
        this.query = this.parseQueryParams(parsedUrl.query)
      }
    }
  }

  parseQueryParams(query: string): Record<string, string> {
    const paramsMapping: Record<string, string> = {}
    for(const param of query.split('&')){
      const [key, value] = param.split('=')
      paramsMapping[key] = value
    }
    return paramsMapping
  }
}

export default Request