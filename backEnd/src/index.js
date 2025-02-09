const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dbconnection = require('./config/db');
const userRoute = require('./routes/userRoute');
const cookieParser = require('cookie-parser');
dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cookieParser());
app.use(cors());
dbconnection();
app.use(express.json());

app.use(`/api/user`, userRoute);

app.listen(port,()=>{
    console.log(`Server running on port:${port}`);
});