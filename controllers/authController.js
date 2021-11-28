const User = require('../models/user');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const server = require('../server');
const secrets = require('../secrets');

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

        // const emailSent = await send_verification();
        // console.log(emailSent)
        user.save();
        res.status(201).send();
        
    } catch(error) {
        console.log(error)
        res.send(500).send();
    } 
}

const send_verification = async (req, res) => {
    
    let transporter = nodemailer.createTransport({
        host: secrets.ipAddress,
        port: 465,
        secure: false,
        auth: {
            user: secrets.noreply,
            pass: secrets.password,
        },
        tls: {
            rejectUnauthorized: false,
        }
    })

    const email = `
    <div style="display:flex; flex-direction: column;">
        <h2>Email verification</h2>
        <p class="font-size: 1rem;">
            Confirm you are a legend by clicking the link below, robots need not apply
        </p>
        <a href="${secrets.HOST}:${secrets.PORT}/register-confirm">
            VERIFY ME
        </a>
    </div>`
    
    const endUser = 'liam.pugh.009@gmail.com';

    const mailOptions = {
        from: secrets.noreply,
        to: endUser,
        subject: 'Verification Email',
        html: email
    }

    const mailInfo = await transporter.sendMail(mailOptions).catch(console.log);

    if(mailInfo != null || mailInfo != undefined) {
        if (mailInfo.envelope.to[0] === endUser) {
            console.log("Message sent");
        } else {
            console.log('Error')
        }
    } else {
        console.log('Error')
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
    send_verification,
}