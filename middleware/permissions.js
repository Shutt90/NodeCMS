const User = require('../models/user');
const sysRedirect = require('../redirects/sysRedirect');
const mongoose = require('mongoose')


const isAuth = (req, res, next) => {
    if(req.session.isAuth) {
        next()
    } else {
        sysRedirect(req, res, 'Not Allowed', 'You need to login, or do not have permission', 'Please login or try again', undefined, '/login', 'Login Here')
    }
}



const isAdmin = async (req, res, next) => {

    if(req.session.isAdmin) {
        next()
    } else {
        sysRedirect(req, res, 'Not Allowed', 'Access Denied', "Your account doesn't have sufficient privileges to access this page")
    }

}



module.exports = {
    isAuth,
    isAdmin,
}