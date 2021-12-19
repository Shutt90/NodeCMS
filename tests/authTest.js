const assert = require('assert')
const authController = require('../controllers/authController')
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_HOST)
    .then(async function tests() {
        await test1();
        await test2();

        async function test1() {
            const email = process.env.EMAIL

            const result = await authController.test_auth(email)
            assert.deepEqual(result.email, email)
        }

        //Takes 2 arguements, email, password
        async function test2() {
            const something = await authController.check_user(process.env.EMAIL, process.env.FAKE_PASSWORD)
            assert.equal(something, true)

        }


    //look into jest


    })
    .catch(console.log)
    .finally(() => mongoose.connection.close())





