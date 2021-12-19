const User = require('../models/user');
const redirect = require('../redirects/404');

module.exports = async function check_admin (req, res, next) {

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

        if(err) {
            redirect(req, res, 'Error!', 'Error!', err)
        }
    }

}