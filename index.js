const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

const waters = [
    {
        "id": 1,
        "userid": 1,
        "sizeInMl": 1000,
        "date": "2022-03-23T00:22:56.093Z"
      },
      {
        "id": 2,
        "userid": 1,
        "sizeInMl": 1000,
        "count": 1,
        "date": "2022-03-23T00:38:56.093Z"
      }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello world</h1>')
})

app.get('/waters', (request, response) => {
    response.json(waters)
})

app.get('/waters/:id', (request, response) => {
    const id = Number(request.params.id)
    const water = waters.find(water => water.id === id)

    water ? response.json(water) : response.status(404).end()
    
})

app.post('/waters', (request, response) => {
  const water = request.body
  console.log(water)
  response.json(water)
})

app.delete('/waters/:id', (request, response) => {
  const id = Number(request.params.id)
  waters = waters.filter(water => water.id !== id)

  response.status(204).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// TODO: deploy to heroku once prisma is installed using
//https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-heroku
//https://fullstackopen.com/en/part3/deploying_app_to_internet