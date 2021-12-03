const settings_index = (req, res) => {
    res.render('admin/settings', {
        title: 'Settings',


    })
}

module.exports = {
    settings_index,

}