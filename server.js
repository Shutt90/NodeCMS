const express = require('express');
const mongoose = require('mongoose');
var methodOverride = require('method-override');
const homeRoute = require('./routes/homeRoutes');
const userRoute = require('./routes/userRoutes');
const adminRoute = require('./routes/adminRoutes');
const secrets = require('./secrets');
const userMigration = require('./migrations/userMigration')
const app = express();
const con = secrets.db;
const permissions = require('./middleware/permissions')

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true })) //accepting form data
app.use(permissions);


app.locals.baseURL = "http://localhost:5000/"

app.set('view engine', 'ejs')

mongoose.connect(con)
    .then(app.listen(secrets.PORT))
    .then(console.log(`DB Connected and you're running on ${secrets.HOST}:${secrets.PORT}`))
    .catch(err => console.log(err))



userMigration.create_super();

app.use(homeRoute);
app.use(userRoute);
app.use(adminRoute);
