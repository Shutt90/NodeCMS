const Page = require('../models/page');
const Slider = require('../models/slider');
const faker = require('faker');
const sysRedirect = require('../redirects/sysRedirect')

const pages_index = async (req, res) => {

    try {
        const pages = await Page.find().sort({ position: 1 })
        res.render('admin/pages', {
            title: 'pages',
            pages: pages,
        })
        
    } catch(err) {
        console.error(err)
    }

}

const pages_create = (req, res) => {
    res.render('admin/forms/create', {
        title: 'pages',
        create: true,
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

    const anchor = when_no_anchor()
    const slug = anchor.replace(/\s/g, "")

    if(req.files.length > 0 ) {

        try {
            const page = await new Page({
                name: req.body.name,
                content: req.body.content,
                anchor: slug,
                images: req.files.forEach(image => {
                    image.path
                }),
            })


            await page.save()

            res.status(200).send('Uploaded with file')


        } catch(err) {
            console.error(err);
        }

    } else {

        try {

            const page = await new Page({
                name: req.body.name,
                content: req.body.content,
                anchor: slug,

            })

            await page.save()
            res.status(200).send('Uploaded without file')
                
        }  catch(err) {
            console.error(err)
        }

    }


    
}

const pages_edit = async (req, res) => {
    const id = req.params.id;
    const sliders = await Slider.find().sort({ position: 1 })
    const page = await Page.findById(id)

    res.render('admin/forms/edit', {
        title: 'pages',
        create: false,
        page: page,
        sliders: sliders,
    })

}

const pages_update = async (req, res) => {

    const id = req.params.id

    const when_no_anchor = () => {
        const anchor = req.body.anchor
        if(anchor === "") {
            return req.body.name
        } else {
            return anchor
        }

    }

    const anchor = when_no_anchor()
    const slug = anchor.replace(/\s/g, "")

    if(req.files.length > 0  ) {

        try {
            await Page.findByIdAndUpdate(id, {
                name: req.body.name,
                content: req.body.content,
                anchor: slug,
                sliders: req.body.slider,
            })

            res.status(200).send('Updated with file')


        } catch {
            console.error(err)
            res.sendStatus(404)
        }

    } else {

        try {

            const page = await new Page({
                name: req.body.name,
                content: req.body.content,
                anchor: slug,
            })

            await page.save()
            res.status(200).send('Updated without file')
                
        }  catch(err) {
            console.error(err)
        }

    }
    



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
    
    const slug = faker.lorem.words(3).replace(/\s/g, "")

    try {
        const createPages = await new Page({
            name: faker.lorem.words(3),
            content: faker.lorem.paragraphs(2),
            anchor: slug,
            images: faker.random.image(),
            

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