const dashboard_index = (req, res) => {
    res.render('admin/dashboard', {
        title: 'Dashboard',

    })
}

module.exports = {
    dashboard_index
}