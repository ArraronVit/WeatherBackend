const {Router} = require('express');
const asyncHandler = require(`express-async-handler`);
const {getWeatherByCityName, getWeatherByCoordinates} = require('../js/apiRequest');
const CitySchema = require('../js/CitySchema');

const router = Router();

router.get("/weather/city", asyncHandler(async (req, res) => {
    res.send(await getWeatherByCityName(req.query.q));
}));

router.get("/weather/coordinates", asyncHandler(async (req, res) => {
    res.send(await getWeatherByCoordinates(req.query.lat, req.query.lon));
}));

router.get("/weather/favourites", asyncHandler(async (req, res) => {
    const citySchemas = await CitySchema.find({});
    res.send(citySchemas);
}));

router.post("/weather/favourites", asyncHandler(async (req, res) => {
    if (!await isExist(req.query.city)) {
        const citySchema = new CitySchema({
            city: req.query.city
        });
        await citySchema.save(function (err) {
            if (!err) {
                return res.send({status: 'OK', citySchema: citySchema});
            } else {
                if (err.name === 'ValidationError') {
                    res.statusCode = 400;
                    res.send({error: 'Validation error'});
                } else {
                    res.statusCode = 500;
                    res.send({error: 'Server error'});
                }
            }
        });
    } else {
        res.statusCode = 444;
        res.send({ status: 'ERROR', citySchema: 'already exists' });
    }
}));

router.delete("/weather/favourites", asyncHandler(async (req, res) => {
    const cityFilter = req.query.city;
    await CitySchema.findOneAndDelete({city: cityFilter}).exec();
    return res.send({ status: 'OK', citySchema: 'deleted' });
}));

async function isExist(city) {
    return await CitySchema.findOne({ city: city }).exec() != null;
}

module.exports.router = router;
module.exports.isExist = isExist;