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

const pages_create = (req, res) => {
    res.render('admin/pages/create', {
        title: 'Create Page',
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
        content: req.body.content,
        anchor: when_no_anchor()
    })

    try {
        await page.save()
        
    } catch(err) {
        console.error(err)
    }

}

const pages_edit = (req, res) => {
    const id = req.params.id;
    Page.findById(id)
    .then(result => {
        res.render('admin/pages/edit', {
            title: 'Edit Page',
            page: result,
        })
    })

}

const pages_update = async (req, res) => {

    const id = req.params.id

    try {
        await Page.findOneAndUpdate(id, {
            name: req.body.name,
            content: req.body.content,
            anchor: req.body.anchor
        })

        res.redirect(200, '/pages')
    } catch {
        console.log(err)
        res.send(404)
    }

}


module.exports = {
    pages_index,
    pages_store,
    pages_create,
    pages_edit,
    pages_update
}