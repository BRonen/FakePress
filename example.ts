import Fakepress from './src'

const app = new Fakepress()

const users: Array<string> = []

app.get('/', (_, res) => {
  res.send(users.join(', ') || "hello world!")
})

app.get('/new', (req, res) => {
  if(req.query){
    users.push(req.query?.name)
    res.send('user created')
    return
  }

  res.status(404, 'bad request').send()
})

app.listen(5003, () => console.log('listening...'))