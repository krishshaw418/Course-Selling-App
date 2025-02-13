const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const {dbconnection} = require('./config/db');
const userRoute = require('./routes/userRoute');
const adminRoutes = require('./routes/adminRoutes');
const cookieParser = require('cookie-parser');
dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cookieParser());
app.use(cors());
dbconnection();
app.use(express.json());

app.use(`/api/user`, userRoute);
app.use(`/api/admin`, adminRoutes)

app.listen(port,()=>{
    console.log(`Listening...`);
});