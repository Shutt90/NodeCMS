const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pageSchema = new Schema ({

    name: {
        type: String,
        required: true,
        default: 'Page Name'
    },
    position: {
        type: String,
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
    sliders: {
        type: String,
        required: false,
        default: 'none',
    },
    anchor: {
        type: String,
    },
}, {  timestamps: true });

const Page = mongoose.model('Page', pageSchema);

module.exports = Page;