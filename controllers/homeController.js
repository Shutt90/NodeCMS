const home_index = (req, res) => {
    res.render('../views/index', {title: "Home"})
}

module.exports = {
    home_index,
}