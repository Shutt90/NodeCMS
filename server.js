//Framework 
const express = require('express');
const app = express();

//Middleware
require('dotenv').config()
const flash =  require('connect-flash');
const permissions = require('./middleware/permissions')
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const visitors = require('./middleware/visitors')

//Migrations
const userMigration = require('./migrations/userMigration')

// Routes
const homeRoute = require('./routes/homeRoutes');
const userRoute = require('./routes/userRoutes');
const adminRoute = require('./routes/adminRoutes');
const systemRoute = require('./routes/systemRoutes.js');


app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true })) //accepting form data
app.use(flash());

app.locals.baseURL = "http://localhost:5000/"

app.set('view engine', 'ejs')

mongoose.connect(process.env.DB_HOST)
    .then(app.listen(process.env.PORT))
    .then(console.log(`DB Connected and you're running on ${process.env.HOST}:${process.env.PORT}`))
    .catch(err => console.log(err))

const store = new MongoDBStore({
    uri: process.env.DB_HOST,
    collection: "mySessions",
})

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    isAuth: false,
    isAdmin: false,
    user: undefined,
}))

userMigration.create_super();

app.use(visitors.check_unique, homeRoute);
app.use(userRoute);
app.use(permissions.isAuth, adminRoute);

app.use(systemRoute);