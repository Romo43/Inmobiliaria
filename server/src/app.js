import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import estateRoutes from './routes/estate.routes'
import employeeRoutes from './routes/employee.routes'
import multer from 'multer'
import config from './config'

// Initializations
const app = express()

// Settings
app.set('port', config.PORT)

// Middleware
const corsOptions = {
    origin: 'http://localhost:8081'
}
app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static("uploads"))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads');
    },
    filename: function (req, file, cb){
        cb(null, file.fieldname + '-' + file.originalname)
    }
})

app.use(multer({storage: storage}).single('media'))

// Routes
app.use("/AxioWeb/estate", estateRoutes)
app.use("/AxioWeb/employee", employeeRoutes)

export default app