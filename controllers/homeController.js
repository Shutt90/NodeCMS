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

module.exports = {
    home_index,
}