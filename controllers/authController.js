const User = require('../models/user')
const bcrypt = require('bcrypt')

const register_index = (req, res) => {
    res.render('auth/register', {title: 'Register'})
}

module.exports = {
    register_index,
}