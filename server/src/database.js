import mongoose from 'mongoose'
import config from './config'

mongoose.connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to the database')).catch(err => console.log(err))