import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

let app = express()

app.use(morgan('combined'))
app.use(cors())

app.get('/',(req, res)=> {
    
})
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on PORT ${process.env.PORT}`)
})