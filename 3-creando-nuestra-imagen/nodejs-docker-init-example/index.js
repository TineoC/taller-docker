const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/health', (_, res) => {
  res.send('Healthy!')
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/myname', (req, res) => {
  const myName = process.env.NAME || 'Unknown'
  res.send('Hello, my name is: ' + myName)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
