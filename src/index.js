const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const estateRoutes = require('./routes/estate.routes');
const userRoutes = require('./routes/user.routes');
const multer = require('multer');
const path = require("path");
require('dotenv').config();

// Initializations
const app = express();
// Settings
app.set('port', process.env.PORT);

// Middleware
const corsOptions = {
    origin: '*'
} 
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname, 'src/uploads');
    },
    filename: function (req, file, cb){
        cb(null, file.fieldname + '-' + file.originalname);
    }
});
app.use(multer({storage: storage}).array('media'));

// Routes
app.use("/AxioWeb/estate", estateRoutes);
app.use("/AxioWeb/user", userRoutes);

// Port
app.listen(app.get("port"));
console.log("Server on port", app.get('port'));

// Database
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to the database'))
.catch(err => console.log(err));