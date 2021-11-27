const express = require('express');
const mongoose = require('mongoose');
const homeRoute = require('./routes/homeRoutes')
const userRoute = require('./routes/userRoutes')

const app = express();
const con = 'mongodb+srv://tester:zP1Ucfu0RYDeiwgr@nodecms.bp90q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = 5000;


app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })) //accepting form data

app.set('view engine', 'ejs')

mongoose.connect(con)
    .then(app.listen(PORT))
    .then(console.log(`DB Connected and you're running on port:${PORT}`))
    .catch(err => console.log(err))

app.use(homeRoute);
app.use(userRoute);
