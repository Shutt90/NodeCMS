const Page = require('../models/page')
const News = require('../models/news')

const home_index = async (req, res) => {
    try {

        const pages = await Page.find()
        res.render('../views/index', {
            title: "Home",
            pages: pages,
        })

    } catch(err) {

        console.error(err);

    }

}

const home_dynamic = async (req, res) => {
    try {

        let name = req.params.title;

        const currentPage = await Page.findOne({anchor: name})
        const pages = await Page.find()


        res.render('dynamic', {
            title: currentPage.anchor,
            page: currentPage,
            pages: pages,
        })

    } catch(err) {
        console.error(err)
    }


}

const news_index = async function(req, res) {
    try {

        const news = await News.find().sort({'timestamp': '-1'})
        res.render('../views/news', {
            title: 'News',
            news: news,

        })

    } catch (err) {
        console.error(err)
    }

}

module.exports = {
    home_index,
    home_dynamic,
    news_index
}