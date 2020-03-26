const mongoose = require('mongoose')

const ServiceSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    details: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('service', ServiceSchema)