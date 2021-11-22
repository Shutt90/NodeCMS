const Content = require('../models/content')

const home_index = (req, res) => {
    res.render('../views/index')
}

module.exports = {
    home_index,
}