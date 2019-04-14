import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import { initDB } from './db'


import morgan from 'morgan'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 3000

app.use(morgan('combined'))
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


initDB()

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on PORT ${process.env.PORT}`)
})

// initDb(err => {
//     app.listen(process.env.PORT, err => {
//       if (err) {
//         throw err
//       }
//       console.log(`server is listening on port ${process.env.PORT}`)
//     })
//   })