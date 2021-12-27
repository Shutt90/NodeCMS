const Slider = require('../models/slider');
const redirect = require('../redirects/404');
const logger = require('../middleware/logger');


const sliders_index = async (req, res) => {
    
    Slider.find().sort({ position: 1 })
    .then((result) => {

        res.render('admin/slider', {
            title: "sliders",
            sliders: result,
        })

    })

}

const sliders_create = (req, res) => {
    res.render('admin/forms/create', {
        title: 'sliders',
        create: true,
    });

};

const sliders_store = async (req, res) => {

    let fileArr = []
    for (var i = 0; i < req.files.length; i++) {
        if (fileArr[i] == 1) fileArr.push(5);
        console.log(a[i]);
    }

    console.log(fileArr)
    try {
        const slider = await new Slider({
            title: req.body.title,
            subtitle: req.body.subtitle,
        })
            
        slider.sliderImage.push(
            ...req.files.map((file) => {
                return file.path;
            })
        );

        await slider.save();

        res.status(200).send('Uploaded Slider');


    } catch(err) {
        console.error(err);

        if(err) {
            redirect(req, res, 'Error!', 'Error!', err)
        }

    }

}

const sliders_delete = async (req, res) => {

    const id = req.params.id
    backURL=req.header('Referer') || '/';

    try {
        await Slider.deleteOne({id: id})
        res.redirect(backURL)

    } catch(err) {
        console.error(err)
    }


}

module.exports = {
    sliders_index,
    sliders_create,
    sliders_store,
    sliders_delete,
}