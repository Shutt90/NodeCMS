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
    const user = User.findOne({
        email: email,
    })

    const password = await bcrypt.compare(req.body.password, user.password, async function(res, err) {
        if(err) {
            console.log(err)
        }

    });

    const userFound = User.findOne({
        email: email,
        password: password,
    })

    try {
        if(!userFound) {
            return res.status(400).send("We don't have a user with that email")
        } else {
            res.status(200).send('Success')
        }

    } catch(error) {
        res.status(500).send('Server Error');
    }
}


module.exports = {
    register_index,
    register_store,
    login_index,
    login_auth,
}