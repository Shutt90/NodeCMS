const Visitor = require('../models/visitor');

const dashboard_index = async (req, res) => {

    const getVisits = await Visitor.find()
    let sum = 0;

    for (let i = 0; i < getVisits.length; i++ ) {
        sum += getVisits[i].count
    }


    res.render('admin/dashboard', {
        title: 'Dashboard',
        visitors: sum,
        uniqueVisitors: getVisits.length

    })
}

module.exports = {
    dashboard_index
}

























































