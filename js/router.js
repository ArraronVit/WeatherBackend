const {Router} = require('express');
const asyncHandler = require(`express-async-handler`);
const {getWeatherByCityName, getWeatherByCoordinates} = require('../js/apiRequest');
const CitySchema = require('../js/CitySchema');

const router = Router();

router.get("/weather/city", asyncHandler(async (req, res) => {
    res.send(await getWeatherByCityName(encodeURI(req.query.q)));
}));

router.get("/weather/coordinates", asyncHandler(async (req, res) => {
    res.send(await getWeatherByCoordinates(req.query.lat, req.query.lon));
}));

router.get("/favourites", asyncHandler(async (req, res) => {
    const citySchemas = await CitySchema.find({});
    res.send(citySchemas);
}));

router.post("/favourites", asyncHandler(async (req, res) => {
    if (!await isExist(req.query.city)) {
        const citySchema = new CitySchema({
            city: req.query.city
        });
        await citySchema.save(function (err) {
            if (!err) {
                return res.send({status: 'OK', citySchema: citySchema});
            } else {
                res.statusCode = 500;
                // res.send({error: 'Server error'});
            }
        });
    } else {
        res.statusCode = 400;
        res.send({status: 'ERROR', citySchema: 'already exists'});
    }
}));

router.delete("/favourites", asyncHandler(async (req, res) => {
    const cityFilter = req.query.city;
    await CitySchema.findOneAndDelete({city: cityFilter}).exec();
    return res.send({status: 'OK', citySchema: 'deleted'});
}));

async function isExist(city) {
    return await CitySchema.findOne({city: city}).exec() != null;
}

module.exports = router;