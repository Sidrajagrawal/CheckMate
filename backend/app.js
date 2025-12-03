// const swaggerDocs = require('./swagger');
const express = require('express');
const app = express();
const indexRoute = require('./routes/index');
const cors = require('cors')
const cookieParser = require('cookie-parser');
require('dotenv').config();

const PORT = process.env.PORT

// connect to DataBase
const connectDB = require('./model/index');
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({
  origin: ['http://localhost:5173', 'http://10.115.162.98'],  
  credentials: true,                
}));
app.use(cookieParser());

//API Base Route
app.use('/api',indexRoute);

app.get('/',(req,res)=>{
    res.send("<h1>Express is Running You Hit Test Route...</h1>")
})

// swaggerDocs(app);

app.listen(8080,'0.0.0.0',()=>{console.log(`Server Running at ${PORT}`)});