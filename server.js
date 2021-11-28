const express = require('express');
const mongoose = require('mongoose');
const homeRoute = require('./routes/homeRoutes');
const userRoute = require('./routes/userRoutes');
const secrets = require('./secrets');

const app = express();
const con = 'mongodb+srv://tester:zP1Ucfu0RYDeiwgr@nodecms.bp90q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })) //accepting form data

app.set('view engine', 'ejs')

mongoose.connect(con)
    .then(app.listen(secrets.PORT))
    .then(console.log(`DB Connected and you're running on ${secrets.HOST}:${secrets.PORT}`))
    .catch(err => console.log(err))

app.use(homeRoute);
app.use(userRoute);