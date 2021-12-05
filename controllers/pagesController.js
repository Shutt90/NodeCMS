const Page = require('../models/page');

const pages_index = (req, res) => {

    Page.find().sort({ position: 1 })
    .then((result) => {

        res.render('admin/pages', {
            title: "pages",
            pages: result,
        })

    })

}

const pages_create = (req, res) => {
    res.render('admin/forms/create', {
        title: 'pages',
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

    if(req.files[0].path != "" && req.files[0].path != undefined) {

        try {
            const page = await new Page({
                name: req.body.name,
                content: req.body.content,
                anchor: when_no_anchor(),
                images: req.files[0].path,
            })


            await page.save()

        } catch(err) {
            console.error(err);
        }

    } else {

        try {

            const page = await new Page({
                name: req.body.name,
                content: req.body.content,
                anchor: req.body.anchor,
            })

            await page.save()
            res.status(200).send('Uploaded without file')
                
        }  catch(err) {
            console.error(err)
        }

    }

    res.status(200).send('Uploaded with file')


}

const pages_edit = (req, res) => {
    const id = req.params.id;
    Page.findById(id)
    .then(result => {
        res.render('admin/forms/edit', {
            title: 'pages',
            page: result,
        })
    })

}

const pages_update = async (req, res) => {

    const id = req.params.id

    try {
        await Page.findByIdAndUpdate(id, {
            name: req.body.name,
            content: req.body.content,
            anchor: req.body.anchor
        })

    } catch {
        console.error(err)
        res.sendStatus(404)
    }

    return res.redirect(200, '/pages')


}

const pages_delete = async (req, res) => {

    const id = req.params.id
    backURL=req.header('Referer') || '/';

    try {
        await Page.deleteOne({id: id})
        res.redirect(backURL)

    } catch(err) {
        console.error(err)
    }


    
}


module.exports = {
    pages_index,
    pages_store,
    pages_create,
    pages_edit,
    pages_update,
    pages_delete
}