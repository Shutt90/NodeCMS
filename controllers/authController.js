const User = require('../models/user');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const secrets = require('../secrets');
const { v4: uuidv4 } = require('uuid');

const register_index = (req, res) => {
    res.render('auth/register', {title: 'Register'})
}

const register_store = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const verify_token = uuidv4();

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
            verify_token: verify_token,

        })

        await send_verification(undefined, user.verify_token);
        user.save();
        res.status(201).send();
        
    } catch(error) {
        console.log(error)
        res.send(500).send();
    } 
}

const send_verification = async (result, token) => {

    try {

        // let transporter = nodemailer.createTransport({
        //     host: secrets.ipAddress,
        //     port: 465,
        //     secure: false,
        //     auth: {
        //         user: secrets.noreply,
        //         pass: secrets.password,
        //     },
        //     tls: {
        //         rejectUnauthorized: false,
        //     }
        // })

        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
          },
        });


    
    const email = `
        <div style="display:flex; flex-direction: column;">
            <h2>Email verification</h2>
            <p class="font-size: 1rem;">
                Confirm you are a legend by clicking the link below, robots need not apply
            </p>
            <a href="http://${secrets.HOST}:${secrets.PORT}/verify-user/${token}">
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
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(mailInfo));
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

    res.render('system/system', {
        title: 'Verification',
        user: user.first_name,

    })

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
    verified_user,
}