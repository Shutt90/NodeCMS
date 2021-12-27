const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VisitorSchema = new Schema ({

    count: {
        type: Number,
        required: true,
    },
    ipAddress: {
        type: String,
        require: true,
    }
}, {  timestamps: true });

const Visitor = mongoose.model('Visitor', VisitorSchema);

module.exports = Visitor;