const News = require('../models/news');
const stringHelper = require('../helpers/string');
const faker = require('faker');

const news_index = (req, res) => {
    News.find().sort({ position: 1 })
    .then((result) => {

        res.render('admin/news', {
            title: "news",
            news: result,
        })

    })
}

const news_create = (req, res) => {
    res.render('admin/forms/create', {
        title: 'news',
        create: true,

    })
}

const news_store = async (req, res) => {

    if(req.files[0].path != "" && req.files[0].path != undefined) {

        try {
            const news = await new News({
                title: req.body.title,
                snippet: req.body.snippet,
                content: req.body.content,
                images: req.files[0].path,
            })

            await news.save()

        } catch(err) {
            console.error(err);
        }

    } else {

        try {

            const news = await new News({
                title: req.body.title,
                snippet: req.body.snippet,
                content: req.body.content,
            })

            await news.save()
            res.status(200).send('Uploaded without file')
                
        }  catch(err) {
            console.error(err)
        }

    }

    res.status(200).send('Uploaded with file')


}

const news_edit = (req, res) => {
    const id = req.params.id;
    News.findById(id)
    .then(result => {
        res.render('admin/forms/edit', {
            title: 'news',
            create: false,

            news: result,
        })
    })

}

const news_update = async (req, res) => {

    const id = req.params.id

    try {
        await News.findByIdAndUpdate(id, {
            title: req.body.title,
            snippet: req.body.snippet,
            content: req.body.content,
        })

    } catch {
        console.error(err)
        res.sendStatus(404)
    }

    return res.redirect(200, '/news')


}

const news_delete = async (req, res) => {

    const id = req.params.id
    backURL=req.header('Referer') || '/';

    try {
        await News.deleteOne({id: id})
        res.redirect(backURL)

    } catch(err) {
        console.error(err)
    }
   
}

const news_seed = async (req, res) => {

    const para = faker.lorem.paragraph(2)
    const snippet = stringHelper.truncate(para, 25)

    try {
        const createNews = await new News({
            title: faker.lorem.words(3),
            snippet: snippet,
            content: para,
            images: faker.random.image(),
        })

        await createNews.save()
        
    } catch(err) {
        console.error(err);
    }
    
    res.status(200).redirect('/news/');
}


module.exports = {
    news_index,
    news_create,
    news_store,
    news_edit,
    news_update,
    news_delete,
    news_seed,
}