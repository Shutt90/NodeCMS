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

const pages_store = async (req, res) => {

    const when_no_anchor = () => {
        if(req.body.anchor === "") {
            return req.body.name
        } else {
            return req.body.anchor
        }
    }

    const page = new Page({
        name: req.body.name,
        anchor: when_no_anchor()
    })

    try {
        await page.save()
        
    } catch(err) {
        console.error(err)
    }

}

module.exports = {
    pages_index,
    pages_store
}