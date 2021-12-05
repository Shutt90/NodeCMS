const Page = require('../models/page')

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
        console.log(name);

        const currentPage = await Page.findOne({anchor: name})

        res.render('dynamic', {
            title: currentPage.anchor,
            page: currentPage,
        })

    } catch(err) {
        console.error(err)
    }

}


module.exports = {
    home_index,
    home_dynamic,
}