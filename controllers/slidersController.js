const Slider = require('../models/slider')

const sliders_index = async (req, res) => {
    
    Slider.find().sort({ position: 1 })
    .then((result) => {

        res.render('admin/slider', {
            title: "sliders",
            sliders: result,
        })

    })

}

const sliders_store = async (req, res) => {
    

}

module.exports = {
    sliders_index,
    sliders_store,
}