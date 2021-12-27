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

const check_admin = async (req, res, next, id) => {

    try {

        const user = await User.findOne({
            _id: id
        })
    
        if(user.find({admin: true})) {
            return user
        } else {
            sysRedirect(req, res, '404', 'Page not found', 'Either the page is not found or you do not have permission to access it', null, null);
        }

    } catch(err) {
        console.error(err);

        if(err) {
            sysRedirect(req, res, 'Error!', 'Error!', err)
        }
    }

}



module.exports = {
    isAuth,
    check_admin
}