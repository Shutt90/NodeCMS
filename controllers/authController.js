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


module.exports = {
    register_index,
    register_store,
}