const User = require('../models/user')
const bcrypt = require('bcrypt')

const register_index = (req, res) => {
    res.render('auth/register', {title: 'Register'})
}

const register_store = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            first_name: req.body.first_name,
            surname: req.body.surname,
            email: req.body.email,
            username: req.body.username,
            addnumber: req.body.addnumber,
            addstreet: req.body.addstreet,
            addpostcode: req.body.addpostcode,
            contact: req.body.contact,
            password: hashedPassword,
        })
        user.save();
        res.status(201).send();
        
    } catch(error) {
        console.log(error)
        res.send(500).send();
    } 
}

const login_index = (req, res) => {
    res.render('auth/login', {title: 'login'})
}

const login_auth = async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    
    const success = await check_user(email, password);

    if(success) {
        res.status(200).send() //redirect
    } else {
        res.status(400).send("Invalid username/password")
    }
}

const check_user = async (email, password) => {

    let success;

    const user = await User.findOne({
        email: email,
    })

    if(user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            success = true;
        } else {
            success = false;
        }
    } else { 
        success = false;
    }
    return success
}

const test_auth = async (email) => {

    const user = await User.findOne({
        email: email,
    })

    return user;

}


module.exports = {
    register_index,
    register_store,
    login_index,
    login_auth,
    test_auth,
    check_user,
}