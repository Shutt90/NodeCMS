const express = require('express');
const mongoose = require('mongoose');

const app = express();
const con = 'mongodb+srv://tester:zP1Ucfu0RYDeiwgr@nodecms.bp90q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(con)
    .then((result) => app.listen('5000'))
    .catch(err => console.log(err))

app.get('/', (res, req) => console.log("Hello World"))
