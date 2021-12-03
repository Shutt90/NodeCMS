const assert = require('assert')
const authController = require('../controllers/authController')
const mongoose = require('mongoose');
const secrets = require('../secrets');

const con = secrets.db;

mongoose.connect(con)
    .then(async function tests() {
        await test1();
        await test2();

        async function test1() {
            const email = secrets.email

            const result = await authController.test_auth(email)
            assert.deepEqual(result.email, email)
        }

        //Takes 2 arguements, email, password
        async function test2() {
            const something = await authController.check_user(secrets.email, secrets.fakePassword)
            assert.equal(something, true)

        }


    //look into jest


    })
    .catch(console.log)
    .finally(() => mongoose.connection.close())





