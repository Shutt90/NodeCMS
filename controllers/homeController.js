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

        console.log(req.params)

        let name = req.params.name;

        const currentPage = await Page.findOne(name)

        res.send(200)

    } catch(err) {
        console.error(err)
    }

}


module.exports = {
    home_index,
    home_dynamic,
}