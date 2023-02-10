const express = require('express');
const dotenv = require('dotenv');
const router = require('./routes/EmployeeRoutes');
const cors = require('cors');
const cp = require('cookie-parser');
const userRoutes = require("./routes/UserRoutes");
const authRoutes = require("./routes/Auth");
const csvRoutes = require("./routes/CSVRoute")

const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(cp());
dotenv.config({path:'./config/Config.env'});
require('./db/Connection');
app.use('/EMS', router);
app.use("/register", userRoutes);
app.use("/login", authRoutes);
app.use("/uploadcsv",csvRoutes)

module.exports = app;