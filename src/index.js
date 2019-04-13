import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'


import morgan from 'morgan'
import cors from 'cors'

let app = express()

app.use(morgan('combined'))
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/',(req, res)=> {
    
})
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on PORT ${process.env.PORT}`)
})