const User = require('../models/user');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const sysRedirect = require('../redirects/sysRedirect');

function toLower(str) {
    return str.toLowerCase();
}

const register_index = (req, res) => {
    res.render('auth/register', {title: 'Register'})
}

const register_store = async (req, res) => {

    function confirmPassword(password, passwordConfirmation) {
        if (password === passwordConfirmation) {
            return password
        } else {
            res.status('404').send('Passwords must match')
        }
        
    }

    const confirmedPass = confirmPassword(req.body.password, req.body.password_confirmation)

    try {

        const hashedPassword = await bcrypt.hash(confirmedPass, 10)
        const verify_token = uuidv4();

        const user = new User({
            first_name: toLower(req.body.first_name),
            surname: toLower(req.body.surname),
            email: toLower(req.body.email),
            username: req.body.username,
            addnumber: req.body.addnumber,
            addstreet: toLower(req.body.addstreet),
            addpostcode: req.body.addpostcode,
            contact: req.body.contact,
            password: hashedPassword,
            verify_token: verify_token,

        })

        try {
            await user.save()
        } catch(err) {
            if (err.code == 11000) {
                res.render('system/system', {
                    title: 'Ooops',
                    message: 'Ooops',
                    greeting: "We already have a user with that email",
                    user: null,
                    link: '/register',
                    linkMessage: 'Go back'
                });

                return console.log('Duplicate Entry');
            } else {
                console.error(err)
            }
        }

        try {
            await send_verification(undefined, user.verify_token, user.email)
        } catch(err) {
            console.error(err)
        }

        res.status(201).render('system/system', {
            title: 'Registration',
            message: 'Thank you for signing up',
            greeting: 'Please check your email to verify your account, you will need to do this to login',
            user: null,
            link: null,
            linkMessage: null
        });

    } catch(err) {
        console.log(err)

    } 
}

const send_verification = async (result, token, usersEmail) => {

    try {

        let transporter = nodemailer.createTransport({
            host: process.env.IP_ADDRESS,
            port: 465,
            secure: true,
            auth: {
                user: process.env.NO_REPLY,
                pass: process.env.PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            }
        })
    
    const email = `
        <div>
            <h2>Email verification</h2>
            <p style="font-size: 1rem;">
                Confirm you are a legend by clicking the link below, robots need not apply
            </p>
            <a href="http://${process.env.HOST}:${process.env.PORT}/verify-user/${token}">
                VERIFY ME
            </a>
        </div>`
    
        const mailOptions = {
            from: process.env.NO_REPLY,
            to: usersEmail,
            subject: 'Verification Email',
            html: email
        }

        const mailInfo = await transporter.sendMail(mailOptions)
    
        if(mailInfo != null || mailInfo != undefined) {
            if (mailInfo.envelope.to[0] === usersEmail) {
                console.log("Message Sent");
            } else {
                console.log('Error, message not sent')
            }
        } else {
            console.log('Error, message not sent')
        }
    
    } catch(error) {

        console.log(error)
        
    }
    
}

const verified_user = async (req, res) => {

    const path = req.path
    const verify_token = path.slice(13)

    const user = await User.findOne({
        verify_token: verify_token
    })

    user.verified = true;
    user.save();

    if(user.verified === true) {
        res.render('system/system', {
            title: 'Verification',
            greeting: 'Welcome',
            user: user.first_name,
            message: 'Account now verified',
            link: null,
            linkMessage: null

        })

    } else {
        res.render('system/system', {
            title: 'Verification',
            greeting: null,
            user: 'User not found',
            message: 'Account not found',
            link: null,
            linkMessage: null
        })
    }

}

const login_index = (req, res) => {
    res.render('auth/login', {title: 'login'});
}

const login_auth = async (req, res) => {

    const email = toLower(req.body.email);
    const password = req.body.password;
    
    const success = await check_user(email, password);

    if(success) {
        await check_verified(req, res, email)

    } else {
        res.status(400).send("Invalid username/password")
    }
}

const check_verified = async(req, res, email) => {

    const user = await User.findOne({
        email: email,
    })

    console.log(user)

    if(user.verified != true ) {
        res.render('system/system', {
            title: 'Unverified',
            message: "Sorry, but...",
            greeting: "You haven't yet verified your account, please check your emails and try again",
            user: null,
            link: null,
            linkMessage: null,
            messages: req.flash('info')
        })
    } else {
        req.session.isAuth = true
        req.session.user = user

        if(user.admin == true) {
            req.session.isAdmin = true
        }
        res.status(200).redirect('dashboard')
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

const logout_user = async (req, res) => {

    req.session.destroy(err => {
        if(err) throw err;
        sysRedirect(req, res, 'Logged Out', 'Logged Out', 'You have successfully logged out, you can log back in with the button below', undefined, '/login', 'Login')
    })

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
    verified_user,
    logout_user,
}