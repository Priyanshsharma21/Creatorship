import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import auth from '../src/routes/auth.js'
import business from '../src/routes/business.js'
import creator from './routes/creator.js'

const app = express()

// global middlewares
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({extended : true}))

// cors middleware
app.use(cors({ origin: 'http://localhost:5173/' }))

// logging middleware
app.use(morgan("tiny"))


// testing route
app.get('/',(req,res)=>{
    res.status(200).json({status : true, message : "Creatorship IS RUNNING LIKE BOLT"})
})


// routing middlewares
app.use('/api/v1/auth', auth)
app.use('/api/v1/business', business)
app.use('/api/v1/creator', creator)


export default app