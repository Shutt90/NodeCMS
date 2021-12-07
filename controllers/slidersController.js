const sliders_index = async (req, res) => {
    res.render('admin/slider', {
        title: 'sliders',
    })

}

const sliders_store = async (req, res) => {
    

}

module.exports = {
    sliders_index,
    sliders_store,
}