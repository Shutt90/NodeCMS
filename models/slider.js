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
    sliderImage: {
        type: Array,
        required: true,
    },
}, {  timestamps: true });

const Slider = mongoose.model('Slider', sliderSchema);

module.exports = Slider;