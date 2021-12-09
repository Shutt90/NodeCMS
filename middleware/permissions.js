const User = require('../models/user');
const redirect404 = require('../redirects/404');

const check_admin = async (id) => {

    try {

        const user = await findOne({
            _id: id
        })
    
        if(user.find({admin: true})) {
            return user
        } else {
            redirect404(req, res, '404', 'Page not found', 'Either the page is not found or you do not have permission to access it', null, null);
        }

    } catch(err) {
        console.error(err);
    }
}

module.exports = {
    check_admin
}