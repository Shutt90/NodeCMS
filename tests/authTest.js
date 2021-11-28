const assert = require('assert')
const authController = require('../controllers/authController')
const mongoose = require('mongoose');

const con = 'mongodb+srv://tester:zP1Ucfu0RYDeiwgr@nodecms.bp90q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'


mongoose.connect(con)
    .then(async function tests() {
        await test1();
        await test2();

        async function test1() {
            const email = 'Liam.pugh.009@gmail.com'

            const result = await authController.test_auth(email)
            assert.deepEqual(result.email, email)
        }

        //Takes 2 arguements, email, password
        async function test2() {
            const something = await authController.check_user('Liam.pugh.009@gmail.com', 'password')
            assert.equal(something, true)

        }


    //look into jest


    })
    .catch(console.log)
    .finally(() => mongoose.connection.close())





