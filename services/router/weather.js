const { Router } = require('express');
const asyncHandler = require(`express-async-handler`);
const { getWeatherByCityName, getWeatherByCoordinates } = require('../network/apiProvider');

const router = Router();

router.get("/weather/city", asyncHandler(async (req, res) => {
    res.send(await getWeatherByCityName(encodeURI(req.query.q)));
}));

router.get("/weather/coordinates", asyncHandler(async (req, res) => {
    res.send(await getWeatherByCoordinates(req.query.lat, req.query.lon));
}));

module.exports = router;
