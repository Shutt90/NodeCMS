const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema ({

    title: {
        type: String,
        required: true,
    },
    
    snippet: {
        type: String,
        required: true,
    },
    position: {
        type: Number,
        required: true,
        default: 99,
    },
    content: {
        type: Array,
        required: true,
        default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    images: {
        type: Array,
        required: false,
    },
}, {  timestamps: true });

const News = mongoose.model('News', newsSchema);

module.exports = News;