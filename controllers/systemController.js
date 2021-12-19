const Slider = require('../models/slider');
const redirect = require('../redirects/404');

const redirect404 = async (req, res) => {

    res.status(301);
    return redirect(req, res, '404', '404', 'Page is not found')

}

module.exports = {
    redirect404
}