const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sliderSchema = new Schema ({

    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: true,
    },
    images: {
        type: Array,
        required: true,
        default: 99,
    },
}, {  timestamps: true });

const Slider = mongoose.model('Slider', sliderSchema);

module.exports = Slider;