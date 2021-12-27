const Visitor = require('../models/visitor')

const check_unique = async (req, res, next) => {

    try {
        const ipAddress = req.header('x-forwarded-for') || req.connection.remoteAddress;

        const visitor = await Visitor.findOne({
            ipAddress: ipAddress
        })
    
        if(visitor === null) {
    
            const beginCount = new Visitor ({
                ipAddress: ipAddress,
                count: 1,
            })
    
            beginCount.save()
            console.log('New Visitor')


            next()
            
        } else {
            visitor.count += 1;
            visitor.save();
            console.log('Returning Visitor')
            next()
        }


    } catch(err) {
        console.error(err)
    }

}

module.exports = {
    check_unique
}