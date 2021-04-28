const CitySchema = require('../../models/citySchema');

async function getFavourites() {
    return await CitySchema.find({});
}

async function addFavourite(req, res) {

    if (await isExist(req.query.city)) {
        res.statusCode = 400;
        res.send({status: 'ERROR', citySchema: 'already exists'});
    } else {
        const citySchema = new CitySchema({
            city: req.query.city
        });
        await insertToDB(citySchema, res)
    }
}

async function insertToDB(citySchema, res) {
    await citySchema.save(function (err) {
        if (!err) {
            return res.send({status: 'OK', citySchema: citySchema});
        }
        res.statusCode = 500;
    });
}

async function deleteFavourite(req, res) {
    const cityFilter = req.query.city;
    await (CitySchema.findOneAndDelete( {city: cityFilter} )).exec(function (err) {
        if (!err) {
            return res.send({status: 'OK', citySchema: 'deleted' });
        }
        res.statusCode = 500;
    });
}

async function isExist(city) {
    return await CitySchema.findOne({city: city}).exec() != null;
}

module.exports = {
    getFavourites,
    addFavourite,
    deleteFavourite
}