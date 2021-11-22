const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contentSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    page_number: {
        type: Number,
        require: true,
    },
    file_path: {
        type: String,
        required: true,
    }
}, {  timestamps: true });

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;