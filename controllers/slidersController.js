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

const sliders_create = (req, res) => {
    res.render('admin/forms/create', {
        title: 'sliders',
        create: true,
    });

};

const sliders_store = async (req, res) => {

    if(req.files.length > 0 ) {
        try {
            const slider = await new Slider({
                title: req.body.title,
                subtitle: req.body.subtitle,
                images: req.files.images,

            })

            await slider.save();
            res.status(200).send('Uploaded with file')

        } catch(err) {
            console.error(err);
        }

        res.status(200).send('Uploaded Slider');

    } else {

        try {
            const slider = await new Slider({
                title: req.body.title,
                subtitle: req.body.subtitle,
            })

            await slider.save()
            res.status(200).send('Uploaded without file')

        } catch(err) {
            console.error(err);
        }
        
    }

}

module.exports = {
    sliders_index,
    sliders_create,
    sliders_store,
}