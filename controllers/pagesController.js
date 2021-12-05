const Page = require('../models/page');
const faker = require('faker');

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
        const anchor = req.body.anchor
        if(anchor === "") {
            return req.body.name
        } else {
            return anchor
        }

    }

    const slug = when_no_anchor().replace(/\s/g, "")

    console.log(slug)

    if(req.files.count > 0) {

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

const pages_deleteAll = async(req, res) => {

    try {
        await Page.deleteMany()
    } catch(err) {
        console.error(err)
    }

    res.send('Bye bye pages...')

}

const pages_seed = async (req, res) => {
    


    const slug = faker.lorem.word(3).replace(/\s/g, "")

    try {
        const createPages = await new Page({
            name: faker.lorem.words(3),
            content: faker.lorem.paragraphs(2),
            anchor: slug,
            images: faker.image.imageUrl(2),
        })

        await createPages.save()
        
    } catch(err) {
        console.error(err);
    }
    
    res.status(200).redirect('/pages/');
}


module.exports = {
    pages_index,
    pages_store,
    pages_create,
    pages_edit,
    pages_update,
    pages_delete,
    pages_deleteAll,
    pages_seed,
}