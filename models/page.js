const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pageSchema = new Schema ({

    name: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    anchor: {
        type: String,
        require: true,
    },
}, {  timestamps: true });

const Page = mongoose.model('Page', pageSchema);

module.exports = Page;