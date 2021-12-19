require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
var methodOverride = require('method-override');
const homeRoute = require('./routes/homeRoutes');
const userRoute = require('./routes/userRoutes');
const adminRoute = require('./routes/adminRoutes');
const userMigration = require('./migrations/userMigration')
const app = express();
const permissions = require('./middleware/permissions')

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true })) //accepting form data
app.use(permissions);


app.locals.baseURL = "http://localhost:5000/"

app.set('view engine', 'ejs')

mongoose.connect(process.env.DB_HOST)
    .then(app.listen(process.env.PORT))
    .then(console.log(`DB Connected and you're running on ${process.env.HOST}:${process.env.PORT}`))
    .catch(err => console.log(err))

userMigration.create_super();

app.use(homeRoute);
app.use(userRoute);
app.use(adminRoute);
