const News = require('../models/news');

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
    res.render('admin/news/create', {
        title: 'Create News',
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
        res.render('admin/news/edit', {
            title: 'Edit News',
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


module.exports = {
    news_index,
    news_store,
    news_edit,
    news_update,
    news_delete,
}