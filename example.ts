import Fakepress from './src'

const app = new Fakepress()

const users: Array<string> = []

app.get('/', (_, res) => {
  res.rawResponse.write(users.join(', ') || "hello world!")
  res.rawResponse.end()
})

app.get('/new', (req, res) => {
  if(req.query){
    users.push(req.query?.name)
    res.rawResponse.write('user created')
    res.rawResponse.end()
    return
  }
  res.rawResponse.write('user not defined')
  res.rawResponse.end()
})

app.listen(5003, () => console.log('listening...'))