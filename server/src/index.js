import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import router from './router.js'

dotenv.config()

const PORT = process.env.PORT

const app = express()

app.use(cors())

app.use(router)
app.use('*', (req, res) => {
  res.status(404).send('Not Found')
})

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
