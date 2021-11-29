const Page = require('../models/page')

const pages_index = (req, res) => {
    res.render('admin/pages', {title: "Pages"})
}

module.exports = {
    pages_index,
}