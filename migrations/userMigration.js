const User = require('../models/user');

const create_super = async (req, res, next) => {

    try {
        const superUser = await User.findOne({
            'first_name': 'Super',
        });

        if(superUser === undefined || superUser === null) {
            console.log('fire')

            try {
                const superObject = await User.create({
                    first_name: 'Super',
                    surname: 'User',
                    username: 'Admin',
                    email: 'super@super.com',
                    addnumber: 'N/A',
                    addstreet: 'N/A',
                    addpostcode: 'N/A',
                    contact: 'N/A',
                    password: 'password',
                    verified: true,
                    verify_token: 'N/A',
                    admin: true,
                })
    
                return superObject
                
            } catch(err) {
                console.error(err)
            }
    
            superObject.save();
    
        } 

    } catch(err) {
        console.error(err);
    }
}

module.exports = {
    create_super,
}