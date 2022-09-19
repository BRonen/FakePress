const path = require('path')
const fs = require('fs')
const url = require('url')

const Router = require('./lib/router')

let counter = 1

const router = Router()
const nestedRouter = Router()

nestedRouter.use(
  '/', (_, res) => {
    return res.write('/nested')
  }
)

nestedRouter.use(
  '/main', (_, res) => {
    return res.write('/nested/main')
  }
)

router.use('/nested', nestedRouter)

router.use('/main', (_, res) => {
  return res.write('main')
})

router.use('/', (req, res) => {
  const { query } = url.parse(req.url, true)
  const filename = path.join(__dirname, '../public/index.html')

  const stat = fs.statSync(filename)
  const file = (''+fs.readFileSync(filename))
    .replace('{name}', query.name)
    .replace('{counter}', counter++)

  const chunkLimit = 16 * 1024
  const chunkCount = Math.ceil(stat.size / chunkLimit)

  res.writeHead(200)

  if(chunkCount <= 1)
    return res.write(file)

  for(let i = 0; i < chunkCount; i++){
    const chunk = file.slice(i * chunkLimit, (i + 1) * chunkLimit)
    res.write(chunk)
  }
})

module.exports = router
