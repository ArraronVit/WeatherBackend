const {Schema, model} = require('mongoose');

const schema = new Schema({
    city: {
        type: String
    }
});

module.exports = model('CitySchema', schema);