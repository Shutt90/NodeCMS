const Slider = require('../models/slider')
const redirect = require('../redirects/404')

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
                sliderImage: req.files.map(file => {
                    file.path
                })
            })

            const files = req.files.forEach(file => {
                file.path
                console.log(file)
            })

            console.log(files)
            
            await slider.save();

            res.status(200).send('Uploaded Slider');


        } catch(err) {
            console.error(err);

            if(err) {
                redirect(req, res, 'Error!', 'Error!', err)
            }

        }


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

            if(err) {
                redirect(req, res, 'Error!', 'Error!', err)
            }
        }
        
    }

}

module.exports = {
    sliders_index,
    sliders_create,
    sliders_store,
}