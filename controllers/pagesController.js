const Page = require('../models/page')

const pages_index = (req, res) => {
    
    Page.find().sort({ position: 1 })
    .then((result) => {

        res.render('admin/pages', {
            title: "Pages",
            pages: result,
        })

    })

}

module.exports = {
    pages_index,
}