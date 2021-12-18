const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sliderSchema = new Schema ({

    title: {
        type: String,
        required: false,
    },
    subtitle: {
        type: String,
        required: false,
    },
    sliderImage: {
        type: Array,
        required: false,
    },
}, {  timestamps: true });

const Slider = mongoose.model('Slider', sliderSchema);

module.exports = Slider;